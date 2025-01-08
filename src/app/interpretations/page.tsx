'use client'

import {IInterpretation} from "@/models/interpretation";
import {ErrorBoundary} from "react-error-boundary";
import {Suspense} from "react";
import InterpretationList from "@/components/custom/InterpretationList";


async function fetchInterpretations(): Promise<IInterpretation[]> {
    //await new Promise((resolve) => setTimeout(resolve, 6000));
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/interpretations`);
    return response.json();
}

export default function InterpretationsPage(){

    const interpretationsPromise = fetchInterpretations();

    return (
        <div className="flex flex-col py-8 px-16 items-center ">
            <ErrorBoundary fallback={<span className="leading-7 [&:not(:first-child)]:mt-6"> Loading Failed </span>}>
                <Suspense fallback={
                    <span className="leading-7 [&:not(:first-child)]:mt-6">Loading...</span>
                }>
                    <InterpretationList interpretationsPromise={interpretationsPromise}/>
                </Suspense>
            </ErrorBoundary>
        </div>
    );
}