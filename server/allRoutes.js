const express=require('express');
const router=express.Router();

const {saveUser}=require('./controllers/authenticationController')
const path = require('path');
const multer = require('multer');
router.get('/hello',(req,res)=>{
    res.json({
        message:"Hello there"
    })
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  });
  
  const upload = multer({ storage: storage });

router.post('/save-user',upload.single('image'),saveUser);

module.exports=router;