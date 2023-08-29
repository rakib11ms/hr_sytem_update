const { validationResult } = require('express-validator');
const Department = require('../models/Department');

const createDepartment = async (req, res) => {
    const  name  = req.body.name;
    console.log('department',req.body)

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const data = {
            name:name,
        }

        const department = new Department(data);
        await department.save();
        return res.json({
            status: 200,
            department: data
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const getAllDepartmentName = async (req, res) => {
    const allDesgination = await Department.find({});
    return res.json({
        status: 200,
        allDesgination: allDesgination
    })
}
const editdepartmentName = async (req, res) => {
    const editData = req.params.id;
    const department = await department.find({ _id: editData });
    return res.json({
        status: 200,
        department: department
    })
}
const updatedepartment = async (req, res) => {
    const updateData = req.body
    const department = await department.findOneAndUpdate({ _id: req.params.id }, updateData, { new: true });
    return res.json({
        status: 200,
        department: department
    })
}

const deletedepartment = async (req, res) => {
    const department = await department.findOneAndDelete({ _id: req.params.id }, { new: true });
    const alldepartments = await department.find({});

    return res.json({
        status: 200,
        alldepartments: alldepartments
    })
}

module.exports={createDepartment,getAllDepartmentName}