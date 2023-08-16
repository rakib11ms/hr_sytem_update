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
    const { name, email, password, resetToken, resetTokenExpiration, designation, present_address, permanent_address } = req.body;
    console.log('body', req.body)
    if (req.file) {
        console.log(req.file);
    } else {
        console.log('No file uploaded');
    }
    const password1 = req.body.password;

    const role = await Role.findOne({ _id: req.body.role }, { name: 1 });

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
            role: role._id,
            designation: req.body.designation,
            image: '',
            present_address: req.body.present_address,
            permanent_address: req.body.permanent_address
        }

        const user = new User(data);
        // If the image file is uploaded, assign the file name to the 'image' field
        if (req.file) {
            // console.log('file ache', req.file)
            user.image = req.file.filename;
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