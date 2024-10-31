const https = require('https');
const dotenv = require("dotenv");
dotenv.config({path: './.env'});

const apiKey = process.env.waterlooapikey;
const termCode = '1211'; // Replace with the term code you want (e.g., '1211' for Winter 2021)

const url = `https://openapi.data.uwaterloo.ca/v3/Locations`;


const options = {
  headers: {
    'X-API-KEY': apiKey,
  },
};


https.get(url, options, (response) => {
  let data = '';

  // A chunk of data has been received.
  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    const courses = JSON.parse(data);
    console.log('Available CS courses\n');
    for (const course of courses){
          console.log(`${course.buildingName}`);
    }
    
  });

}).on('error', (error) => {
  console.error('Error:', error.message);
});
