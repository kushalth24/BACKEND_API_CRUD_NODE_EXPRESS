const pool=require('../../db.js');
const queries=require('./queries.js');


const getStudents=(req,res)=>{
    pool.query(queries.getStudents,(error, results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};
const getStudentById=(req,res)=>{
    const id=parseInt(req.params.id);
    pool.query(queries.getStudentById,[id],(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};
const addStudent=(req,res)=>{
    const {name, email, age, dob}=req.body;
    pool.query(queries.checkEmailExists, [email],(error, results)=>{
        if(results.rows.length){
            res.send("Email already Exists");
        }
        pool.query(queries.addStudent,[name, email, age, dob],(error, results)=>{
            if(error) throw error;
            res.status(201).send("Student created successfully");
        
        });
    });
};
const removeStudent=(req,res)=>{
    const id=parseInt(req.params.id);
    pool.query(queries.getStudentById,[id],(error,results)=>{
        if(!results.rowCount){
            res.send("No student found of this ID");
        }
        
        pool.query(queries.removeStudent,[id],(error,results)=>{
            if(error) throw error;
            res.status(201).send("Student Deleted Successfully");
        });
        
    });

}
const updateStudent=(req,res)=>{
    const id=parseInt(req.params.id);
    const {name}=req.body;
    
    pool.query(queries.getStudentById,[id],(error,results)=>{
        
        if(!results.rowCount){
            res.send("No student found of this ID");
        }
        pool.query(queries.updateStudent,[name, id],(error, results)=>{
            if(error) throw error;
            res.status(200).send("Student updated successfully");
        
        });
    });
}
module.exports={getStudents, getStudentById, addStudent, removeStudent, updateStudent};