/**
 * Student Name: Wenjie Zhou
 * Student Number: 301337168
 * Submission Date: Apr 12, 2024
 */

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Defines a Home component for displaying enrolled courses for logged student
const Home = () => {

    // Hook for navigating to other components
    const navigate = useNavigate();

    // Setting the base URL for all Axios requests and enabling credentials for CORS
    axios.defaults.baseURL = 'http://localhost:8085';
    axios.defaults.withCredentials = true;

    const [courses, setCourses] = useState([]);

    // Retrieve session token from cookies
    const sessionId = Cookies.get('session_token');

    // Effect hook to fetch courses after component mounts and when dependencies change
    useEffect(() => {

        // Redirect to login page if session token is not found
        if (!sessionId) {
            alert('Please sign in first');
            navigate('/');
        } else {
            // Fetch courses from the backend and handle errors
            const fetchCourses = async () => {
                try {
                    const response = await axios.get(`/api/courses/student/${sessionId}`);
                    setCourses(response.data);
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            };
            fetchCourses();
        }
    }, [navigate, sessionId]);

    // Function to handle unenrollment from a course
    const deleteEnrollment = async (studentId, courseId) => {
        try {
            await axios.delete(`/api/enrollments/${studentId}/${courseId}`);
            // Update courses state by filtering out the unenrolled course
            setCourses(courses.filter(course => course._id !== courseId));
        } catch (error) {
            console.error('Error deleting enrollment:', error);
        }
    };

    // Logout handler that removes the session token cooki
    const handleLogout = () => {
        Cookies.remove('session_token', { path: '' });
    };

    return (
        <main>
            <div className="container">
                <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        <span className="fs-4">Student Portal</span>
                    </a>
                    <ul className="nav nav-pills">
                        <li className="nav-item"><a href="/home" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/course" className="nav-link">Course</a></li>
                        <li className="nav-item"><a href="/" onClick={handleLogout} className="nav-link">Logout</a></li>
                    </ul>
                </header>
            </div>

            <div className="container" style={{ backgroundColor: 'DarkSalmon', padding: '150px' }}>
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
                            <th>Action</th>
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
                                <td>
                                    <button type="button" className='btn btn-danger btn-sm w-100' onClick={() => deleteEnrollment(sessionId, course._id)}>Withdraw</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Home;