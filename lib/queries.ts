import sql from 'mssql';

// Database Configuration
const config = {
  user: process.env.STACC_DATABASE_USERNAME!,
  password: process.env.STACC_DATABASE_PASSWORD!,
  server: process.env.STACC_SERVER_URL!,
  database: process.env.STACC_DATABASE_NAME!,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};
export async function getDBConnection() {
  try {
    return await sql.connect(config);
  } catch (error) {
    console.error('❌ DB connection failed:', error);
    throw new Error('Database connection error');
  }
}
export async function getActiveLicenses(customerSeq: number) {
  try {
    const pool = await getDBConnection();
    const result = await pool.request().input('customerSeq', customerSeq)
      .query(`
       SELECT 
         "CustomerSeq", 
         "CustomerName", 
         "ProductName", 
         "ModuleName", 
         "ModuleLevelName", 
         "DateFrom", 
         "DateTo"
       FROM "vwMasterviewLicences"
       WHERE 
         "DateFrom" <= CURRENT_DATE 
         AND "DateTo" >= CURRENT_DATE 
         AND "CustomerId" = ${customerSeq};
    `);

    return { result };
  } catch (error: any) {
    console.error('❌ Error fetching articles:', error.message);
    return { error: 'Failed to fetch articles', details: error.message };
  }
}
export async function getAllArticles() {
  try {
    const pool = await getDBConnection();
    const result = await pool.request().query(`
       SELECT 
         *
       FROM "descriptions"
    `);

    return { result };
  } catch (error: any) {
    console.error('❌ Error fetching articles:', error.message);
    return { error: 'Failed to fetch articles', details: error.message };
  }
}
export async function getArticle(descriptionSeq: number) {
  try {
    const pool = await getDBConnection();
    const result = await pool.request().input('descriptionSeq', descriptionSeq)
      .query(`
       SELECT 
         *
       FROM "descriptions"
       WHERE 
         "DescriptionSeq" = ${descriptionSeq};
    `);

    return { result };
  } catch (error: any) {
    console.error('❌ Error fetching articles:', error.message);
    return { error: 'Failed to fetch articles', details: error.message };
  }
}
// const staccDB = drizzle(neon(process.env.STACC_URL!, { readOnly: true, fetchOptions: {

// } }));

// export async function getActiveLicenses(customerSeq: number) {
//   const result = await staccDB.execute(
//     sql`
//       SELECT
//         "CustomerSeq",
//         "CustomerName",
//         "ProductName",
//         "ModuleName",
//         "ModuleLevelName",
//         "DateFrom",
//         "DateTo"
//       FROM "vwMasterviewLicences"
//       WHERE
//         "DateFrom" <= CURRENT_DATE
//         AND "DateTo" >= CURRENT_DATE
//         AND "CustomerId" = ${customerSeq};
//     `
//   );
//   return result.rows;
// }

// export async function getActiveLicenses(customerId: number) {
//   const result = await db.execute(
//     sql`
//       SELECT
//         "CustomerSeq",
//         "CustomerName",
//         "ProductName",
//         "ModuleName",
//         "ModuleLevelName",
//         "DateFrom",
//         "DateTo"
//       FROM "vwMasterviewLicences"
//       WHERE
//         "DateFrom" <= CURRENT_DATE
//         AND "DateTo" >= CURRENT_DATE
//         AND "CustomerId" = ${customerId};
//     `
//   );

//   return result.rows;
// }
