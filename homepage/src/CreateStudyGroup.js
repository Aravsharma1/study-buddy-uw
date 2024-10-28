import React, { useState, useEffect } from 'react';

function CreateStudyGroup({ onSubmit }) {
  const [numStudents, setNumStudents] = useState('');
  const [location, setLocation] = useState('');
  const [meetingTimes, setMeetingTimes] = useState('');
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([]); // State to hold courses

  useEffect(() => {
    const fetchCourses = async () => {
      const apiKey = 'B294D887D5CE4FBB9A808C2CE9E7BDDB';
      const termCode = '1211'; // Winter 2021 term code
      const url = `https://openapi.data.uwaterloo.ca/v3/Courses/${termCode}`;

      try {
        const response = await fetch(url, {
          headers: {
            'X-API-KEY': apiKey,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const coursesData = await response.json();
        setCourses(coursesData); // Set courses in state
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

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
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        >
          <option value="">Select a course</option>
          {courses.length > 0 ? (
            courses.map((c) => (
              <option key={c.courseId} value={c.catalogNumber}>
                {c.subjectCode} {c.catalogNumber}
              </option>
            ))
          ) : (
            <option disabled>No courses available</option>
          )}
        </select>
      </div>

      <button type="submit">Create Study Group</button>
    </form>
  );
}

export default CreateStudyGroup;
