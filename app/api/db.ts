import sql from 'mssql';

// Database configuration
const config = {
  user: 'StaccUIB',
  password: 'puoNma01ZGpAGAep', 
  server: 'stacc.database.windows.net', 
  database: 'EscaliLicencesDev', 
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
  },
};

// Function to connect to the database
export async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

export default sql;
