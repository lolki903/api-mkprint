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
let mockResponse = null;

function setMockResponse(data, error) {
  mockResponse = { data, error };
}

function getMockResponse() {
  return mockResponse;
}
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://vxlxnzngspqzdlwrhran.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4bHhuem5nc3BxemRsd3JocmFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQxNjM3OTYsImV4cCI6MjAwOTczOTc5Nn0.ubjGe6Qpw4nUsfrU52tg6mrj99bRxLuBfiS5jOrWdIU';

const connection = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

module.exports = {connection,setMockResponse,getMockResponse};
