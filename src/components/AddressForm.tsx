import * as React from "react";
import {ChangeEvent} from "react";
import {CityJson, PrefectureJson, TownJson, ZipCodeJpInterface, ZipCodeJson} from "../ZipCodeJpInterface";
import {ZipCodeVo} from "../address/ZipCodeVo";
import {BLANK_PREFECTURE, PrefectureVo} from "../address/PrefectureVo";
import {BLANK_CITY, CityVo} from "../address/CityVo";
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
    cities: CityVo[];
    cityMap: Map<string, CityVo>;
    towns: TownVo[];
    townNameZipCodeMap: Map<string, ZipCodeVo>;
}

export class AddressForm extends React.Component<AddressFormProps, AddressFormState> {
    constructor(props: AddressFormProps) {
        super(props);

        const prefectures: PrefectureVo[] = [];
        const prefectureMap = new Map<string, PrefectureVo>();
        const cities: CityVo[] = [];
        const cityMap = new Map<string, CityVo>();
        const towns: TownVo[] = [];
        const townNameZipCodeMap = new Map<string, ZipCodeVo>();

        this.state = {
            zipCode: props.zipCode,
            prefecture: props.prefecture,
            city: props.city,
            town: props.town,
            prefectures: prefectures,
            prefectureMap: prefectureMap,
            cities: cities,
            cityMap: cityMap,
            towns: towns,
            townNameZipCodeMap: townNameZipCodeMap
        };
    }

    componentDidMount() {
        this.loadPrefectureAndUpdateState();
        this.loadCitiesAndUpdateState(this.state.prefecture);
        this.loadTownsAndUpdateState(this.state.city);
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

    private loadCitiesAndUpdateState = (prefecture: PrefectureVo) => {
        const prefectureJisCode = prefecture.prefectureJisCode;
        if (prefectureJisCode == "") {
            this.setCitiesState([]);
            return;
        }

        ZipCodeJp.getCitiesOfPrefecture(prefectureJisCode, (err: any, cityJsons: CityJson[]) => {
            if (err != null) {
                console.log(err);
                return;
            }

            const cities: CityVo[] = cityJsons.map((cityJson: CityJson) => {
                return {
                    cityJisCode: cityJson.city_jis_code,
                    cityName: cityJson.city_name
                }
            });

            this.setCitiesState(cities);
        })
    };

    private loadTownsAndUpdateState = (city: CityVo) => {
        const cityJisCode = city.cityJisCode;
        if (cityJisCode == "") {
            this.setTownsState([], new Map<string, ZipCodeVo>());
            return;
        }

        ZipCodeJp.getTownsOfCity(cityJisCode, (err: any, townJsons: TownJson[]) => {
            if (err != null) {
                console.log(err);
                return;
            }

            const towns: TownVo[] = townJsons.map((townJson: TownJson) => {
                return {
                    townName: townJson.town_name
                }
            });
            const townNameZipCodeMap = new Map<string, ZipCodeVo>();
            townJsons.forEach((townJson: TownJson) => {
                townNameZipCodeMap.set(townJson.town_name, {zipCodeStr: townJson.zip_code});
            })

            this.setTownsState(towns, townNameZipCodeMap);
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

    private setCitiesState(cities: CityVo[]) {
        const cityMap = new Map<string, CityVo>();
        cities.forEach((city) => {
            cityMap.set(city.cityJisCode, city);
        });

        this.setState({
            cities: cities,
            cityMap: cityMap
        });
    }

    private setTownsState(towns: TownVo[], townNameZipCodeMap: Map<string, ZipCodeVo>) {
        this.setState({
            towns: towns,
            townNameZipCodeMap: townNameZipCodeMap
        });
    }

    _onSearchZipCode = () => {
        const zipCode = this.state.zipCode;

        ZipCodeJp.getAddressesOfZipCode(zipCode.zipCodeStr, (err: any, zipCodeJsons: ZipCodeJson[]) => {
            if (err != null) {
                console.log(err);
                return;
            }

            if (zipCodeJsons.length == 0) {
                return;
            }

            const zipCodeJson: ZipCodeJson = zipCodeJsons[0];
            const prevPrefectureJisCode = this.state.prefecture.prefectureJisCode;
            const prevCityJisCode = this.state.city.cityJisCode;
            const prefecture: PrefectureVo = {
                prefectureJisCode: zipCodeJson.prefecture_jis_code,
                prefectureName: zipCodeJson.prefecture_name
            };
            const city: CityVo = {
                cityJisCode: zipCodeJson.city_jis_code,
                cityName: zipCodeJson.city_name
            };
            const town: TownVo = {
                townName: zipCodeJson.town_name
            };

            this.setState(
                {
                    prefecture: prefecture,
                    city: city,
                    town: town
                }
            );

            if (prevPrefectureJisCode != prefecture.prefectureJisCode) {
                this.loadCitiesAndUpdateState(prefecture);
            }
            if (prevCityJisCode != city.cityJisCode) {
                this.loadTownsAndUpdateState(city);
            }
        })
    };

    _onChangeZipCode = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let zipCodeStr = event.target.value;
        this.setState({zipCode: {zipCodeStr: zipCodeStr}});
    };

    _onChangePrefecture = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let prefecture = this.state.prefectureMap.get(event.target.value);
        if (prefecture == null) {
            prefecture = BLANK_PREFECTURE;
        }
        this.setState({prefecture: prefecture});
        this.loadCitiesAndUpdateState(prefecture);
    };

    _onChangeCity = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const city = this.state.cityMap.get(event.target.value);
        if (city == null) {
            this.setState({city: BLANK_CITY});
        } else {
            this.setState({city: city});
        }
    };

    _onChangeTown = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const townName = event.target.value;
        this.setState({town: {townName: townName}});
    };

    render() {
        const prefectureOptions = this.state.prefectures.map((prefectureVo) => {
            return <option value={prefectureVo.prefectureJisCode} key={prefectureVo.prefectureJisCode}>{prefectureVo.prefectureName}</option>
        });

        const cityOptions = this.state.cities.map((cityVo) => {
            return <option value={cityVo.cityJisCode} key={cityVo.cityJisCode}>{cityVo.cityName}</option>
        });

        return (
            <React.Fragment>
                <div>
                    <h1>住所Form</h1>
                    <p>
                        郵便番号:
                        <input type="text" value={this.state.zipCode.zipCodeStr} onChange={this._onChangeZipCode} />
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
                        市区郡:
                            <select value={this.state.city.cityJisCode} onChange={this._onChangeCity}>
                                <option value={""} key={"blank"}>----</option>
                                {cityOptions}
                            </select>
                    </p>
                    <p>
                        町村:
                        <input type="text" value={this.state.town.townName} onChange={this._onChangeTown} />
                    </p>
                </div>

                <div>
                    <h1>保存された住所情報</h1>
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
