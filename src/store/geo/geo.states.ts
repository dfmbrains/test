import {atom} from "recoil";
import {ICoordinates} from "../../models/geo";

export const coordinatesState = atom({
   key: "coordinates",
   default: {Lat: 0, Lon: 0} as ICoordinates<number>,
});