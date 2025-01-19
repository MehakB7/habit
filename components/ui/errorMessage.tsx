import * as React from "react";
export const ErrorMessage = ({message}:{message:string})=>{
   return( <p className="mt-0.5 text-sm text-rose-900 dark:text-rose-900" data-cy={`${name}-error`}>
          {message}
    </p>)

}
