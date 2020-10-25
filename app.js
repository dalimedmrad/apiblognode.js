const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

// Routes
const articleRoutes = require('./routes/articles');
const usersRoutes = require('./routes/users');
  
app.use(express.json());


// Connect to DB
mongoose.connect('mongodb+srv://meddali:azerty1234@cluster0.gxipq.mongodb.net/blog?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
   .then(() => console.log("Connected to Mongo DB"))
   .catch((err) => console.log("Error", err));

app.get('/',(req,res)=>{
    res.send('hello word to my first application with Node.js !!');
});



app.use('/api/articles',articleRoutes);
app.use('/api/users',usersRoutes);

app.use(errorHandler);


 const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log('Listening on port',port);
})