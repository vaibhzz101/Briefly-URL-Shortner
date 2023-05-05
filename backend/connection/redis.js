const redis = require("redis");
const redisclient = redis.createClient({
    url: "redis://default:GPpAScAQMw1V91ol66h52md7wILabtag@redis-10253.c301.ap-south-1-1.ec2.cloud.redislabs.com:10253",
});
try {
    redisclient.connect();
    console.log("connected to redis");
} catch (error) {
    console.log(error);
}

module.exports = { redisclient };