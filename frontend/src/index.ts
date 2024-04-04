import "preact/debug";

import App from "./components/app";

import "./styles.css";

const baseURL = process.env.PREACT_APP_API_URL;
export const apiURL = `${baseURL}/api`;

export default App;
