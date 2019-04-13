import {BLANK_PREFECTURE, PrefectureVo} from "./PrefectureVo";
import {BLANK_CITY, CityVo} from "./CityVo";
import {BLANK_TOWN, TownVo} from "./TownVo";
import {BLANK_ZIP_CODE, ZipCodeVo} from "./ZipCodeVo";

export interface AddressVo {
    zipCode: ZipCodeVo;
    prefecture: PrefectureVo;
    city: CityVo;
    town: TownVo;
}

export const BLANK_ADDRESS = {
    zipCode: BLANK_ZIP_CODE,
    prefecture: BLANK_PREFECTURE,
    city: BLANK_CITY,
    town: BLANK_TOWN
};
