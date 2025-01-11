import { API, JSON_HEADERS } from "../constants/common"

export const getAllSubjects = async ( ) => {

    const BASE_URL = API || process.env.API;

    const res = await fetch(`${BASE_URL}/subjects`, { headers: {...JSON_HEADERS}})

    const data = await res.json();

    return data;
}