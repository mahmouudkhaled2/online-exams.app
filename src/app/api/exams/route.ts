import { JSON_HEADERS } from "@/lib/constants/api.constant";
import { getUserToken } from "@/lib/utils/get-user-token.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest) {

    // Variables
    const {searchParams} = new URL(req.url);
    const subjectId = searchParams.get('id');
    const fetchingURL = process.env.API + `/exams?subject=${subjectId}`
    const userToken = await getUserToken(req);

    // if userToken & subject id is okay, fetch the exams
    if (userToken && subjectId) {

        const fetchOptions = {
            headers: {
                ...JSON_HEADERS,
                 token: userToken
            }
        }

        try {

            const res = await fetch(fetchingURL, fetchOptions);
            
            if (!res.ok) {
                console.error("Fetch failed:", res.status, await res.text());
                return NextResponse.json(
                    { error: `Failed to fetch data. Status: ${res.status}` },
                    { status: res.status }
                );
            }
        
            const data = await res.json();
            return NextResponse.json(data);
            
        }   catch (err) {
    
            return NextResponse.json(
              { error: err.message, },
              { status: 500 }
            );  
          }

    }

}