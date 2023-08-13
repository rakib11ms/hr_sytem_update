const User = require('../models/User');
const { validationResult } = require('express-validator');

const saveUser = async (req, res) => {
    const { name, email, password, resetToken, resetTokenExpiration, designation, present_address, permanent_address } = req.body;
    console.log('body', req.body)
    if (req.file) {
        console.log(req.file);
    } else {
        console.log('No file uploaded');
    }

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

        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: '',

        }

        const user = new User(data);
        // If the image file is uploaded, assign the file name to the 'image' field
        if (req.file) {
            // console.log('file ache', req.file)
            user.image = req.file.filename;
        }
        await user.save();
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