const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());
app.use(express.json());

const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/Assignment';

mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Routes
const departmentRoutes = require('./routes/departmentRoutes');
app.use('/department/', departmentRoutes);

const designationRoutes = require('./routes/Designationroutes');
app.use('/designation/', designationRoutes);

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employee/', employeeRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`);
});

