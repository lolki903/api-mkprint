// let mysql = require('mysql2');

// let connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     port: 3306,
//     socketPath:'/Applications/MAMP/tmp/mysql/mysql.sock',
//     password: 'root',
//     database: 'mkprint'
// });

// connection.connect();

// module.exports = connection;
require('dotenv').config();
let mockResponse = null;

function setMockResponse(data, error) {
  mockResponse = { data, error };
}

function getMockResponse() {
  return mockResponse;
}
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPPABSE_KEY;
const connection = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

module.exports = {connection,setMockResponse,getMockResponse};
