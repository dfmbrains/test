import {instance} from "./index";
import {IGroup, IProfile, IUpdateProfile} from "../models/profiles";

const serviceEndpoint = "client/api";

export const getCurrentProfile = async (): Promise<IProfile> => {
    const response = await instance.get(`${serviceEndpoint}/Profile`);
    return response.data;
};

export const updateCurrentProfile = async (profileData: IUpdateProfile): Promise<IProfile> => {
    const response = await instance.put(`${serviceEndpoint}/Profile`, profileData);
    return response.data;
};

export const getCurrentProfileGroup = async (): Promise<IProfile[]> => {
    const response = await instance.get(`${serviceEndpoint}/ProfileGroup`);
    return response.data;
};

export const addProfileToGroup = (group: IGroup) => {
    return instance.post(`${serviceEndpoint}/ProfileGroup`, group).then((res) => {
        return res?.data
    })
}