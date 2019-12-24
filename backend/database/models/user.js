const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema=new mongoose.Schema({
    fullName:{
    type:String,
    required:"Must FullName"    
    },
    email: { 
        type: String,
        required:"Must Email",  
        unique: true
    },
    password: {
        type: String,
        required:"Must Password",
        minlength:[4,'min 4 char for password'] 
    },
    saltSecret: String
});

UserSchema.plugin(uniqueValidator);


UserSchema.path('email').validate((val) => {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(val);
}, 'Invalid Email Ranjith');

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