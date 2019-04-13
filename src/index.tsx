import * as React from "react";
import * as ReactDOM from "react-dom";

import {AddressForm} from "./components/AddressForm";
import {AddressVo} from "./address/AddressVo";
import {AddressView} from "./components/AddressView";

interface Repository {
    address: AddressVo
}

const repo: Repository = {
    address: {
        zipCode: {zipCodeStr: ""},
        prefecture: {prefectureJisCode: "", prefectureName: ""},
        city: {cityJisCode: "", cityName: ""},
        town: {townName: ""}
    }
};

const _onChangeAddress = (newAddress: Partial<AddressVo>) => {
    repo.address = {...repo.address, ...newAddress};
    renderApp();
};

const renderApp = () => {
    ReactDOM.render(
        <React.Fragment>
            <p>
                <a href="https://github.com/kmdsbng/zipcode_jp_react_sample" target="_blank">Go to GitHub repository.</a>
            </p>
            <AddressForm
                key={1}
                address={repo.address}
                onChangeAddress={_onChangeAddress}
            />

            <AddressView
                address={repo.address}
            />
        </React.Fragment>,
        document.getElementById("example")
    );

};

renderApp();

