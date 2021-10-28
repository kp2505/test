import App from './App';
import './index.css';
import {CommonWrapper, Passport} from "@nlmk/ds/dist/components";
import React from 'react';
import ReactDOM from "react-dom";

export * from './components'

const settings = {
    url: 'https://sso-test.dp.nlmk.com/auth',
    realm: 'ref-service-dev',
    clientId: 'ref-create-service-public'
}
ReactDOM.render(
    <CommonWrapper>
        <Passport settings={settings}>
            <App/>
        </Passport>
    </CommonWrapper>,
    document.querySelector('#root'),
)
