const rateLimiter = require('express-rate-limit');
const  limter = rateLimiter({max:5,
    windowMs: 15 * 60 * 1000,
  message:"Too many request from your side so try after 15 min"})
  module.exports = limter;