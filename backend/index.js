const express = require("express")
// const hbs = require("hbs")
const app = express()
const mongoose = require("mongoose")
const routes = require('./src/routes/main')
const cors = require("cors")
const bcrypt = require("bcryptjs");

// const app = express()
// const routes = require('./routes/main')

app.use(express.urlencoded({extended: true}));
app.use(express.json())
// app.use('', routes)
app.use(cors())

const DB = 'mongodb+srv://shivamrai0210:Shivam_0210@cluster0.geyfjxa.mongodb.net/kleTech?retryWrites=true&w=majority';

// mongoose.connect('mongodb://127.0.0.1:27017/kleTech');
mongoose.connect(DB).then(() =>{
    console.log(`connection succcessful`);
}).catch((err) => console.log(`no connection`));


const Program = require("./src/models/program")
const Department = require("./src/models/department")
const Course = require("./src/models/course")
const Chapter = require("./src/models/chapter")
const Question = require("./src/models/question")
const User = require("./src/models/user")
const PaperFormat = require("./src/models/paperFormat")

app.post("/deleteUser", async (req, res) => {
    // console.log(req.body);
    const id = req.body._id;
    console.log(id);
    try{
        await User.deleteOne({"_id" : id });
        res.send({message : "Faculty Deleted"})
    }
    catch(error){
        console.log(error)
    }

}) 



app.post("/login", async (req, res) => {
    const {email, password} = (req.body)
    console.log(req.body)
    try{
        const user = await User.findOne({"email" : email});
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(isMatch);
            if(isMatch){
                res.send({message: "Login succesfull", user})
            }
            else {
                res.send({message : "password didn't match"})
            }
        } else{
            res.send({message: "User not registered"})
        }
    }
    catch(error){
        console.log(error)
    }

}) 

app.post('/getPaperFormat', async (req, res)=> {
    const p = req.body._id;
    
    try{
        const setPaperFormat = await PaperFormat.findOne({"course_id": p})
        if(setPaperFormat){
            res.send(setPaperFormat)
            // console.log(setPaperFormat);
        }
    }
    catch(error){
        console.log(error)
      }

})

app.get('/getProgram', async (req, res)=> {
    try{
        const prog = await Program.find();
        if(prog){
            res.send(prog)
            // console.log(prog)
        }
    }
    catch(error){
        console.log(error)
      }

})

app.get('/getDepartment', async (req, res)=> {
    try{
        const dept = await Department.find();
        if(dept){
            res.send(dept)
            // console.log(prog)
        }
    }
    catch(error){
        console.log(error)
      }

})


app.get('/getCourse', async (req, res)=> {
    try{
        const course = await Course.find();
        if(course){
            res.send(course)
            // console.log(prog)
        }
    }
    catch(error){
        console.log(error)
      }

});

app.get('/getChapter', async (req, res)=> {
    try{
        const chapter = await Chapter.find();
        if(chapter){
            res.send(chapter)
            // console.log(prog)
        }
    }
    catch(error){
        console.log(error)
      }

});


app.get('/getFaculty', async (req, res)=> {
    try{
        const faculty = await User.find();
        if(faculty){
            res.send(faculty);
        }
    }
    catch(error){
        console.log(error)
      }

});

app.post('/getQuestion1', async (req, res)=> {
    const question = req.body;
    let len = question.length;
    const que = [];
    console.log(question);
    try{
        for(let i=0; i<len; i++){
            const res = await Question.find({"pi" : question[i].PI, "co": question[i].CO, "bl": question[i].BL, "course": question[i].course , "unit": question[i].unit});
            
            que.push(res);
        }
        res.send(que);
        
    }
    catch(error){
        console.log(error)
      }

});

app.listen(process.env.PORT||9002,() =>{
    console.log("BE started at port 9002")
} )
