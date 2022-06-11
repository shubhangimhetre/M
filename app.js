const express=require('express');
const app=require('express')();
const port=3000;
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser')
const fileupload=require('express-fileupload');
const DB="mongodb+srv://shubhangimhetre:Shubhangi_123@cluster0.kqveraq.mongodb.net/Mydb?retryWrites=true&w=majority";
const web1=require('./routes/web');
const path=require('path');

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(fileupload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(DB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=>{console.log('connected to database..'); })
.catch((err)=>{ console.log(err);})

app.get('/',(req,res)=>{
    res.send('Hello world');
})

app.use('/user',web1);

app.listen(port,()=>{
    console.log(`server listening at the port ${port}....`);
})