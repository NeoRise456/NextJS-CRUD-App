'use client'

import {IInterpretation} from "@/models/interpretation";
import {use} from "react";
import InterpretationCard from "@/components/custom/InterpretationCard";


interface InterpretationListProps {
    interpretationsPromise: Promise<IInterpretation[]>;
}


export default function InterpretationList({interpretationsPromise}: InterpretationListProps) {

    const interpretations = use(interpretationsPromise);

    return (
        <div className="flex flex-col items-center">
            {
                interpretations.length > 0 ?

                interpretations.map((interpretation) => (
                    <InterpretationCard
                        key={interpretation.$id}
                        id={interpretation.$id}
                        term={interpretation.term}
                        interpretation={interpretation.interpretation}/>
                )) : <p className="leading-7 [&:not(:first-child)]:mt-6"> nothing to show</p>
            }
        </div>
    )
}