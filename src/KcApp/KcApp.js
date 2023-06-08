import "./KcApp.css";
import { lazy, Suspense } from "react";
import KcAppBase, { defaultKcProps } from "keycloakify";
import { useI18n } from "./i18n";

const Register = lazy(() => import("./Register"));
const Terms = lazy(() => import("./Terms"));
const MyExtraPage1 = lazy(() => import("./MyExtraPage1"));
const MyExtraPage2 = lazy(() => import("./MyExtraPage2"));
const Login = lazy(() => import("./Login"));
const LogoutConfirm = lazy(() => import("./LogoutConfirm"));
const UpdateUserProfile = lazy(() => import("./UpdateUserProfile"));
const LoginResetPassword = lazy(() => import("./LoginResetPassword"));
const LoginUpdatePassword = lazy(() => import("./LoginUpdatePassword"));
const LoginVerifyEmail = lazy(() => import("./LoginVerifyEmail"));


export default function KcApp({ kcContext }) {
    const i18n = useI18n({ kcContext });

    //NOTE: Locales not yet downloaded
    if (i18n === null) {
        return null;
    }

    const props = {
        i18n,
        ...defaultKcProps,
        // NOTE: The classes are defined in ./KcApp.css
        "kcHeaderWrapperClass": "my-color my-font",
    };

    console.log(kcContext)

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "register.ftl": return <Register {...{ kcContext, ...props }} />;
                    case "login.ftl": return <Login {...{ kcContext, ...props }} />;  
                    case "login-reset-password.ftl": return <LoginResetPassword {...{ kcContext, ...props }} />;  
                    case "login-update-password.ftl": return <LoginUpdatePassword {...{ kcContext, ...props }} />;  
                    case "login-verify-email.ftl": return <LoginVerifyEmail {...{ kcContext, ...props }} />;  
                    case "logout-confirm.ftl": return <LogoutConfirm {...{ kcContext, ...props }} />; 
                    
                   // case "login-update-profile.ftl": return <UpdateUserProfile {...{ kcContext, ...props }} />;  
                    case "terms.ftl": return <Terms {...{ kcContext, ...props }} />;
                    case "my-extra-page-1.ftl": return <MyExtraPage1 {...{ kcContext, ...props }} />;
                    case "my-extra-page-2.ftl": return <MyExtraPage2 {...{ kcContext, ...props }} />;
                    default: return <KcAppBase {...{ kcContext, ...props }} />;
                }
            })()}
        </Suspense>
    );

}
