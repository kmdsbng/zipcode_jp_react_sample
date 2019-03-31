export interface ZipCodeJson {
    prefecture_jis_code: string;
    city_jis_code: string;
    zip_code: string;
    prefecture_name_kana: string;
    city_name_kana: string;
    town_name_kana: string;
    prefecture_name: string;
    city_name: string;
    town_name: string;
}

export interface PrefectureJson {
    prefecture_jis_code: string;
    prefecture_name_kana: string;
    prefecture_name: string;
}

export interface CityJson {
    prefecture_jis_code: string;
    city_jis_code: string;
    prefecture_name_kana: string;
    city_name_kana: string;
    prefecture_name: string;
    city_name: string;
}

export interface TownJson {
    prefecture_jis_code: string;
    city_jis_code: string;
    town_name_kana: string;
    town_name: string;
    zip_code: string;
}

export interface ZipCodeJpInterface {
    setRootUrl: (url: string) => void;

    getAddressesOfZipCode: (
        zipCode: string,
        cb: (err: any, addresses: ZipCodeJson[]) => void
    ) => void;

    getPrefectures: (
        cb: (err: any, prefectures: PrefectureJson[]) => void
    ) => void;

    getCitiesOfPrefecture: (
        prefectureJisCode: string,
        cb: (err: any, cities: CityJson[]) => void
    ) => void;

    getTownsOfCity: (
        cityJisCode: string,
        cb: (err: any, towns: TownJson[]) => void
    ) => void;

}

