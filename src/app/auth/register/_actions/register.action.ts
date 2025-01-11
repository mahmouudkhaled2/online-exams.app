import { JSON_HEADERS } from "@/lib/constants/api.constant";


export const  handleRegister = async (fields: RegisterFields) => {

    const API_URL = 'https://exam.elevateegy.com/api/v1/auth/signup'

    const res = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(fields),
        headers: { ...JSON_HEADERS },
    });

    const data: ApiResponse<RegisterResponse> = await res.json();

    return data

  }
