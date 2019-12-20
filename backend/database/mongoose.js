const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/taskmanager',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
        .then(()=>console.log("Database is connected"))
        .catch((error)=>console.log(error));
require('./models/user');
module.exports=mongoose;
