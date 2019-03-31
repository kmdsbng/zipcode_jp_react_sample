import * as React from "react";

export interface ZipCodeVo {
  zipCodeStr: string;
}

export interface PrefectureVo {
  prefectureJisCode: string;
  prefectureName: string;
}

export interface CityVo {
  cityJisCode: string;
  cityName: string;
}

export interface TownVo {
  townName: string;
}

export interface AddressFormProps {
  zipCode: ZipCodeVo;
  prefecture: PrefectureVo;
  city: CityVo;
  town: TownVo;
}

export interface AddressFormState {
    zipCode: ZipCodeVo;
    prefecture: PrefectureVo;
    city: CityVo;
    town: TownVo;
}

export class AddressForm extends React.Component<AddressFormProps, AddressFormState> {
    constructor(props: AddressFormProps) {
        super(props);
        this.state = {
            zipCode: props.zipCode,
            prefecture: props.prefecture,
            city: props.city,
            town: props.town
        };
    }

    _onSearchZipCode = () => {
        console.log('search')
    }

    render() {
        const prefectureOptions = [
            <option value={"01"} key={"01"}>北海道</option>,
            <option value={"02"} key={"02"}>青森県</option>,
        ];

        return (
            <React.Fragment>
                <div>
                    <h1>Address Form</h1>
                    <p>
                        zipCode:
                        <input type="text" value={this.state.zipCode.zipCodeStr} />
                        <button onClick={this._onSearchZipCode}>郵便番号から検索</button>
                    </p>
                    <p>
                        prefecture:
                            <select value={"02"}>
                                <option value={""} key={"blank"}>----</option>
                                {prefectureOptions}
                            </select>
                    </p>
                    <p>
                        city: {this.state.city.cityJisCode} {this.state.city.cityName}
                    </p>
                    <p>
                        town: {this.state.town.townName}
                    </p>
                </div>

                <div>
                    <h1>Address Form</h1>
                    <p>
                        zipCode: {this.state.zipCode.zipCodeStr}
                    </p>
                    <p>
                        prefecture: {this.state.prefecture.prefectureJisCode} {this.state.prefecture.prefectureName}
                    </p>
                    <p>
                        city: {this.state.city.cityJisCode} {this.state.city.cityName}
                    </p>
                    <p>
                        town: {this.state.town.townName}
                    </p>
                </div>
            </React.Fragment>
        );
    }
}
