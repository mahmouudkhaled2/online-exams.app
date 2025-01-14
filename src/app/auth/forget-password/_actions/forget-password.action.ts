import { JSON_HEADERS } from "@/lib/constants/api.constant";

export type Email = {
    email: string;
}

export const  forgetPaswwordAction = async (field: Email) => {

    const baseUrl = `https://exam.elevateegy.com/api/v1/auth/forgotPassword`;

    const requestOptions: RequestInit = {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify(field),
        headers: { ...JSON_HEADERS },
    }

    const res = await fetch(baseUrl, requestOptions);

    const data = await res.json();

    return data

}