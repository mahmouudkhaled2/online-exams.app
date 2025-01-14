import { JSON_HEADERS } from "@/lib/constants/api.constant";

export type ResetPasswordFields = {
    email: string | null;
    newPassword: string;
}

export const  resetPasswordAction = async (fields: ResetPasswordFields) => {

    const baseUrl = `https://exam.elevateegy.com/api/v1/auth/resetPassword`;

    
    const requestOptions: RequestInit = {
        method: 'PUT',
        cache: 'no-store',
        body: JSON.stringify(fields),
        headers: { ...JSON_HEADERS },
    }
    
    const res = await fetch(baseUrl, requestOptions);
    
    const data = await res.json();

    return data

}