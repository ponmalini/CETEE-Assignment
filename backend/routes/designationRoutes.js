const express = require('express');
const router = express.Router();
require('dotenv').config();

const Designation= require('../models/Designation');


//Get route to fetch all Department
router.get('/getItems', async (req, res) => {
    try {
        const designation = await Designation.find();
        res.status(200).json({ message: 'Services retrieved',designation });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/add', async (req, res) => {
    const { name,description,department } = req.body;

    try {
        const designation = new Designation({ name,description,department });
        await designation .save();

        res.status(201).json({ message: 'Designation registered successfully!' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error during Designation registration:', error);

        if (error.code === 11000) {
            return res.status(400).json({ message: 'Name already exist' });
        }

        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.put('/update', async (req, res) => {
    try {
        const { name,description,department, _id } = req.body;
        const designation = await Designation.findByIdAndUpdate(_id, { name,description,department, _id }, { new: true });
        if (!designation ) {
            return res.status(404).json({ message: "designation not found" })
        }
        res.status(200).json({ designation });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteDesignation = await Designation.findByIdAndDelete(id);
        if (!deleteDesignation) {
            return res.status(404).json({ message: 'Designation not found' });
        }

        res.status(200).json({ message: 'Designation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



module.exports = router;