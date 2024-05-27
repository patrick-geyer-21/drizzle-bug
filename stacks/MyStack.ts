import { StackContext, Api, EventBus, RDS } from "sst/constructs";

export function API({ stack }: StackContext) {

  const rds = new RDS(stack, "rds", {
    defaultDatabaseName: "shared",
    engine: "postgresql13.12",
    scaling: {
      minCapacity: "ACU_2",
      maxCapacity: "ACU_2"
    },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        timeout: "900 seconds",
        bind: [rds],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /migrate": "packages/functions/src/migrate.handler"

    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    RdsClusterArn: rds.clusterArn,
    RdsSecretArn: rds.secretArn
  });
}
