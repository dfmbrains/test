export interface ICoordinates<T> {
    Lon: T,
    Lat: T
}

export interface IPunkt {
    refId: string;
    agent: string;
    name: string;
    type: string;
    address: string;
    lat: string;
    lon: string;
    country?: any;
    region?: any;
    city?: any;
    district?: any;
    street?: any;
    house?: any;
    description?: any;
    additional: string;
    distance: number;
}

export interface ICity {
    id: string
    name: string
    code: string
    regionCode: string
}

export interface IAddress {
    address: string
    houseNumber: any
    road: any
    cityDistrict: any
    city: string
    postCode: any
    country: string
    countryCode: string
    regionCode: string
    street: any
    description: any
}