import sql from './mssql';

export async function getActiveLicenses(customerId: number) {
  try {
    const result = await sql`
      SELECT
        CustomerSeq,
        CustomerName,
        ProductName,
        ModuleName,
        ModuleLevelName,
        Datefrom,
        DateTo
      FROM vwMasterviewLicences
      WHERE DateFrom <= GETDATE()
        AND DateTo >= GETDATE()
        AND CustomerId = ${customerId}
    `;
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Failed to fetch licenses from SQL Server');
  }
}

