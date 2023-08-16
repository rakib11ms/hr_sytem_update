const { validationResult } = require('express-validator');
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const RoleHasPermission=require('../models/RoleHasPermission');

const createRole = async (req, res) => {
    const { name } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const data = {
            name: name,
        }

        const role = new Role(data);
        await role.save();
        return res.json({
            status: 200,
            role: data
        })
    }
    catch (err) {
        console.log(err)
    }

}

const getAllRoleName = async (req, res) => {
    const allRoles = await Role.find({});
    return res.json({
        status: 200,
        allRoles: allRoles
    })
}
const editRoleName = async (req, res) => {
    const editData = req.params.id;
    const role = await Role.find({ _id: editData });
    return res.json({
        status: 200,
        role: role
    })
}
const updateRole = async (req, res) => {
    const updateData = req.body
    const role = await Role.findOneAndUpdate({ _id: req.params.id }, updateData, { new: true });
    return res.json({
        status: 200,
        role: role
    })
}

const deleteRole = async (req, res) => {
    const role = await Role.findOneAndDelete({ _id: req.params.id }, { new: true });
    const allRoles = await Role.find({});

    return res.json({
        status: 200,
        allRoles: allRoles
    })
}



//permission functionality 

const createPermission = async (req, res) => {
    const { name } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const data = {
            name: name,
        }

        const permission = new Permission(data);
        await permission.save();
        return res.json({
            status: 200,
            permission: data
        })
    }
    catch (err) {
        console.log(err)
    }

}

const getAllPermissionName = async (req, res) => {
    const allPermissions = await Permission.find({});
    return res.json({
        status: 200,
        allPermissions: allPermissions
    })
}
const editPermissionName = async (req, res) => {
    const editData = req.params.id;
    const permission = await Permission.find({ _id: editData });
    return res.json({
        status: 200,
        permission: permission
    })
}
const updatePermission = async (req, res) => {
    const updateData = req.body
    const permission = await Permission.findOneAndUpdate({ _id: req.params.id }, updateData, { new: true });
    return res.json({
        status: 200,
        permission: permission
    })
}

const deletePermission = async (req, res) => {
    const permission = await Permission.findOneAndDelete({ _id: req.params.id }, { new: true });
    const allPermissions = await Role.find({});

    return res.json({
        status: 200,
        allPermissions: allPermissions
    })
}

const createRoleHasPermission=async (req,res)=>{
    const role_id =req.body.role_id;
    const permission_id =req.body.permission_id;
    const data={
        role_id:role_id,
        permission_id:permission_id
    }
     try{
        const save_role_permission= new RoleHasPermission(data);
        await save_role_permission.save();
        return res.json({
            status: 200,
            message:'role has permission created successfully',
            data:save_role_permission
         })

     }
     catch(err){
        return res.json({
            status: 400,
            error: err
        })
     }

    
}

const getAllRoleHasPermission = async (req, res) => {
    const allRoleHasPermissions = await RoleHasPermission.find({});
    return res.json({
        status: 200,
        allRoleHasPermissions: allRoleHasPermissions
    })
}


module.exports = { createRole, getAllRoleName, editRoleName, updateRole, deleteRole, createPermission, getAllPermissionName, editPermissionName, updatePermission, deletePermission,createRoleHasPermission,getAllRoleHasPermission }