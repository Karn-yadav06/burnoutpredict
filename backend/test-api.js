
// const aiRoutes = require("./routes/aiRoutes");

// app.use("/api/ai", aiRoutes);

const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('--- STARTING BACKEND ROBUST VALIDATION TESTS ---');

  // Helper
  const post = async (endpoint, data, token) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    });
    return { status: res.status, body: await res.json() };
  };

  // Test 1: Validate invalid email and weak password registration (should fail validation)
  console.log('\n[TEST 1] Registering User with Invalid Details...');
  const badUser = {
    name: 'J', // too short
    email: 'not-an-email',
    password: '123' // weak
  };
  const test1 = await post('/auth/register', badUser);
  console.log(`Status code expected: 400. Got: ${test1.status}`);
  console.log('Validation errors returned:', JSON.stringify(test1.body.errors, null, 2));

  // Test 2: Registering valid user
  console.log('\n[TEST 2] Registering User with Valid Details...');
  const randomEmail = `hr.manager_${Math.floor(Math.random() * 10000)}@workplace.com`;
  const goodUser = {
    name: 'Chief HR Officer',
    email: randomEmail,
    password: 'SecurePassword123' // validation passes
  };
  const test2 = await post('/auth/register', goodUser);
  console.log(`Status code expected: 201. Got: ${test2.status}`);
  console.log('Registration details:', test2.body.success ? 'SUCCESS ✓' : 'FAILED ✗');
  const token = test2.body.token;

  // Test 3: Validate diagnostic prediction bounds (should fail validation)
  console.log('\n[TEST 3] Running Diagnostics with Out-of-bounds parameters...');
  const outOfBoundsInput = {
    employeeName: '', // empty
    department: 'Marketing',
    workloadLevel: 10, // out of 1-5 range
    weeklyHours: 500, // max is 100
    jobSatisfaction: 0, // min is 1
    remoteWork: 'not-a-boolean',
    sickDays: -5 // negative
  };
  const test3 = await post('/predict', outOfBoundsInput, token);
  console.log(`Status code expected: 400. Got: ${test3.status}`);
  console.log('Validation errors returned:', JSON.stringify(test3.body.errors, null, 2));

  // Test 4: Running diagnostics with correct metrics
  console.log('\n[TEST 4] Running Diagnostics with Valid parameters...');
  const perfectInput = {
    employeeName: 'Sarah Connor',
    department: 'Sales',
    workloadLevel: 4,
    weeklyHours: 52,
    jobSatisfaction: 2,
    remoteWork: true,
    sickDays: 3
  };
  const test4 = await post('/predict', perfectInput, token);
  console.log(`Status code expected: 201. Got: ${test4.status}`);
  console.log('Risk level returned:', test4.body.prediction?.riskLevel);
  console.log('Score:', test4.body.prediction?.predictedScore);
  console.log('Recommendation:', test4.body.prediction?.recommendation);

  // Test 5: Validate demo request booking
  console.log('\n[TEST 5] Submitting Demo Request (Incomplete company info)...');
  const badContact = {
    name: 'John Doe',
    company: '', // required, blank
    email: 'johndoe@test' // invalid
  };
  const test5 = await post('/contact', badContact);
  console.log(`Status code expected: 400. Got: ${test5.status}`);
  console.log('Validation errors returned:', JSON.stringify(test5.body.errors, null, 2));

  console.log('\n--- TESTS COMPLETED ---');
}

runTests().catch(console.error);
