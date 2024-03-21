import "preact/debug";
import "./style/index.css";
import App from "./components/app";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

const baseURL = process.env.PREACT_APP_API_URL;
export const apiURL = `${baseURL}/api`;

export default App;
