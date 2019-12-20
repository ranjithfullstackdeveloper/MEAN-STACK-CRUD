const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const UserSchema=new mongoose.Schema({
    fullName:{
    type:String    
    },
    email: { 
        type: String
    },
    password: {
        type: String
    },
    saltSecret: String
});

UserSchema.pre('save',function(next){
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password=hash;
            this.saltSecret=salt;
            console.log('Encryption is working');
            next();
        });
    });
});



const User=mongoose.model('User',UserSchema);
module.exports=User;