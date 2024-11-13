import React, { useState, useEffect } from 'react';

function CreateStudyGroup({ onSubmit }) {
  const [studyGroupid, setStudyGroupID] = useState('');
  const [numStudents, setNumStudents] = useState('');
  const [location, setLocation] = useState('');
  const [meetingTimes, setMeetingTimes] = useState('');
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([]); // State to hold courses
  const [bldg, setBldg] = useState([]); // State to hold building names

  useEffect(() => {
    cons fetchCourses = async () => {
      const apiKey = 'B294D887D5CE4FBB9A808C2CE9E7BDDB';
      const termCode = '1211'; // Winter 2021 term code
      const url = `https://openapi.data.uwaterloo.ca/v3/Courses/${termCode}`;
      const url2 = `https://openapi.data.uwaterloo.ca/v3/Courses/${termCode}`;

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

  useEffect(() => {
    const fetchBldg = async () => {
      const apiKey = 'B294D887D5CE4FBB9A808C2CE9E7BDDB';
      const url = `https://openapi.data.uwaterloo.ca/v3/Locations`;

      try {
        const response = await fetch(url, {
          headers: {
            'X-API-KEY': apiKey,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const bldgData = await response.json();
        setBldg(bldgData); // Set building names in state
      } catch (error) {
        console.error('Error fetching building names:', error);
      }
    };

    fetchBldg();
  }, []); // Fetch buildings on component mount

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ studyGroupid, numStudents, location, meetingTimes, course });
    // Clear form after submission
    setStudyGroupID(''); // Corrected state reset
    setNumStudents('');
    setLocation('');
    setMeetingTimes('');
    setCourse('');
  };

  return (
    <form onSubmit={handleSubmit} className="create-study-group-form">
      <div>
        <label>Enter a Study Group ID:</label>
        <input
          type="number"
          value={studyGroupid}
          onChange={(e) => setStudyGroupID(e.target.value)}
          required
        />
      </div>
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
        <select
          value={location} // Correctly set to location state
          onChange={(e) => setLocation(e.target.value)} // Set location on change
          required
        >
          <option value="">Select a building</option>
          {bldg.length > 0 ? (
            bldg.map((b) => (
              <option key={b.buildingId} value={b.buildingName}>
                {b.buildingName}
              </option>
            ))
          ) : (
            <option disabled>No buildings available</option>
          )}
        </select>
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
