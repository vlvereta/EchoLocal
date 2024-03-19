import Dotenv from "dotenv-webpack";
import path from "path";

export default (config, env, helpers) => {
  // Remove any existing DefinePlugin
  const definePluginIndex = config.plugins.findIndex(
    (plugin) => plugin.constructor.name === "DefinePlugin",
  );
  if (definePluginIndex !== -1) {
    config.plugins.splice(definePluginIndex, 1);
  }

  // Add dotenv-webpack to load .env files from the parent directory
  config.plugins.push(
    new Dotenv({
      // Specify the path to your .env files in the parent directory
      path: path.resolve(__dirname, "..", ".env"),
      systemvars: true,
    }),
  );
};
