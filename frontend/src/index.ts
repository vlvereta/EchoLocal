import "preact/debug";
import "./style/index.css";
import App from "./components/app";

const baseURL = process.env.PREACT_APP_API_URL;
export const apiURL = `${baseURL}/api`;

export default App;
