const express = require('express');
const router = express.Router();
require('dotenv').config();

const Department = require('../models/Department');


//Get route to fetch all Department
router.get('/getItems', async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json({ message: 'Services retrieved',departments });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/add', async (req, res) => {
    const { name,description } = req.body;

    try {
        const department = new Department({ name,description });
        await department.save();

        res.status(201).json({ message: 'Department registered successfully!' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error during Department registration:', error);

        if (error.code === 11000) {
            return res.status(400).json({ message: 'Name already exist' });
        }

        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.put('/update', async (req, res) => {
    try {
        const { name,description, _id } = req.body;
        const department = await Department.findByIdAndUpdate(_id, { name,description, _id }, { new: true });
        if (!department) {
            return res.status(404).json({ message: "department not found" })
        }
        res.status(200).json({ department });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteDepartment = await Department.findByIdAndDelete(id);
        if (!deleteDepartment) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



module.exports = router;