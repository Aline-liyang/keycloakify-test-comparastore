import { memo } from "react";

const MyExtraPage2 = memo(({ kcContext, i18n, ...props }) => {

    console.log(`TODO: Do something with: ${kcContext.someCustomValue}`);

    return <>It is up to you to implement this page</>

});

export default MyExtraPage2;