import * as React from "react";
import {ChangeEvent} from "react";
import {PrefectureJson, ZipCodeJpInterface} from "../ZipCodeJpInterface";
import {ZipCodeVo} from "../address/ZipCodeVo";
import {BLANK_PREFECTURE, PrefectureVo} from "../address/PrefectureVo";
import {CityVo} from "../address/CityVo";
import {TownVo} from "../address/TownVo";

declare var ZipCodeJp: ZipCodeJpInterface;

ZipCodeJp.setRootUrl(
    "https://kmdsbng.github.io/zipcode_jp/"
);


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
    prefectures: PrefectureVo[];
    prefectureMap: Map<string, PrefectureVo>;
}

export class AddressForm extends React.Component<AddressFormProps, AddressFormState> {
    constructor(props: AddressFormProps) {
        super(props);

        const prefectures: PrefectureVo[] = [
            {prefectureJisCode: "01", prefectureName: "北海道"},
            {prefectureJisCode: "02", prefectureName: "青森県"}
        ];
        const prefectureMap = new Map<string, PrefectureVo>();
        prefectures.forEach((pref) => {
            prefectureMap.set(pref.prefectureJisCode, pref);
        });

        this.state = {
            zipCode: props.zipCode,
            prefecture: props.prefecture,
            city: props.city,
            town: props.town,
            prefectures: prefectures,
            prefectureMap: prefectureMap
        };
    }

    componentDidMount() {
        this.loadPrefectureAndUpdateState();
    }

    private loadPrefectureAndUpdateState = () => {
        ZipCodeJp.getPrefectures((err: any, prefectureJsons: PrefectureJson[]) => {
            if (err != null) {
                console.log(err);
                return;
            }

            const prefectures: PrefectureVo[] = prefectureJsons.map((prefectureJson: PrefectureJson) => {
                return {
                    prefectureJisCode: prefectureJson.prefecture_jis_code,
                    prefectureName: prefectureJson.prefecture_name
                }
            });

            this.setPrefecturesState(prefectures);
        })
    };

    private setPrefecturesState(prefectures: PrefectureVo[]) {
        const prefectureMap = new Map<string, PrefectureVo>();
        prefectures.forEach((pref) => {
            prefectureMap.set(pref.prefectureJisCode, pref);
        });

        this.setState({
            prefectures: prefectures,
            prefectureMap: prefectureMap
        });
    }

    _onSearchZipCode = () => {
        console.log('search')
    };

    _onChangePrefecture = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log(event.target.value);
        const prefecture = this.state.prefectureMap.get(event.target.value);
        if (prefecture == null) {
            this.setState({prefecture: BLANK_PREFECTURE})
        } else {
            this.setState({prefecture: prefecture})
        }
    };

    render() {
        const prefectureOptions = this.state.prefectures.map((prefectureVo) => {
            return <option value={prefectureVo.prefectureJisCode} key={prefectureVo.prefectureJisCode}>{prefectureVo.prefectureName}</option>
        });

        return (
            <React.Fragment>
                <div>
                    <h1>Address Form</h1>
                    <p>
                        郵便番号:
                        <input type="text" value={this.state.zipCode.zipCodeStr} />
                        <button onClick={this._onSearchZipCode}>郵便番号から検索</button>
                    </p>
                    <p>
                        都道府県:
                            <select value={this.state.prefecture.prefectureJisCode} onChange={this._onChangePrefecture}>
                                <option value={""} key={"blank"}>----</option>
                                {prefectureOptions}
                            </select>
                    </p>
                    <p>
                        市区郡: {this.state.city.cityJisCode} {this.state.city.cityName}
                    </p>
                    <p>
                        町村: {this.state.town.townName}
                    </p>
                </div>

                <div>
                    <h1>Address Form</h1>
                    <p>
                        郵便番号: {this.state.zipCode.zipCodeStr}
                    </p>
                    <p>
                        都道府県: {this.state.prefecture.prefectureJisCode} {this.state.prefecture.prefectureName}
                    </p>
                    <p>
                        市区郡: {this.state.city.cityJisCode} {this.state.city.cityName}
                    </p>
                    <p>
                        町村: {this.state.town.townName}
                    </p>
                </div>
            </React.Fragment>
        );
    }

}
