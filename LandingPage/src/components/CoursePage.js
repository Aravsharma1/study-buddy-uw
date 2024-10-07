import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';

const studyGroups = [
    { groupName: 'Math 135 Study Group 1', members: 5, meetingTime: 'Fridays at 4 PM' },
    { groupName: 'CS 135 Study Group 1', members: 7, meetingTime: 'Sundays at 3 PM' }
];

const CoursePage = () => {
    const { courseName } = useParams();
    console.log("Course Name:", courseName); // Check if the course name is received
    const filteredGroups = studyGroups.filter(group => group.groupName.includes(courseName));

    return (
        <Container maxWidth="lg" className="mt-10">
            <Typography variant="h4" className="text-center mb-8 font-bold">
                Study Groups for {courseName}
            </Typography>
            {filteredGroups.length === 0 ? (
                <Typography className="text-center">No study groups available.</Typography>
            ) : (
                filteredGroups.map((group, index) => (
                    <Card key={index} className="mb-4 shadow-lg rounded-lg">
                        <CardContent>
                            <Typography variant="h5" className="font-semibold">
                                {group.groupName}
                            </Typography>
                            <Typography variant="body2">
                                Members: {group.members}
                            </Typography>
                            <Typography variant="body2">
                                Meeting Time: {group.meetingTime}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                className="mt-4"
                                onClick={() => alert(`Joining ${group.groupName}`)}
                            >
                                Join Group
                            </Button>
                        </CardContent>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default CoursePage;
