import client from "@/lib/appwrite-client";
import {Databases, ID, Query} from "appwrite";
import {NextRequest, NextResponse} from "next/server";


class Interpretation {
    term: string;
    interpretation: string;
    constructor(term: string, interpretation: string){
        this.term = term;
        this.interpretation = interpretation;
    }
}

const database = new Databases(client);

async function createInterpretation(data : Interpretation){

    try {
        const response = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "Interpretations",
            ID.unique(),
            data);

        return response;
    }
    catch (error) {
        console.error('Error Creating Interpretation: ',error);
        throw new Error('Failed to create Interpretation');
    }

}

async function fetchInterpretation(){
    //console.log('Database ID:', process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
    try {
        const response = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "Interpretations",
            [Query.orderDesc("$createdAt")]);

        return response.documents;
    }
    catch (error) {
        console.error('Error Fetching Interpretation: ',error);
        throw new Error('Failed to fetch Interpretations');
    }

}

export async function POST(req: NextRequest){
    try {
        const {term, interpretation} = await req.json();
        const data = new Interpretation(term, interpretation);
        const response = await createInterpretation(data);
        return NextResponse.json({message: 'Interpretation Created', data: response});

    }
    catch (error) {
        return NextResponse.json(
            {error: `Failed to create interpretation: ${error}`},{status: 500});
    }
}

export async function GET(){

    try {
        const interpretations = await fetchInterpretation();
        return NextResponse.json({data: interpretations});
    }
    catch (error) {
        return NextResponse.json(
            {error: `Failed to fetch interpretations: ${error}`},{status: 500});
    }
}

