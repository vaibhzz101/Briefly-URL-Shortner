const redis = require("redis");
require("dotenv").config();
let password=process.env.redis_password
const redisclient = redis.createClient({
    url: "redis://default:${password}@redis-10253.c301.ap-south-1-1.ec2.cloud.redislabs.com:10253",
});
try {
    redisclient.connect();
    console.log("connected to redis");
} catch (error) {
    console.log(error);
}

module.exports = { redisclient };