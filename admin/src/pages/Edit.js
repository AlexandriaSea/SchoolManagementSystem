/**
 * Student Name: Wenjie Zhou
 * Student Number: 301337168
 * Submission Date: Apr 12, 2024
 */

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Defines an Edit component for editing a selected student info
const Edit = () => {

    // Setting the base URL for all Axios requests and enabling credentials for CORS
    axios.defaults.baseURL = 'http://localhost:8085';
    axios.defaults.withCredentials = true;

    // Extract the student ID from the URL parameters
    const { id } = useParams();

    // Effect hook to fetch student data when the component mounts or the student ID changes
    useEffect(() => {
        const fetchStudentById = async () => {
            try {
                const response = await axios.get(`/api/students/${id}`);
                const studentData = response.data;

                // Populate form fields with fetched data
                document.getElementById('_id').value = studentData._id;
                document.getElementById('firstName').value = studentData.firstName;
                document.getElementById('lastName').value = studentData.lastName;
                document.getElementById('dob').value = studentData.dob;
                document.getElementById('gender').value = studentData.gender;
                document.getElementById('nationality').value = studentData.nationality;
                document.getElementById('address').value = studentData.address;
                document.getElementById('phone').value = studentData.phone;
                document.getElementById('email').value = studentData.email;
                document.getElementById('password').value = studentData.password;
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        };
        fetchStudentById();
    }, [id]);

    // Handle form submission for updating student
    const updateStudent = async () => {
        try {
            // Construct an updated student object from form data
            const updatedStudent = {
                _id: document.getElementById('_id').value,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                dob: document.getElementById('dob').value,
                gender: document.getElementById('gender').value,
                nationality: document.getElementById('nationality').value,
                address: document.getElementById('address').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };

            await axios.put(`/api/students/${id}`, updatedStudent);

        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    return (
        <main>
            <div className="container">
                <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        <span className="fs-4">Admin Portal</span>
                    </a>
                    <ul className="nav nav-pills">
                        <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/add" className="nav-link">Add</a></li>
                    </ul>
                </header>
            </div>

            <div className="container" style={{ backgroundColor: 'CadetBlue', padding: '150px' }}>
                <div>
                    <h2>Edit and Update Student</h2>
                    <form onSubmit={updateStudent}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px', margin: '0 auto' }}>
                            <label>Student ID:</label>
                            <input type="text" id="_id" name="_id" className="form-control form-control-sm" readOnly />
                            <label>First Name:</label>
                            <input type="text" id="firstName" name="firstName" className="form-control form-control-sm" required />
                            <label>Last Name:</label>
                            <input type="text" id="lastName" name="lastName" className="form-control form-control-sm" required />
                            <label>Date of Birth:</label>
                            <input type="date" id="dob" name="dob" className="form-control form-control-sm" required />
                            <label>Gender:</label>
                            <input type="text" id="gender" name="gender" className="form-control form-control-sm" required />
                            <label>Nationality:</label>
                            <input type="text" id="nationality" name="nationality" className="form-control form-control-sm" required />
                            <label>Address:</label>
                            <input type="text" id="address" name="address" className="form-control form-control-sm" required />
                            <label>Phone Number:</label>
                            <input type="text" id="phone" name="phone" className="form-control form-control-sm" required />
                            <label>Email:</label>
                            <input type="email" id="email" name="email" className="form-control form-control-sm" required />
                            <label>Password:</label>
                            <input type="text" id="password" name="password" className="form-control form-control-sm" readOnly />
                            <button type="submit" className='btn btn-primary btn-sm'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Edit;