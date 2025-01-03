

import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import { redirect } from 'next/navigation';

interface TermCardProps {
    id: string;
    term: string;
    interpretation: string;
    onDelete: (id:string) => Promise<void>;
}



export default function InterpretationCard({id ,term, interpretation,onDelete}: TermCardProps) {

    return (
        <div className="w-[60rem]">
            <div className="p-4">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight"> {term} </h3>
                <span className="leading-7 [&:not(:first-child)]:mt-6">
                    {interpretation}
                </span>
            </div>
            <div className="flex justify-end gap-4 px-4 pb-4">
                <Button variant="secondary" onClick={() => redirect(`/edit/${id}`)}>EDIT</Button>
                <Button variant="destructive" onClick={ () => onDelete(id)}>DELETE</Button>
            </div>
            <Separator/>
        </div>
    );
}