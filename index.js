const express=require('express');
const mongoose=require("mongoose")
const cors=require("cors")
const user=require("./model/UserSchema")
const bcrypt=require('bcryptjs')
const app=express()

mongoose.connect("mongodb+srv://abhaykriz2002:abhay123@cluster0.xpvokm3.mongodb.net/db?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("MongoDb is connected");
    
})

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Waddup")
})
app.post('/', async (req, res) => {
    const { name, password } = req.body;
  
    try {
      
     const hashedPass= await bcrypt.hash(password,10)
      const newUser = await user.create({ name, password:hashedPass});
      res.status(201).json({ message: "User created", user: newUser });
    } catch (error) {
      console.error(" Error creating user:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  })
  app.post('/login', async (req, res) => {
    const { name, password } = req.body;
  
    try {
      const existingUser = await user.findOne({ name });
  
       const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }
  
      res.status(200).json({ message: "Login successful", user: existingUser });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  

app.listen(4000,()=>{console.log("Server at http://localhost:4000")})


