// Test script to check Render API endpoints
const API_URL = 'https://login-jae4.onrender.com'

async function testEndpoints() {
  console.log('Testing Render API endpoints...\n')
  
  // Test 1: Root endpoint
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    console.log('✅ Root endpoint (/):', response.status)
    console.log('   Available endpoints:', data.endpoints)
  } catch (error) {
    console.log('❌ Root endpoint failed:', error.message)
  }
  
  // Test 2: Health check
  try {
    const response = await fetch(`${API_URL}/api/health`)
    const data = await response.json()
    console.log('\n✅ Health endpoint:', response.status, data)
  } catch (error) {
    console.log('\n❌ Health endpoint failed:', error.message)
  }
  
  // Test 3: Password forgot endpoint
  try {
    const response = await fetch(`${API_URL}/api/password/forgot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' })
    })
    console.log('\n✅ Password forgot endpoint:', response.status)
    const data = await response.json()
    console.log('   Response:', data)
  } catch (error) {
    console.log('\n❌ Password forgot endpoint failed:', error.message)
  }
}

testEndpoints()
