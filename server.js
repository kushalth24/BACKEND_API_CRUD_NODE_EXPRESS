const express=require("express");
const studentRoutes=require('./src/student/routes.js');
const app=express();
const port=3000;
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hello");
});
app.use('/api/v1/students',studentRoutes);
app.listen(3000,()=>{
    console.log(`Our app is running on port ${port}`)
});