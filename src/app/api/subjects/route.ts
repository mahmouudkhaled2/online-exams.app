import { NextRequest, NextResponse } from "next/server";
import { JSON_HEADERS } from '@/lib/constants/api.constant';
import { getUserToken } from "@/lib/utils/get-user-token.utils";

export async function GET(req: NextRequest) {

  const {searchParams} = new URL(req.url);

  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const userToken = await getUserToken(req);

  if (!userToken) {
    return NextResponse.json(
      { error: "Unauthorized access" },
      { status: 401 }
    );
  }

  try {
    
    const fetchingURL = process.env.API + `/subjects?page=${page}&limit=${limit}`
   
    const response = await fetch(fetchingURL, {
      headers: {
        ...JSON_HEADERS,
        token: userToken,
      },
    }
  );

    const data = await response.json();

    return NextResponse.json({...data});

  } catch (err) {
    
    return NextResponse.json(
      { error: err.message, },
      { status: 500 }
    );  
  }
}
