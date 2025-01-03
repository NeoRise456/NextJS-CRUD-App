'use client'

import {IInterpretation} from "@/models/interpretation";
import {useState, useEffect} from "react";
import InterpretationCard from "@/components/custom/InterpretationCard";
import {useToast} from "@/hooks/use-toast";


interface InterpretationListProps {
    interpretationsPromise: Promise<IInterpretation[]>;
}

async function deleteInterpretations(id : string): Promise<Response> {
    //await new Promise((resolve) => setTimeout(resolve, 6000));
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/interpretations/${id}`, {
        method: "DELETE",
    });

    return response;
}

export default function InterpretationList({interpretationsPromise}: InterpretationListProps) {

    const [interpretations, setInterpretations] = useState<IInterpretation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { toast } = useToast();


    useEffect(() => {
        interpretationsPromise.then(data => {
            setInterpretations(data);
            setLoading(false);
        });
    }, [interpretationsPromise]);

    const handleDelete = async (id : string) => {
        //await new Promise((resolve) => setTimeout(resolve, 6000));
        //console.log("Deleting", id);
        //console.log("Interpretations", interpretations );
        const response = await deleteInterpretations(id);

        if (response.status !== 200) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error while deleting Interpretation",
            });
            return;
        }

        setInterpretations(prevInterpretations => prevInterpretations.filter((interpretation) => interpretation.$id !== id));
        toast({
            title: "Success",
            description: "Interpretation deleted",
        });
    }

    if(loading){
        return <span className="leading-7 [&:not(:first-child)]:mt-6">Loading...</span>
    }

    return (
        <div className="flex flex-col items-center">
            {
                interpretations.length > 0 ?

                interpretations.map((interpretation) => (
                    <InterpretationCard
                        key={interpretation.$id}
                        id={interpretation.$id}
                        term={interpretation.term}
                        interpretation={interpretation.interpretation}
                        onDelete={handleDelete}
                    />
                )) : <p className="leading-7 [&:not(:first-child)]:mt-6"> nothing to show </p>
            }
        </div>
    )
}