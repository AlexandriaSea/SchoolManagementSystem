/**
 * Student Name: Wenjie Zhou
 * Student Number: 301337168
 * Submission Date: Apr 12, 2024
 */

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Defines a Course component for course enrollment process
const Course = () => {

    // Hook for navigating to other components
    const navigate = useNavigate();

    // Setting the base URL for all Axios requests and enabling credentials for CORS
    axios.defaults.baseURL = 'http://localhost:8085';
    axios.defaults.withCredentials = true;

    const [courses, setCourses] = useState([]);
    const [term, setTerm] = useState();

    // Retrieves session token from cookies
    const sessionId = Cookies.get('session_token');

    // Effect hook for fetching courses after component mounts and when sessionId changes
    useEffect(() => {

        // Redirects to login page if no session token is found
        if (!sessionId) {
            alert('Please sign in first');
            navigate('/');
        } else {
            // Fetches available courses and handles possible errors
            const fetchCourses = async () => {
                try {
                    const response = await axios.get('/api/courses');
                    setCourses(response.data);
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            };
            fetchCourses();
        }
    }, [navigate, sessionId]);

    // Function to handle course enrollment
    const enrollCourse = async (studentId, courseId) => {
        try {
            const enrollment = {
                studentId: studentId,
                courseId: courseId,
                term: term
            };

            await axios.post('/api/enrollments', enrollment);
            alert('You have enrolled a course successfully!')

        } catch (error) {
            console.error('Error deleting enrollment:', error);
            alert('Enroll course failed!')
        }
    };

    // Logout handler that removes the session token cooki
    const handleLogout = () => {
        Cookies.remove('session_token', { path: '' });
    }

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
                <div>
                    <h2>Available Courses</h2>
                    <div className='row'>
                        <div className="col">
                            <p className="form-control">Selected Term</p>
                        </div>
                        <div className="col">
                            <select className="form-control" id="term" name='term' onChange={e => setTerm(e.target.value)} required>
                                <option value={'Winter 2024'}>Winter 2024</option>
                                <option value={'Summer 2024'}>Summer 2024</option>
                                <option value={'Fall 2024'}>Fall 2024</option>
                            </select>
                        </div>
                    </div>
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
                                        <button type="button" className='btn btn-primary btn-sm w-100' onClick={() => enrollCourse(sessionId, course._id)}>Enroll</button>
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

export default Course;