/**
 * Student Name: Wenjie Zhou
 * Student Number: 301337168
 * Submission Date: Apr 12, 2024
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Defines a Detail component for displaying enrolled courses for selected student
const Detail = () => {

    // Setting the base URL for all Axios requests and enabling credentials for CORS
    axios.defaults.baseURL = 'http://localhost:8085';
    axios.defaults.withCredentials = true;

    // Extract the student ID from the URL parameters
    const { id } = useParams();

    const [courses, setCourses] = useState([]);

    // Effect hook to fetch courses data when the component mounts or the student ID changes
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`/api/courses/student/${id}`);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, [id]);

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

            <div className="container" style={{ backgroundColor: 'DarkSalmon', padding: '150px' }}>
                <div>
                    <h2>Enrolled Courses</h2>
                    <table className='table table-light table-striped'>
                        <thead>
                            <tr>
                                <th>Course ID</th>
                                <th>Course Code</th>
                                <th>Course Title</th>
                                <th>Course Hour</th>
                                <th>Campus</th>
                                <th>Method</th>
                                <th>Date of Creation</th>
                                <th>Professor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course._id}>
                                    <td>{course._id}</td>
                                    <td>{course.code}</td>
                                    <td>{course.title}</td>
                                    <td>{course.hour}</td>
                                    <td>{course.campus}</td>
                                    <td>{course.method}</td>
                                    <td>{course.doc}</td>
                                    <td>{course.professor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default Detail;