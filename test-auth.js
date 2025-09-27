// Test script to check user registration and login
const axios = require('axios');

async function testUserFlow() {
  try {
    console.log('Testing user registration...');
    
    // Try to register a test user
    const registerResponse = await axios.post('http://localhost:5000/api/users/register', {
      name: 'Test User',
      email: 'test@vinoir.com',
      password: '🌟🎭👑' // emoji password
    });
    
    console.log('Registration successful:', registerResponse.data);
    
    // Now try to login with the same credentials
    console.log('Testing user login...');
    
    const loginResponse = await axios.post('http://localhost:5000/api/users/login', {
      email: 'test@vinoir.com',
      password: '🌟🎭👑' // same emoji password
    });
    
    console.log('Login successful:', loginResponse.data);
    
    // Test the /me endpoint
    console.log('Testing /me endpoint...');
    
    const meResponse = await axios.get('http://localhost:5000/api/users/me', {
      headers: {
        Authorization: `Bearer ${loginResponse.data.token}`
      }
    });
    
    console.log('Me endpoint successful:', meResponse.data);
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testUserFlow();