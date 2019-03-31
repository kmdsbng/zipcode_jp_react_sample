import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import {AddressForm} from "./components/AddressForm";

ReactDOM.render(
    <React.Fragment>
        <Hello compiler="TypeScript" framework="React" />,
        <AddressForm
          zipCode={{zipCodeStr: "6040073"}}
          prefecture={{prefectureJisCode: "01", prefectureName: "北海道"}}
          city={{cityJisCode: "01000", cityName: "札幌市"}}
          town={{townName: "北区"}}
        />
    </React.Fragment>,
    document.getElementById("example")
);
