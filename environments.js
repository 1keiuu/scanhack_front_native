import Constants from "expo-constants";
const ENVs = {
  dev: {
    // 開発環境の変数
    environment: "dev",
    // apiUrl: "http://localhost:3000",
    apiUrl: "https://scanhack-api.herokuapp.com",
  },
  production: {
    // 本番環境の変数
    environment: "production",
    apiUrl: "https://scanhack-api.herokuapp.com",
  },
};

function getEnvVars() {
  const options = Constants.manifest.packagerOpts;
  const channel = Constants.manifest.releaseChannel;
  const isDev = options != null ? options.dev : true;

  if (isDev) {
    return ENVs.dev;
  } else {
    return ENVs.production;
  }
}

export default getEnvVars();
