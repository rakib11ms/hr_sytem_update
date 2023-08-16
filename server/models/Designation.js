const mongoose=require('mongoose');
const DesignationShema=new mongoose.Schema({
    name: { type: String, required: true }

})

const Designation=mongoose.model('Designation',DesignationShema);

module.exports=Designation;