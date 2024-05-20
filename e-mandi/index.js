require('dotenv').config();
const bodyParser = require('body-parser');
const userroutes=require('./routes/user.route');
const adminroutes=require('./routes/admin.route');
const express=require('express');


const app=express();

const port=process.env.PORT;



app.use('/api/user',userroutes);
app.use('/api/admin',adminroutes);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/app',(req,res)=>{
    res.send("welcome to e-mandi store")
    console.log("login success")
})


app.listen(port,()=>{
    console.log(`${port} is successfully running`);
})