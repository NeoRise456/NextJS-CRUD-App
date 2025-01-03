'use client'

import InterpretationForm from "@/components/custom/InterpretationForm";

async function createInterpretation(_id: string,term: string, interpretation: string){

    //await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch("http://localhost:3000/api/interpretations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({term,interpretation}),
    })
    return response;
}

export default function CreatePage(){


    return (
        <section className="flex py-8 px-16 justify-center">
            <div className="w-[60rem]">
                <div className="w-full pt-4">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Add new Interpretation
                    </h3>
                    <InterpretationForm
                        formAction={createInterpretation}
                        buttonText="Add Interpretation"/>
                </div>
            </div>
        </section>
    );
}