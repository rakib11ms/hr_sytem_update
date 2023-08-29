const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');

const { saveUser } = require('./controllers/authenticationController')
const path = require('path');
const multer = require('multer');

const { createDesignation, getAllDesignationName } = require('./controllers/designationController');
const { createRole, getAllRoleName, editRoleName, updateRole, deleteRole, createPermission, getAllPermissionName, editPermissionName, updatePermission, deletePermission, createRoleHasPermission, getAllRoleHasPermission } = require('./controllers/rolePermissionController');
const { createDepartment, getAllDepartmentName } = require('./controllers/departmentController');



router.get('/hello', (req, res) => {
  res.json({
    message: "Hello there"
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

router.post('/save-user', upload.fields([{name:'image'},{name:'cv_file'}]), saveUser);



//role permission 
router.post('/create-role', createRole, [body('name').notEmpty().withMessage("Role name is required")])
router.get('/all-roles', getAllRoleName)
router.get('/edit-role/:id', editRoleName)
router.put('/update-role/:id', updateRole)
router.delete('/delete-role/:id', deleteRole)

router.post('/create-permission', createPermission, [body('name').notEmpty().withMessage("Permission name is required")])
router.get('/all-permissions', getAllPermissionName)
router.get('/edit-permission/:id', editPermissionName)
router.put('/update-permission/:id', updatePermission)
router.delete('/delete-permission/:id', deletePermission)


router.post('/create-role-has-permission', createRoleHasPermission)
router.get('/role-has-permission', getAllRoleHasPermission)









//desgination 
router.post('/create-designation', createDesignation, [body('name').notEmpty().withMessage("Designation name is required")])
router.get('/all-designation', getAllDesignationName)

//department
router.post('/create-department', createDepartment, [body('name').notEmpty().withMessage("Department name is required")])
router.get('/all-department', getAllDepartmentName)
// router.get('/delete-many', deleteMany)

module.exports = router;