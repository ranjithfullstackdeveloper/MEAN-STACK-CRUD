const express=require('express');
const mongoose=require('./database/mongoose');
const app=express();
const List=require('./database/models/list');
const Task=require('./database/models/task');
app.use(express.json());
const {ObjectId} = require('mongodb');
const bodyParser=require('body-parser');
const cors = require('cors');
const User=require('./database/models/user');

app.use(bodyParser.json());
app.use(cors());
//const ctrlUser = require('./database/controller/user.controller');
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
});

/* CRUD API for Lists  */

app.get('/lists',(req,res)=>{
    List.find({})
        .then(lists=>res.send(lists))
        .catch((error)=>console.log(error));
});
app.post('/lists',(req,res)=>{
    console.log('reqest.body',req.body);
        new List({'title':req.body.title})
        .save()
        .then((list)=>res.send(list))
        .catch((error)=>console.log(error));
});
app.get('/lists/:listId',(req,res)=>{
    List.find({_id:req.params.listId})
        .then((list)=>res.send(list))
        .catch((error)=>console.log(error));
});

app.patch('/lists/:listId',(req,res)=>{
    List.findByIdAndUpdate({'_id':req.params.listId},{$set:req.body})
        .then((list)=>res.send(list))
        .catch((error)=>console.log(error));
});

app.delete('/lists/:listId',(req,res)=>{
    List.findByIdAndDelete({'_id':req.params.listId},{$set:req.body})
        .then((list)=>res.send(list))
        .catch((error)=>console.log(error));
});

/* CRUD API for Tasks  */

app.get('/lists/:listId/tasks',(req,res)=>{
    Task.find({_listId:ObjectId(req.params.listId)})
        .then((tasks)=>res.send(tasks))
        .catch((error)=>console.log(error));
});

app.post('/lists/:listId/tasks',(req,res)=>{
    (new Task({'_listId':req.params.listId,'title':req.body.title}))
    .save()
    .then((task)=>res.send(task))
    .catch((error)=>console.log(error));
});

app.get('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOne({_listId:req.params.listId,_id:req.params.taskId})
        .then((task)=>res.send(task))
        .catch((error)=>console.log(error));
});

app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndUpdate({_listId: req.params.listId,_id: req.params.taskId},{$set:req.body})
        .then((task)=>res.send(task))
        .catch((error)=>console.log(error));
});

app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndDelete({_listId:req.params.listId,_id:req.params.taskId})
        .then((task)=>res.send(task))
        .catch((error)=>console.log(error));
});

app.post('/register',(req,res,next)=>{
   // console.log('reqest.body',req.body);
    (new User({'fullName':req.body.fullName, 'email': req.body.email, 'password': req.body.password}))
    .save()
    .then((user)=>res.send(user))
    .catch((error)=> {
        var valErrors=[];
        if(error.name === 'ValidationError') {
            res.status(422).send(error.message);
        }
        else{
            res.status(422).send(error.errmsg)
        }
    });
    
}
);

app.listen(3000,()=>
console.log("Server is connected on port 3000"));