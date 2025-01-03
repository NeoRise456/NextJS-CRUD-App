
import {Suspense} from "react";
import {IInterpretation} from "@/models/interpretation";
import InterpretationList from "@/components/custom/InterpretationList";

//u need to install this lol
import { ErrorBoundary } from "react-error-boundary";


async function fetchInterpretations(): Promise<IInterpretation[]> {
    //await new Promise((resolve) => setTimeout(resolve, 6000));
    const response = await fetch("http://localhost:3000/api/interpretations");
    return response.json();
}


export default function Home() {

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
