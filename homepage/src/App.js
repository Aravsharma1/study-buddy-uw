// File: src/App.js
import React, { useState } from 'react';
import './homepage.css';
import Navbar from './Navbar';
import CreateStudyGroup from './CreateStudyGroup';

export default function App() {
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  const handleCreateClick = () => {
    setIsCreatingGroup(true);  // Show the form to create a study group
  };

  const handleViewClick = () => {
    setIsCreatingGroup(false);  // Hide the form, show view study groups content
  };

  const handleFormSubmit = (groupData) => {
    console.log('New Study Group:', groupData);
    setIsCreatingGroup(false);  // Hide form after submission
  };
  const WelcomeMessage = () => {
    return <p>Welcome, user!</p>;
  };

  return (
    <div className="App">
      <Navbar onCreateClick={handleCreateClick} onViewClick={handleViewClick} />

      {isCreatingGroup ? (
        <CreateStudyGroup onSubmit={handleFormSubmit} />
      ) : (
        <div>
          <h2>Welcome to Study Buddy! <WelcomeMessage /></h2>
          {/* Placeholder for viewing study groups */}
        </div>
      )}
    </div>
  );
}
