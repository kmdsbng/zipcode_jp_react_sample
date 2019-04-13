import * as React from "react";
import {AddressVo} from "../address/AddressVo";

export interface AddressViewProps {
    address: AddressVo;
}

export class AddressView extends React.Component<AddressViewProps, {}> {
    constructor(props: AddressViewProps) {
        super(props);
    }

    render() {
        const address = this.props.address;

        return (
            <React.Fragment>
                <div>
                    <h1>保存された住所情報</h1>
                    <p>
                        郵便番号: {address.zipCode.zipCodeStr}
                    </p>
                    <p>
                        都道府県: {address.prefecture.prefectureJisCode} {address.prefecture.prefectureName}
                    </p>
                    <p>
                        市区郡: {address.city.cityJisCode} {address.city.cityName}
                    </p>
                    <p>
                        町村: {address.town.townName}
                    </p>
                </div>
            </React.Fragment>
        );
    }

}
