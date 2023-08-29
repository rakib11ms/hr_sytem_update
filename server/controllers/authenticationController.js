const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const RoleHasPermission = require('../models/RoleHasPermission');
const Designation = require('../models/Designation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createToken = (user) => {
    return jwt.sign(user, process.env.SECRET, { expiresIn: '3d' })
}


const saveUser = async (req, res) => {
    console.log('body', req.body)
    ;
    const email=req.body.email;
    if (req.files) {
        if (req.files['image']) {
            console.log('Image uploaded:', req.files['image'][0]);
        } else {
            console.log('No image uploaded');
        }

        if (req.files['cv_file']) {
            console.log('CV file uploaded:', req.files['cv_file'][0]);
        } else {
            console.log('No CV file uploaded');
        }
    } else {
        console.log('No file uploaded');
    }
    const password1 = req.body.password;

    // const role = await Role.findOne({ _id: req.body.role }, { name: 1 });

    // console.log('role name',role_name.name)
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password1, 10);
        // console.log('hased', hashedPassword)
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            resetToken: '',
            resetTokenExpiration: '',
            role: req.body.role,
            designation: req.body.designation,
            image: '',
            present_address: req.body.present_address,
            permanent_address: req.body.permanent_address,
            designation:'e',
            supervisor:'e',
            cv_file:'',
            nid:'2',
            university:'2',
        }

        const user = new User(data);
        // If the image file is uploaded, assign the file name to the 'image' field
        if (req.files['image'][0]) {
            // console.log('file ache', req.file)
            user.image = req.files['image'][0].filename;
        }
        if (req.files['cv_file'][0]) {
            // console.log('file ache', req.file)
            user.cv_file = req.files['cv_file'][0].filename;
        }
        await user.save();
        const token = createToken(data);

        res.json(
            {
                status: 200,
                user: user
            }
        )
    }
    catch (error) {
        res.status(400).json({ error: error.message })

    }
}



module.exports = { saveUser }