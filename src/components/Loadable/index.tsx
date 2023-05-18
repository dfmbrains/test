import React, {Suspense} from "react";
import Loader from "../Loader";

const Loadable = <P extends object>(Component: React.ComponentType<P>) => (props: P) => {
   return (
     <Suspense fallback={<Loader window={'full'} size={"large"}/>}>
        <Component {...props} />
     </Suspense>
   );
};

export default Loadable;