import {PrefectureVo} from "./PrefectureVo";
import {CityVo} from "./CityVo";
import {TownVo} from "./TownVo";
import {ZipCodeVo} from "./ZipCodeVo";

interface AddressVo {
    zipCode: ZipCodeVo;
    prefecture: PrefectureVo;
    city: CityVo;
    town: TownVo;
}