'use client'

import {IInterpretation} from "@/models/interpretation";
import InterpretationForm from "@/components/custom/InterpretationForm";
import { useParams } from "next/navigation";
import {Suspense} from "react";



async function fetchInterpretationById(id: string): Promise<IInterpretation> {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/interpretations/${id}`);
    return response.json();
}

async function updateInterpretation(id: string, term: string, interpretation: string){

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/interpretations/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({term,interpretation}),
    })
    return response;
}

export default function EditPage() {

    //get the id from the route
    const { id } : {id: string} = useParams();
    const interpretationPromise = fetchInterpretationById(id);


    return(
        <section className="flex py-8 px-16 justify-center">
            <div className="w-[60rem]">

                <Suspense fallback={
                    <div className="flex justify-center">
                        <span className="leading-7 [&:not(:first-child)]:mt-6">Loading...</span>
                    </div>
                }>
                    <div className="w-full pt-4">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Edit Interpretation
                        </h3>
                        <InterpretationForm
                            id={id}
                            interpretationPromise={interpretationPromise}
                            formAction={updateInterpretation}
                            buttonText="Edit Interpretation"/>
                    </div>
                </Suspense>
            </div>
        </section>
    );
}