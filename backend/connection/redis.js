const redis = require("redis");
require("dotenv").config();
const password=process.env.redis_password
const redisclient = redis.createClient({
    url: password,
});
try {
    redisclient.connect();
    console.log("connected to redis");
} catch (error) {
    console.log(error);
}

module.exports = { redisclient };