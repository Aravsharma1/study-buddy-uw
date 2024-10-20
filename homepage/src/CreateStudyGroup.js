// File: src/CreateStudyGroup.js
import React, { useState } from 'react';

function CreateStudyGroup({ onSubmit }) {
  const [numStudents, setNumStudents] = useState('');
  const [location, setLocation] = useState('');
  const [meetingTimes, setMeetingTimes] = useState('');
  const [course, setCourse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ numStudents, location, meetingTimes, course });
    // Clear form after submission
    setNumStudents('');
    setLocation('');
    setMeetingTimes('');
    setCourse('');
  };

  return (
    <form onSubmit={handleSubmit} className="create-study-group-form">
      <div>
        <label>Number of Students:</label>
        <input
          type="number"
          value={numStudents}
          onChange={(e) => setNumStudents(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Meeting Times:</label>
        <input
          type="text"
          value={meetingTimes}
          onChange={(e) => setMeetingTimes(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Course:</label>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
      </div>

      <button type="submit">Create Study Group</button>
    </form>
  );
}

export default CreateStudyGroup;
