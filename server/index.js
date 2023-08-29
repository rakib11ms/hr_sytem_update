const express=require('express');
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();
const cors = require('cors')
app.use(cors());
const allRoutes=require('./allRoutes');

const bodyParser=require('body-parser');

// create application/json parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))



app.use('/api/',allRoutes);

// app.get('/',(req,res)=>{
//     return res.json({
//         message:"hello data"
//     })
// })

mongoose.connect(process.env.mongoUri).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('server running on port ',process.env.PORT);
    })
}).catch((error)=>{
    console.log('error on database',error)

})