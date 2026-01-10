import { NextRequest, NextResponse } from "next/server";




export async function GET(req: NextRequest) {
    //for query params..
    const params = req.nextUrl.searchParams;

   const number = Number(params.get('number'))
    const result = number % 2 === 0 ? 'even' : 'odd' ;

   if(!number) {
    return NextResponse.json(
        {error: 'add number'},
        {status: 200}
    );
   }

    return NextResponse.json({ number, result}, {status: 200});
}


export async function POST(req: NextRequest){
    //for body
    const body = await req.json();
    
    return NextResponse.json({name:'sadiksha mahat'}, {status: 200});
}