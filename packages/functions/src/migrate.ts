import { ApiHandler } from "sst/node/api";
import { drizzle } from 'drizzle-orm/aws-data-api/pg';
import { migrate } from 'drizzle-orm/aws-data-api/pg/migrator';
import { RDSDataClient } from '@aws-sdk/client-rds-data';

const db = drizzle(new RDSDataClient(), {
  database: 'shared',
  secretArn: 'arn:aws:secretsmanager:us-east-1:211691440860:secret:rdsClusterSecret694AB211-RygWWq3dFnJR-AZKiRg',
  resourceArn: 'arn:aws:rds:us-east-1:211691440860:cluster:patrick-g-drizzle-test-rds',
});

export const handler = ApiHandler(async (_evt) => {

  await migrate(db, { migrationsFolder: './packages/functions/drizzle' })

  return {
    statusCode: 200,
    body: `test`,
  };
});
