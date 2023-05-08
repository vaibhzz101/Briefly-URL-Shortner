const userRouter = require("express").Router()
const {UserModel} = require("../models/user.models")
const bcrypt = require("bcrypt")
const blacklist = require("../models/blacklisting")
const authenticate = require("../middelwares/authentication")
const jwt = require("jsonwebtoken")
const redisclient  = require('../connection/redis') ;


userRouter.get("/allusers", async (req, res)=>{
    try {
        const allUsersData = await UserModel.find({})
        res.json(allUsersData)
    } catch (error) {
        console.log(error)
        res.status(400).send({"msg": "Erron in getting all users"})
    }
})

userRouter.post("/signup", async (req, res)=>{
    try {
        const {name, email, password}= req.body
        const isUser = await UserModel.findOne({email})
        if (isUser) return res.send({msg: "User already present please login"})
        const hashedPass = bcrypt.hashSync(password, 5)
        const user = new UserModel({name, email, password: hashedPass})

        await user.save()
        res.send(user);
        
    } catch (error) {
        res.status(400).send({msg:"Error while registering"}, error)
    }
})

userRouter.post("/login", async (req, res)=>{
    try {
        const {email, password}= req.body
        const user = await UserModel.findOne({email})
        if(!user) return res.status(404).send({msg:"User not found"})
        const isCorrect = bcrypt.compareSync(password, user.password)
        if(!isCorrect) return res.status(400).send({msg:"Wrong Credential"})

        const normaltoken = jwt.sign({ userId: user._id }, process.env.normalkey, { expiresIn: "1h" });
        const refreshtoken = jwt.sign({ userId: user._id }, process.env.refreshkey, { expiresIn: "6h" });

        res.send({"msg":user.name})
        res.cookie("normaltoken", normaltoken, {maxAge: 1000*60*60})
        res.cookie("refreshtoken", refreshtoken, { maxAge: 1000 * 60 * 60 * 6 })
        
        await redisclient.SET(user.email, JSON.stringify({ token }));
        res.cookie("email", `${user.email}`);

        res.send({msg: "Login Successful"}).json({token,email,id:user.id});
    } catch (error) {
        console.log(error)
        res.send({msg:"Error while loging in"})
    }
})

userRouter.post("/newtoken", (req, res) => {
    try {
        const newtoken = req.cookies.RefreshToken

        if (!newtoken) {
            res.json("no token")
        } else {
            jwt.verify(newtoken, process.env.refreshkey, (err, decoded) => {
                if (err) {
                    res.json("invalid token")
                } else {

                    var normaltoken = jwt.sign({ userId: decoded.userId }, process.env.normalkey, { expiresIn: "1h" });
                    res.cookie("normaltoken", normaltoken, {maxAge: 1000*60*60})
                    
                    res.json("new token generated successfully")
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:"Error while loging in"}, error)
    }
})

userRouter.get('/logout', async (req, res) => {
    try {
        const {normaltoken, refreshtoken} = req.cookies
        const bl = new blacklist({normaltoken, refreshtoken})
        await bl.save();
        res.clearCookie("normaltoken")
        res.clearCookie("refreshtoken")
        res.status(200).send({msg: "Logout Succesful"})
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:"Error while loging in"})
    }
})

userRouter.delete("/delete/:id", async(req, res) => {
    const _id = req.params.id;
    try {
        //////////////////
        // console.log(decoded)
        const user = await UserModel.findByIdAndDelete({ _id });
        res.json({ "msg": "User deleted sucessfully"});
    } catch (error) {
        console.log(error)
        res.json({ "msg": "error in deleting "})
    }
})

userRouter.patch("/updateName", async (req, res)=>{
    const {name, email, password} = req.body
    try {
        const data = await UserModel.findOne({ email })
        if (name) {
            data.name = name;
        }
        await data.save()
        
    } catch (error) {
        console.log(error)
        res.json({"msg": "Something wrong"})
    }
})

userRouter.patch("/updatePassword/:id", async (req, res) => {
    const _id = req.params.id;
    const {password} = req.body;
    try {
        bcrypt.hash(password, 5, async(err, hash) => {
            if(err){
                console.log(err);
                res.json({"error": err});
            }
            else{
                const updateData = await UserModel.findByIdAndUpdate({_id}, {password: hash});
                res.json({"msg":"Password Updated Successfully"});
            }
        })
    } catch (error) {
        res.json({"Error": error});
    } 
});

module.exports = userRouter