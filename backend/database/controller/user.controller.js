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
        else{
            if (err.code == 11000)
            res.status(422).send(['Duplicate Email Address Found']);
            else
            return next(err);
        }
        
    });

    console.log('registered user');
}