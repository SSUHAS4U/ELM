const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');
const fileupload = require('express-fileupload');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileupload());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on the port number ${PORT}`));

//Configuration (MONGODB)
var curl = "mongodb://localhost:27017";
var client = new MongoClient(curl); 

//TESTING
app.get('/klef/test', async function(req, res){
    //res.send("Koneru Lakshmaiah Education Foundation");
    res.json("Koneru Lakshmaiah Education Foundation");
});

app.post('/klef/cse', async function(req, res){
    //res.json(req.body);
    res.json("Computer Science and Engineering");
});


//REGISTRATION MODULE
app.post('/registration/signup', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('s12');
        users = db.collection('users');
        data = await users.insertOne(req.body);
        conn.close();
        res.json("Registered successfully...");
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//LOGIN MODULE
app.post('/login/signin', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('s12');
        users = db.collection('users');
        data = await users.count(req.body);
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//HOME MODULE
app.post('/home/uname', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('s12');
        users = db.collection('users');
        data = await users.find(req.body, {projection:{firstname: true, lastname: true}}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/home/menu', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('s12');
        menu = db.collection('menu');
        data = await menu.find({}).sort({mid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/home/menus', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('s12');
        menus = db.collection('menus');
        data = await menus.find(req.body).sort({smid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//CHANGE PASSWORD
app.post('/cp/updatepwd', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('s12');
        users = db.collection('users');
        data = await users.updateOne({empid : req.body.empid}, {$set : {pwd : req.body.pwd}});
        conn.close();
        res.json("Password has been updated")
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//MY PROFILE
app.post('/myprofile/info', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('s12');
        users = db.collection('users');
        data = await users.find(req.body).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//FILE UPLOAD
app.post('/uploaddp', async function(req, res){
    try
    {
        if(!req.files)
            return res.json("File not found");

        let myfile = req.files.myfile;
        var fname = req.body.fname;
        myfile.mv('./src/images/photo/'+ fname +'.jpg', function(err){
            if(err)
                return res.json("File upload operation failed!");

            res.json("File uploaded successfully...");
        });

        conn = await client.connect();
        db = conn.db('s12');
        users = db.collection('users');
        data = await users.updateOne({emailid: fname},{$set : {imgurl: fname + '.jpg'}});
        conn.close();
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//Apply leave Module
// Add a route to handle leave applications
app.post('/applyleave', (req, res) => {
    const { empid, startDate, endDate } = req.body;
    
    // Assuming you have a Leave model
    const newLeave = new Leave({
      employeeId: empid,
      startDate: startDate,
      endDate: endDate,
      status: 'applied' // Set the status to applied
    });
  
    newLeave.save()
      .then(() => {
        // Calculate remaining leaves for the employee and update the database
        Leave.countDocuments({ employeeId: empid, status: 'approved' }, (err, count) => {
          if (err) {
            console.error(err);
            res.status(500).send('Server Error');
          } else {
            // Assuming you have an Employee model with a 'leaves' field
            Employee.findOneAndUpdate({ _id: empid }, { leaves: count }, { new: true }, (err, employee) => {
              if (err) {
                console.error(err);
                res.status(500).send('Server Error');
              } else {
                res.status(200).send('Leave applied successfully');
              }
            });
          }
        });
      })
      .catch(err => {
        console.error(err);
        res.status(400).send('Bad Request');
      });
  });
  


//ForgotPassword MODULE
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Update with your email service provider
    auth: {
      user: 'ssuhas4u@gmail@gmail.com', // Update with your email address
      pass: 'has@2004' // Update with your email password
    }
  });
  
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
  
    // Generate password reset token
    const resetToken = Math.random().toString(36).substring(2, 10);
  
    // Send email with password reset link
    const mailOptions = {
      from: 'your-email@gmail.com', // Update with your email address
      to: email,
      subject: 'Password Reset',
      text: `To reset your password, click on the following link: http://localhost:3000/reset-password?token=${resetToken}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).json({ message: 'Error sending password reset email' });
      } else {
        console.log('Password reset email sent:', info.response);
        res.status(200).json({ message: 'Password reset email sent successfully' });
      }
    });
  });
  