import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(<App items={10} />, document.getElementById("root"))
registerServiceWorker()
