const redis = require("redis");
// require("dotenv").config();
// const password=process.env.redis_password
const redisclient = redis.createClient({
    url: "redis://default:90t9FyhXUi7KjtuMYMltjMmzxzh1T5XJ@redis-18635.c305.ap-south-1-1.ec2.cloud.redislabs.com:18635",
});
try {
    redisclient.connect();
    console.log("connected to redis");
} catch (error) {
    console.log(error);
}

module.exports = { redisclient };