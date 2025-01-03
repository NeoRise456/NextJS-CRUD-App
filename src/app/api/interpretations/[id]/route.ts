import client from "@/lib/appwrite-client";
import {Databases, ID} from "appwrite";
import {NextResponse} from "next/server";

class Interpretation {
    term: string;
    interpretation: string;
    constructor(term: string, interpretation: string){
        this.term = term;
        this.interpretation = interpretation;
    }
}

const database = new Databases(client);

async function fetchInterpretationById(interpretationId:string){
    try {
        const interpretation = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "Interpretations",
            interpretationId,
        );

        return interpretation;
    }
    catch (error) {
        console.error('Error Fetching Interpretation: ',error);
        throw new Error('Failed to fetch Interpretation');
    }
}

async function deleteInterpretationById(interpretationId:string){
    try {
        const response = await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "Interpretations",
            interpretationId,
        );

        return response;
    }
    catch (error) {
        console.error('Error Deleting Interpretation: ',error);
        throw new Error('Failed to delete Interpretation');
    }
}

async function updateInterpretationById(interpretationId:string, data: Interpretation){
    try {
        const response = await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "Interpretations",
            interpretationId,
            data
        );

        return response;
    }
    catch (error) {
        console.error('Error Deleting Interpretation: ',error);
        throw new Error('Failed to delete Interpretation');
    }
}

export async function GET(req: Request, {params}: {params: Promise<{ id: string }>}){
    try{
        const { id } = await params;
        const interpretation = await fetchInterpretationById(id);
        return NextResponse.json(interpretation);
    }
    catch (error) {
        return NextResponse.json({error: `Failed to fetch interpretation: ${error}`},{status: 500});
    }

}

export async function DELETE(req: Request, {params}: {params: Promise<{ id: string }>}){
    try{
        const { id } = await params;
        await deleteInterpretationById(id);
        return NextResponse.json({message : "Interpretation Deleted"});
    }
    catch (error) {
        return NextResponse.json({error: `Failed to delete interpretation: ${error}`},{status: 500});
    }
}

export async function PUT(req: Request, {params}: {params: Promise<{ id: string }>}){
    try{
        const { id } = await params;
        const interpretation = await req.json();
        await updateInterpretationById(id, interpretation);
        return NextResponse.json({message : "Interpretation Updated", data: interpretation});
    }
    catch (error) {
        return NextResponse.json({error: `Failed to update interpretation: ${error}`},{status: 500});
    }

}



