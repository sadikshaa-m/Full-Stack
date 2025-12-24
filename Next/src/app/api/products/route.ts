import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    return NextResponse.json ({productName: 'tennis-ball', price: 200, inStock: true}, {status: 200});
}


export async function POST(req: NextRequest) {
    const {productName , price} = await req.json();
    if (!productName || !price) {
        return NextResponse.json(
            {error: 'productName and price are required'},
            {status: 400}
        );
    }
    return NextResponse.json ({
        message: "Product created successfully",
        product: {
            productName, price
        },
    },
{status:200});

}