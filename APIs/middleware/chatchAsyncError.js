module.exports = funcAsync => (req,res,next)=>{
    Promise.resolve(funcAsync(req,res,next))
    .catch(next);
};