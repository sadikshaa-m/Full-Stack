import { News } from "@/models/News";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    const body = await req.json();
    try{
        await News.create(body);
        return NextResponse.json(
            {message: 'News added successfully'},
           {status: 201}
    )
    } catch(err: any) {
        return NextResponse.json(
            {message: err.message},
            {status: 400}
        )
    }

}