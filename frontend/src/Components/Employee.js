
import React, { useState, useEffect } from 'react'
import Layout from './Layout/Layout'
import Swal from 'sweetalert2';
import axios from 'axios';


function Employee() {
    const [newTitle, setNewTitle] = useState('');

    const [name, setName] = useState('');
    const [gender, setGender] = useState('Male');
    const [dob, setDOB] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [doj, setDOJ] = useState('');
    const [image, setIMAGE] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');



    const [id, setId] = useState('');

    const [list, setList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [designationList, setDesignationList] = useState([]);

    // Fetch all cards on component mount
    useEffect(() => {
        fetchEmployee();
        fetchDepartments();
        fetchDesignation();
    }, []);

    const fetchDepartments = () => {
        axios
            .get('http://localhost:5000/department/getItems')
            .then((response) => {
                setDepartmentList(response.data.departments || []);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Fetch cards',
                    confirmButtonText: 'OK'
                });
            });
    };

    const fetchDesignation = () => {
        axios
            .get('http://localhost:5000/designation/getItems')
            .then((response) => {
                setDesignationList(response.data.designation || []);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Fetch cards',
                    confirmButtonText: 'OK'
                });
            });
    };

    const fetchEmployee = () => {
        axios
            .get('http://localhost:5000/employee/getItems')
            .then((response) => {
                setList(response.data.employee || []);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Fetch cards',
                    confirmButtonText: 'OK'
                });
            });
    };

    const handleNew = (title, id, name, gender, dob, mobile, email, doj, address, designation, image, department) => {
        setNewTitle(title);
        setName(name);
        setGender(gender)
        setDOB(dob)
        setMobile(mobile)
        setEmail(email)
        setDOJ(doj)
        setAddress(address)
        setDesignation(designation)
        setDepartment(department)
        setIMAGE(image)

        setId(id);
    };

    const addData = async () => {
        if (name == "") {
            alert('Name should not be empty.');
            return;
        }
        if (gender == "") {
            alert('Gender should not be empty.');
            return;
        }

        if (dob == "") {
            alert('DOB should not be empty.');
            return;
        }
        if (mobile == "") {
            alert('Mobile numbder should not be empty.');
            return;
        }
        if (mobile.length != 10) {
            alert('Mobile number should be in ten digit.');
            return;
        }
        if (isNaN(mobile)) {
            alert('Invalid Mobile number.');
            return;
        }
        if (email == "") {
            alert('Email should not be empty.');
            return;
        }
        if (doj == "") {
            alert('DOJ should not be empty.');
            return;
        }
        if (department == "") {
            alert('Department should not be empty.');
            return;
        }
        if (designation == "") {
            alert('Designation should not be empty.');
            return;
        }



        try {

            const data = { name, gender, dob, mobile, email, doj, address, designation, image, department };

            const result = await axios.post('http://localhost:5000/employee/add', data);
            console.log('Response:', result.data);
            Swal.fire({
                icon: 'success',
                title: 'Saved Successfully',
                confirmButtonText: 'OK'
            });
            fetchEmployee();

        } catch (err) {
            console.error('Error:', err);
            const errorMessage =
                err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : 'An unexpected error occurred.';
            alert(`Submit failed: ${errorMessage}`);
        }
    };
    const updateData = async () => {
        if (name == "") {
            alert('Name should not be empty.');
            return;
        }
        if (gender == "") {
            alert('Gender should not be empty.');
            return;
        }

        if (dob == "") {
            alert('DOB should not be empty.');
            return;
        }
        if (mobile == "") {
            alert('Mobile numbder should not be empty.');
            return;
        }
        if (mobile.length != 10) {
            alert('Mobile number should be in ten digit.');
            return;
        }
        if (isNaN(mobile)) {
            alert('Invalid Mobile number.');
            return;
        }
        if (email == "") {
            alert('Email should not be empty.');
            return;
        }
        if (doj == "") {
            alert('DOJ should not be empty.');
            return;
        }
        if (department == "") {
            alert('Department should not be empty.');
            return;
        }
        if (designation == "") {
            alert('Designation should not be empty.');
            return;
        }

        try {

            const data = { _id: id, name, gender, dob, mobile, email, doj, address, designation, image, department };

            const result = await axios.put('http://localhost:5000/employee/update', data);
            console.log('Response:', result.data);
            Swal.fire({
                icon: 'success',
                title: 'Saved Successfully',
                confirmButtonText: 'OK'
            });
            fetchEmployee();

        } catch (err) {
            console.error('Error:', err);
            const errorMessage =
                err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : 'An unexpected error occurred.';
            alert(`Submit failed: ${errorMessage}`);
        }
    };
    const deleteData = (id) => {
        let result = window.confirm("Are you sure you want to delete this item?");
        if (result) {
            axios
                .delete(`http://localhost:5000/employee/delete/${id}`)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted Successfully',
                        confirmButtonText: 'OK'
                    });
                    fetchEmployee();
                })
                .catch((error) => {
                    console.error('Error deleting card:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to delete ;',
                        confirmButtonText: 'OK'
                    });
                });
        }
    };

    return (
        <Layout>
            <div className="container mt-5">
                <h2>Employees</h2>
                <table className="table table-striped table-hover table-bordered fs-6">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">DOB</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Address</th>
                            <th scope="col">Email</th>
                            <th scope="col">DOJ</th>
                            <th scope="col">Department</th>
                            <th scope="col">Designation</th>
                            <th scope="col" style={{ width: '12rem' }}>
                                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    onClick={() => handleNew('New Employee', 0, '', 'Male', '', '', '', '', '', '', '', '')}>
                                    Add
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((employee) =>
                            <tr key={employee._id}>
                                <td><img src={employee.image} className="card-img-top" style={{ width: "100px", height: "100px  ", margin: "auto" }} /></td>
                                <td>{employee.name}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.dob}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.address}</td>
                                <td>{employee.email}</td>
                                <td>{employee.doj}</td>
                                <td>{employee.department}</td>
                                <td>{employee.designation}</td>
                                <td>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => handleNew('Edit Employee', employee._id, employee.name, employee.gender, employee.dob, employee.mobile, employee.email, employee.doj, employee.address, employee.designation, employee.image, employee.department)}>
                                        Edit
                                    </button>

                                    <button type="button" className="btn btn-danger m-1" onClick={() => deleteData(employee._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{newTitle} </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div class="mb-3 row">
                                    <label for="staticEmail" class="col-sm-2 col-form-label">Id</label>
                                    <div class="col-sm-10">
                                        <input type="text" readonly class="form-control-plaintext" value={id} />
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="inputName" value={name}
                                            onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>

                                <div class="mb-3 row">
                                    <label for="inputName" class="col-sm-2 col-form-label">Gender</label>
                                    <div class="col-sm-10">
                                        <select
                                            className="form-select form-select-lg mb-3"
                                            aria-label=".form-select-lg example"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Others</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="mb-3 row">
                                    <label for="inputName" class="col-sm-2 col-form-label">DOB</label>
                                    <div class="col-sm-10">
                                        <input type="date" class="form-control" id="inputName" value={dob}
                                            onChange={(e) => setDOB(e.target.value)} />
                                    </div>
                                </div>

                                <div class="mb-3 row">
                                    <label for="inputName" class="col-sm-2 col-form-label">Address</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={address}
                                            onChange={(e) => setAddress(e.target.value)} ></textarea>
                                    </div>
                                </div>

                                <div class="mb-3 row">
                                    <label for="inputName" class="col-sm-2 col-form-label">Mobile</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="inputName" value={mobile} maxLength={10}
                                            onChange={(e) => setMobile(e.target.value)} />
                                    </div>
                                </div>

                                <div class="mb-3 row">
                                    <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                                    <div class="col-sm-10">
                                        <input type="email" class="form-control" id="inputEmail" value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                <div class="mb-3 row">
                                    <label for="inputName" class="col-sm-2 col-form-label">Department</label>
                                    <div class="col-sm-10">
                                        <select
                                            className="form-select form-select-lg mb-3"
                                            aria-label=".form-select-lg example"
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}                                        >
                                            {departmentList.map((item) => (
                                                <option key={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div class="mb-3 row">
                                    <label for="inputName" class="col-sm-2 col-form-label">Designation</label>
                                    <div class="col-sm-10">
                                        <select
                                            className="form-select form-select-lg mb-3"
                                            aria-label=".form-select-lg example"
                                            value={designation}
                                            onChange={(e) => setDesignation(e.target.value)}                                        >
                                            {designationList.filter(e => e.department == department).map((item) => (
                                                <option key={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div class="mb-3 row">
                                    <label for="inputName" class="col-sm-2 col-form-label">DOJ</label>
                                    <div class="col-sm-10">
                                        <input type="date" class="form-control" id="inputName" value={doj}
                                            onChange={(e) => setDOJ(e.target.value)} />
                                    </div>
                                </div>

                                <div class="mb-3 row">
                                    <label for="inputName" class="col-sm-2 col-form-label">Image</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="inputName" value={image}
                                            onChange={(e) => setIMAGE(e.target.value)} />
                                    </div>
                                </div>

                                <div class="mb-3 row">
                                    <label for="" class="col-sm-8 col-form-label">
                                    </label>
                                    <div class="col-sm-4">
                                        <button type="button" class="btn btn-secondary m-1" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-success" onClick={() => newTitle == 'New Employee' ? addData() : updateData()}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export default Employee