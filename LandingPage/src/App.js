import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CoursePage from './components/CoursePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/course/:courseName" element={<CoursePage />} />
            </Routes>
        </Router>
    );
};

export default App;
