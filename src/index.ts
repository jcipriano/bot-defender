// Documentation: https://sdk.netlify.com
import { NetlifyIntegration } from "@netlify/sdk";
import { EnvVarRequest } from "@netlify/sdk/client";

const integration = new NetlifyIntegration();

integration.addEdgeFunctions("./src/edge-functions", {
  prefix: "ef_prefix",
});

integration.addApiHandler("set-env-vars", async (event, context) => {
  const { client } = context;

  // Do something cool here
  if (!event.body) {
    event.body = '';
  }
  
  const eventBody = JSON.parse(event.body);
  const { siteId, accountId, appId, authToken, cookieSecret } = eventBody;

  const envVariables: Record<string, EnvVarRequest> = {
    PX_APP_ID: appId,
    PX_AUTH_TOKEN: authToken,
    PX_COOKIE_SECRET: cookieSecret
  }

  const tokenEnvironmentVariableObject = {
    accountId, // Include the accountId property
    siteId,
    variables: envVariables
  };

  const environmentVariable = await client.createOrUpdateVariables(tokenEnvironmentVariableObject);

  console.log(`Status for the final response: ${environmentVariable}`);
  console.log(`Status for the final response: ${JSON.stringify(environmentVariable)}`);

  return {
    statusCode: 200,
  };
});



export { integration };

