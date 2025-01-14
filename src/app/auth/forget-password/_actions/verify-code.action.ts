import { JSON_HEADERS } from "@/lib/constants/api.constant";

export type ResetCode = {
    email: string;
}

export const  verifyCodeAction = async (fields: ResetCode) => {

    const baseUrl = `https://exam.elevateegy.com/api/v1/auth/forgotPassword`;

    const requestOptions: RequestInit = {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify(fields),
        headers: { ...JSON_HEADERS },
    }

    const res = await fetch(baseUrl, requestOptions);

    const data = await res.json();

    return data

}