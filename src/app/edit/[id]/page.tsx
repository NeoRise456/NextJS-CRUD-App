"use client"

import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const techFormSchema = z.object({
    term: z.string().min(1, {message: "The term must be greater than 1 character"} ).max(100),
    interpretation: z.string().min(1, {message: "The interpretation must be greater than 1 character"} ),
})

export default function EditPage() {

    const techform = useForm<z.infer<typeof techFormSchema>>({
        resolver: zodResolver(techFormSchema),
        defaultValues: {
            term: "Term to edit",
            interpretation: "Iterpretation to edit",
        },
    })

    function onSubmitTechForm(values: z.infer<typeof techFormSchema>) {
        // Do something with the form values.
        console.log(values);
    }

    return(
        <section className="flex py-8 px-16 justify-center">
            <div className="w-2/4">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Edit Interpretation
                </h3>
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
                        <Button type="submit">
                            Edit Interpretation
                        </Button>
                    </form>

                </Form>

            </div>
        </section>
    );
}