import { db } from './db';
import { sql } from 'drizzle-orm';

export async function getActiveLicenses(customerSeq: number) {
  const result = await db.execute(
    sql`
      SELECT 
        "CustomerSeq", 
        "CustomerName", 
        "ProductName", 
        "ModuleName", 
        "ModuleLevelName", 
        "DateFrom", 
        "DateTo"
      FROM vwMasterviewLicences
      WHERE 
        "DateFrom" <= CURRENT_DATE 
        AND "DateTo" >= CURRENT_DATE 
        AND "CustomerId" = ${customerSeq};
    `
  );
  return result.rows;
}

import { db } from './db';
import { sql } from 'drizzle-orm';

export async function getActiveLicenses(customerId: number) {
  const result = await db.execute(
    sql`
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
        AND "CustomerId" = ${customerId};
    `
  );

  return result.rows;
}



