import sql from 'mssql';

const config = {
  user: 'StaccUIB',
  password: 'puoNma01ZGpAGAep',
  server: 'stacc.database.windows.net',
  database: 'EscaliLicencesDev',
  options: {
    encrypt: true, // for Azure
  },
};

export async function getActiveLicenses(customerId: number) {
  try {
    await sql.connect(config);

    const result = await sql.query(`
      SELECT
        CustomerSeq,
        CustomerName,
        ProductName,
        ModuleName,
        ModuleLevelName,
        DateFrom,
        DateTo
      FROM vwMasterviewLicences
      WHERE
        DateFrom <= GETDATE()
        AND DateTo >= GETDATE()
        AND CustomerId = ${customerId}
    `);

    return result.recordset;
  } catch (error) {
    console.error('SQL Server query error:', error);
    throw error;
  } finally {
    await sql.close();
  }
}

