const express=require('express');
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();
const cors = require('cors')
app.use(cors());
const allRoutes=require('./allRoutes');


app.use('/api/',allRoutes);

mongoose.connect(process.env.mongoUri).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('server running on port ',process.env.PORT);
    })
}).catch((error)=>{
    console.log('error on database',error)

})