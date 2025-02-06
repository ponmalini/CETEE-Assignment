import React, { useState, useEffect } from 'react'
import Layout from './Layout/Layout'
import Swal from 'sweetalert2';
import axios from 'axios';


function Department() {
    const [newTitle, setNewTitle] = useState('');

    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [id, setId] = useState('');

    const [list, setList] = useState([]);

    // Fetch all cards on component mount
    useEffect(() => {
        fetchDepartments();
    }, []);


    const fetchDepartments = () => {
        axios
            .get('http://localhost:5000/department/getItems')
            .then((response) => {
                setList(response.data.departments || []);
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

    const handleNew = (title, id, name, description) => {
        setNewTitle(title);
        setName(name);
        setDescription(description);
        setId(id);
    };

    const addData = async () => {
        if (Name == '' || Description == '') {
            alert('Name and Description should not be empty.');
            return;
        }

        try {

            const data = { name: Name, description: Description };

            const result = await axios.post('http://localhost:5000/department/add', data);
            console.log('Response:', result.data);
            Swal.fire({
                icon: 'success',
                title: 'Saved Successfully',
                confirmButtonText: 'OK'
            });
            fetchDepartments();

        } catch (err) {
            console.error('Error:', err);
            const errorMessage =
                err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : 'An unexpected error occurred.';
            alert(`Submit failed: ${errorMessage}`);
        }
    };
    const updateData =async () => {
        if (Name == '' || Description == '') {
            alert('Name and Description should not be empty.');
            return;
        }

        try {

            const data = { name: Name, description: Description,_id:id };

            const result = await axios.put('http://localhost:5000/department/update', data);
            console.log('Response:', result.data);
            Swal.fire({
                icon: 'success',
                title: 'Saved Successfully',
                confirmButtonText: 'OK'
            });
            fetchDepartments();

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
                .delete(`http://localhost:5000/department/delete/${id}`)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted Successfully',
                        confirmButtonText: 'OK'
                    });
                    fetchDepartments();
                })
                .catch((error) => {
                    console.error('Error deleting card:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to delete card;',
                        confirmButtonText: 'OK'
                    });
                });
        }
    };

    return (
        <Layout>
            <div className="container mt-5">
                <h2>Department</h2>
                <table className="table table-striped table-hover table-bordered fs-6">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col" style={{ width: '12rem' }}>
                                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    onClick={() => handleNew('New Department', 0, '', '')}>
                                    Add
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((department) =>
                            <tr key={department._id}>
                                <td>{department.name}</td>
                                <td>{department.description}</td>
                                <td>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => handleNew('Edit Department', department._id, department.name, department.description)}>
                                        Edit
                                    </button>

                                    <button type="button" className="btn btn-danger m-1" onClick={() => deleteData(department._id)}>
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
                                        <input type="text" class="form-control" id="inputName" value={Name}
                                            onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputDescription" class="col-sm-2 col-form-label">Description</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="inputDescription" value={Description}
                                            onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="" class="col-sm-8 col-form-label">
                                    </label>
                                    <div class="col-sm-4">
                                    <button type="button" class="btn btn-secondary m-1" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-success" onClick={() => newTitle=='New Department'? addData():updateData()}>Save</button>
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

export default Department