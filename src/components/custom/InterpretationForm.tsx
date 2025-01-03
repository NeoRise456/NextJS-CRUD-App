'use client'

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {IInterpretation} from "@/models/interpretation";
import {use, useState} from "react";
import {Loader2} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {redirect} from "next/navigation";


interface InterpretationFormProps {
    id?: string;
    interpretationPromise?: Promise<IInterpretation>;
    formAction : (id: string, term: string, interpretation: string) => Promise<Response>;
    buttonText: string;
}


const techFormSchema = z.object({
    term: z.string().min(1, {message: "The term must be greater than 1 character"} ).max(100),
    interpretation: z.string().min(1, {message: "The interpretation must be greater than 1 character"} ),
})

export default function InterpretationForm({id, interpretationPromise,formAction,buttonText }: InterpretationFormProps) {

    const [buttonSubmit, setButtonSubmit] = useState(false);
    const {term, interpretation} = interpretationPromise ? use(interpretationPromise) : {term: '', interpretation: ''};
    const { toast } = useToast();

    const techform = useForm<z.infer<typeof techFormSchema>>({
        resolver: zodResolver(techFormSchema),
        defaultValues: {
            term: term,
            interpretation: interpretation,
        },
    })

    async function onSubmitTechForm(values: z.infer<typeof techFormSchema>) {
        // Do something with the form values.
        setButtonSubmit(true);
        const toastDescription = id ? "Updating" : "Creating";

        const response = id ? await formAction(id, values.term, values.interpretation)
            : await formAction("",values.term, values.interpretation);

        if (response.status !== 200) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error while " + toastDescription + " Interpretation",
            });
            setButtonSubmit(false);
            return;
        }


        await new Promise((resolve) => setTimeout(resolve, 3000));

        toast({
            title: "Success",
            description: toastDescription + " Interpretation",
        });

        redirect("/");
    }

    return (
        <Form {...techform}>
            <form onSubmit={techform.handleSubmit(onSubmitTechForm)} className="flex flex-col gap-4 py-4">
                <FormField
                    control={techform.control}
                    name={"term"}
                    render={
                        ({field}) => (
                            <FormItem>
                                <FormLabel>Term</FormLabel>
                                <FormControl>
                                    <Input placeholder={"Term"} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>

                        )}

                />
                <FormField
                    control={techform.control}
                    name={"interpretation"}
                    render={
                        ({field}) => (
                            <FormItem>
                                <FormLabel> Interpretation </FormLabel>
                                <FormControl>
                                    <Textarea placeholder={"Interpretation"} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }

                />
                <Button type="submit" disabled={buttonSubmit}>
                    {buttonSubmit && <Loader2 className="animate-spin" />}
                    {buttonText}
                </Button>
            </form>

        </Form>
    )
}