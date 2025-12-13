const http = require('http');

const PORT = process.env.PORT || 3001;
const HOST = 'localhost';

console.log(`\n🧪 Testing Transio Saxon Server Connection...\n`);
console.log(`Target: http://${HOST}:${PORT}/api/health\n`);

const options = {
  hostname: HOST,
  port: PORT,
  path: '/api/health',
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Headers:`, JSON.stringify(res.headers, null, 2));
    console.log(`\nResponse Body:`);
    
    try {
      const parsed = JSON.parse(data);
      console.log(JSON.stringify(parsed, null, 2));
      
      if (res.statusCode === 200 && parsed.status === 'ok') {
        console.log('\n✅ Server is healthy and responding correctly!');
        process.exit(0);
      } else if (res.statusCode === 503) {
        console.log('\n⚠️  Server is running but Saxon-HE is not installed');
        console.log('   Run: cd server && npm run setup');
        process.exit(1);
      } else {
        console.log('\n⚠️  Server responded but with unexpected status');
        process.exit(1);
      }
    } catch (error) {
      console.log(data);
      console.log('\n❌ Failed to parse JSON response');
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.log('❌ Connection Failed!\n');
  console.log(`Error: ${error.message}\n`);
  
  if (error.code === 'ECONNREFUSED') {
    console.log('🔍 Troubleshooting:');
    console.log('   1. Is the server running? Start it with:');
    console.log('      cd server && npm start');
    console.log('   2. Is it running on the correct port?');
    console.log(`      Expected: ${PORT}`);
    console.log('   3. Check for firewall/antivirus blocking localhost');
  } else if (error.code === 'ETIMEDOUT') {
    console.log('🔍 Troubleshooting:');
    console.log('   1. Server might be overloaded or hanging');
    console.log('   2. Try restarting the server');
  } else {
    console.log('🔍 Unexpected error. Check server logs.');
  }
  
  console.log('');
  process.exit(1);
});

req.on('timeout', () => {
  console.log('❌ Request timed out (5 seconds)');
  req.destroy();
  process.exit(1);
});

req.setTimeout(5000);
req.end();
