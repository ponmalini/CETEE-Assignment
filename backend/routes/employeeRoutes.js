const express = require('express');
const router = express.Router();
require('dotenv').config();

const Employee= require('../models/Employee');


//Get route to fetch all Department
router.get('/getItems', async (req, res) => {
    try {
        const employee = await Employee.find();
        res.status(200).json({ message: 'Services retrieved',employee });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/add', async (req, res) => {
    const { name,gender,dob,mobile,email,doj,address,designation,image,department } = req.body;

    try {
        const employee = new Employee({ name,gender,dob,mobile,email,doj,address,designation,image,department  });
        await employee.save();

        res.status(201).json({ message: 'Saved successfully!' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error during Employee registration:', error);

        if (error.code === 11000) {
            return res.status(400).json({ message: 'Mobile or Email already exist' });
        }

        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.put('/update', async (req, res) => {
    try {
        const { name,gender,dob,mobile,email,doj,address,designation,image,department , _id } = req.body;
        const employee = await Employee.findByIdAndUpdate(_id, { name,gender,dob,mobile,email,doj,address,designation,image,department , _id }, { new: true });
        if (!employee ) {
            return res.status(404).json({ message: "Employee not found" })
        }
        res.status(200).json({ employee });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



module.exports = router;