import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Dashboard.css'; // Assuming Dashboard.css is in src/styles/

const courses = [
    { name: 'Math 135', description: 'Find study groups for Math 135' },
    { name: 'CS 135', description: 'Join study groups for CS 135' },
];

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">We help you find study buddies</h1>
            <div className="courses">
                {courses.map((course, index) => (
                    <div key={index} className="course-card">
                        <h2 className="course-title">{course.name}</h2>
                        <p className="course-description">{course.description}</p>
                        <Link to={`/course/${course.name}`}>
                            <button className="find-study-group-btn">Find Study Groups</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
