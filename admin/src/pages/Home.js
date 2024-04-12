import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8085/api/students');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchStudents();
    }, []);

    const deleteStudentById = async (id) => {
        // Display a popup window to ask the user for confirmation to delete
        const confirmDelete = window.confirm(`You are about to delete the selected student \nStudent ID: ${id} \nAre you sure?`);

        // Return if user cancels delete action
        if (!confirmDelete) {
            return;
        }

        // Continue with the deletion of the student if the user confirms the delete action
        try {
            await axios.delete(`http://localhost:8085/api/students/${id}`);

            // Update the students state by filtering out the deleted student (Client Side)
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