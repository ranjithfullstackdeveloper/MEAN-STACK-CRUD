const mongoose=require('mongoose');
const User=mongoose.model('User');
module.exports.register=(req,res,next)=>{
    console.log('req ',req.body.fulName);
    var user = new User();
    user.fulName=req.body.fulName;
    user.email=req.body.email;
    user.password=req.body.password;
    user.save((err,doc)=>{
        if (!err)
        res.send(doc);
        console.log('Ranjith ', doc)
    });

    console.log('registered user');
}