const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET="jwtsupersecret";
const cors = require('cors');
const app = express();
app.use(cors(
    {
        origin: 'http://localhost:3000',
    }
));

const bcrypt = require('bcrypt');

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1640226",
  key: "b7c88a1687c1bcd85fda",
  secret: "093e5e799e1832d64417",
  cluster: "ap2",
  useTLS: true
});


app.use(express.json());
const stuModel = require('./student-data');
const adminModel = require('./admin-data');
const chatModel = require('./chatDetails');

mongoose.connect('mongodb+srv://joelwalice:Joel19leema!@cluster1.ux3qqn1.mongodb.net/?retryWrites=true&w=majority')


app.post('/login', async (req, res) => {
    const {email, password } = req.body;
    const user = await stuModel.findOne({email});
    if(!user){
        return res.send({Status: "User Not exists"});
    }
    if(await bcrypt.compare(password, user.password )){
        const token = jwt.sign({email:user.email }, JWT_SECRET);
        if(res.status(201)){
            return res.send({Status: "Success", data: token});
        }
        else{
            return res.send({error: "Error"});
        }
    }
    res.json({Status: "error", error:"Invalid Credentials"});
});


app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    const epassw = await bcrypt.hash(password, 10);
    try{
        const user = await stuModel.findOne({email});
        if(user){
            return res.send({Status: "User already exists"});
        }

        await stuModel.create({name:name, email:email, password:epassw})
            .then(data => {
                res.send({Status: "Success"});
            })
            .catch(err => {
                res.send({Status: "Failed"});
            })
    }
    catch(err){
        res.send({Status: "Error"});
    }
});

app.post('/user', (req, res) => {
   const {token} = req.body;
   try{
         const user = jwt.verify(token, JWT_SECRET);
         console.log(user)
         stuModel.findOne({email:user.email})
        .then(data => {
            res.send({Status: "Success", data: data})
        })
        .catch((err) => {
            res.send({Status: "error", data: err});
        })
   }
    catch(err){
    }
});

app.post('/admin/login', (req, res) => {
    const {email, password } = req.body;
    adminModel.findOne({email: email})
        .then(user => {
            if(user) {
                if(user.password === password) {
                    res.json({Status: "Success", name: user.name});
                } else {
                    res.json("Password does not match");
                }
            } else {
                res.json("User not registered");
            }
        })
});

app.post('/admin/register', (req, res) => {
    adminModel.create(req.body)
        .then(data => {
            res.json(data);

        })
        .catch(err => {
            res.json(err);
        })
});

app.post('api/messages', async (req, res) => {

await pusher.trigger("chat", "message", {
  message: req.body.message
});
res.json([]);
})

app.post('/chat',(req,res) =>{
    chatModel.create(req.body)
    .then(data => {
        res.json(data);
    }
    )
    .catch(err => {
        res.json(err);
    }
    )
})

app.get('/chat', (req, res) => {
    chatModel.find()
        .then(data => {
            res.json(data);
        }
        )
        .catch(err => {
            res.json(err);
        }
        )
    
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
