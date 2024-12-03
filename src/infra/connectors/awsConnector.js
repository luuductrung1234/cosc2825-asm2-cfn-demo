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
