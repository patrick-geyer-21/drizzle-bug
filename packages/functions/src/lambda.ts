import { ApiHandler } from "sst/node/api";
import { drizzle } from 'drizzle-orm/aws-data-api/pg';
import { RDSDataClient } from '@aws-sdk/client-rds-data';
import { orders } from "./schema";

const db = drizzle(new RDSDataClient(), {
  logger: true,
  database: 'shared',
  secretArn: 'arn:aws:secretsmanager:us-east-1:211691440860:secret:rdsClusterSecret694AB211-RygWWq3dFnJR-AZKiRg',
  resourceArn: 'arn:aws:rds:us-east-1:211691440860:cluster:patrick-g-drizzle-test-rds',
});

export const handler = ApiHandler(async (_evt) => {
  await db.insert(orders).values({
    id: '123',
    type: "BUY",
  });

  return {
    statusCode: 200,
    body: await db.select().from(orders),
  };
});
