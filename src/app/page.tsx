import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";


export default function Home() {
  return (
      <div className="flex flex-col py-8 px-16 items-center">
          <div className="w-2/4">
              <div className="p-4">
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight"> Home </h3>
                  <span className="leading-7 [&:not(:first-child)]:mt-6">
                      Employs AI algorithms to understand and interpret human language,
                      enabling the app to comprehend user inputs, provide relevant responses,
                      and offer a more intuitive and conversational user interface.
                      The app is designed to be a simple, intuitive, and user-friendly tool that
                        can be used by anyone, regardless of their technical background or expertise.
                  </span>
              </div>
              <div className="flex justify-end gap-4 px-4 pb-4">
                  <Button variant="secondary">EDIT</Button>
                  <Button variant="destructive">DELETE</Button>
              </div>
              <Separator/>
          </div>
      </div>
  );
}
