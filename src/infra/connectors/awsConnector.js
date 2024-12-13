const { STSClient, GetCallerIdentityCommand } = require("@aws-sdk/client-sts");
const {
  GetSecretValueCommand,
  SecretsManagerClient,
} = require("@aws-sdk/client-secrets-manager");

var _localOnlySecrets = {
  "/shop/userPoolId": process.env.LOCAL_ONLY_COGNITO_USER_POOL_ID,
  "/shop/userPoolClientId": process.env.LOCAL_ONLY_COGNITO_USER_POOL_CLIENT_ID,
  "/shop/userPoolRedirectUri":
    process.env.LOCAL_ONLY_COGNITO_USER_POOL_REDIRECT_URI,
  "/shop/cognitoDomain": process.env.LOCAL_ONLY_COGNITO_DOMAIN,
  "/shop/dbUrl": process.DB_URL_SECRET_NAME,
  "/shop/dbPort": process.DB_PORT_SECRET_NAME,
  "/shop/dbName": process.DB_NAME_SECRET_NAME,
  "/shop/dbUsername": process.DB_USERNAME_SECRET_NAME,
  "/shop/dbPassword": process.DB_PASSWORD_SECRET_NAME,
};

module.exports.callerCheck = async () => {
  const client = new STSClient({
    region: process.env.REGION_STR,
  });
  const command = new GetCallerIdentityCommand({});
  const response = await client.send(command);
  console.log(
    `AWS commands with AccountId: ${response.Account} UserId: ${response.UserId} ARN: ${response.Arn}`
  );
};

module.exports.getSecretValue = async (secretName) => {
  if (process.env.NODE_ENV === "local") return _localOnlySecrets[secretName];

  const client = new SecretsManagerClient({
    region: process.env.REGION_STR,
  });
  const response = await client.send(
    new GetSecretValueCommand({
      SecretId: secretName,
    })
  );

  if (response.SecretString) {
    return response.SecretString;
  }

  if (response.SecretBinary) {
    return response.SecretBinary;
  }
};
