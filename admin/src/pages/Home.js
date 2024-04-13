/**
 * Student Name: Wenjie Zhou
 * Student Number: 301337168
 * Submission Date: Apr 12, 2024
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// The Home component serves as the main view for displaying all student data
const Home = () => {

    // Setting the base URL for all Axios requests and enabling credentials for CORS
    axios.defaults.baseURL = 'http://localhost:8085';
    axios.defaults.withCredentials = true;

    // useState hook to manage the list of students displayed on the page
    const [students, setStudents] = useState([]);

    // useEffect hook to fetch student data from the API on component mount
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('/api/students');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchStudents();
    }, []);

    // Function to handle the deletion of a student by ID
    const deleteStudentById = async (id) => {

        // Display a popup window to ask the user for confirmation to delete
        const confirmDelete = window.confirm(`You are about to delete the selected student \nStudent ID: ${id} \nAre you sure?`);
        if (!confirmDelete) {
            return;
        }

        // Continue with the deletion of the student if the user confirms the delete action
        try {
            await axios.delete(`/api/students/${id}`);

            // Update the local state to remove the student without needing to fetch all data again
            setStudents(students.filter(student => student._id !== id));
        } catch (error) {
            console.error('Error deleting student:', error);
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

            <div className="container" style={{ backgroundColor: 'lightblue', padding: '150px' }}>
                <div>
                    <h2>List of All Students</h2>
                    <table className='table table-light table-striped'>
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>Nationality</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student._id}>
                                    <td>{student._id}</td>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.dob}</td>
                                    <td>{student.gender}</td>
                                    <td>{student.nationality}</td>
                                    <td>{student.address}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <Link type="button" className="btn btn-primary btn-sm w-100" to={`/detail/${student._id}`}>Course</Link>
                                        <Link type="button" className="btn btn-success btn-sm w-100" to={`/edit/${student._id}`}>Edit</Link>
                                        <button type="button" className='btn btn-danger btn-sm w-100' onClick={() => deleteStudentById(student._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default Home;