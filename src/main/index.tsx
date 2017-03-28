import "./styles/index.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import App from "./components/App";

/*ReactDOM.render (
    <App />,
    document.getElementById("root"),
);*/


const render = (Component: any) => 
ReactDOM.render (
    <AppContainer>
        <Component />
    </AppContainer>,
    document.getElementById("root"),
);

render(App);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        console.log("toot")
        const NextApp = require('./components/App').default;
        render(NextApp);
    });
}