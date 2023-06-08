import React, { useState, memo } from "react";
//import DefaultTemplate from "./Template";
import Template from "keycloakify/lib/components/Template";
import { clsx } from "keycloakify/lib/tools/clsx";
//import  { TemplateProps } from "./Template";
// import type { KcProps } from "./KcProps";
// import type { KcContextBase } from "../getKcContext/KcContextBase";
//import { clsx } from "../tools/clsx";

import { useConstCallback } from "powerhooks/useConstCallback";
import "./KcApp.css";


// import type { I18n } from "../i18n";


// export type LoginProps = KcProps & {
//     kcContext: KcContextBase.Login;
//     i18n: I18n;
//     doFetchDefaultThemeResources?: boolean;
//     Template?: (props: TemplateProps) => JSX.Element | null;
// };                                                      //Aline

// const Login = memo((props: LoginProps) => {    //Aline
   const Login = memo((props) => {
    const { kcContext, i18n, doFetchDefaultThemeResources = true, ...kcProps } = props;

    const { social, realm, url, usernameEditDisabled, login, auth, registrationDisabled } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback(e => {
        e.preventDefault();

        setIsLoginButtonDisabled(true);

        const formElement = e.target;

        //NOTE: Even if we login with email Keycloak expect username and password in
        //the POST request.
        formElement.querySelector("input[name='email']")?.setAttribute("name", "username");

        formElement.submit();
    });
     
       return (
        <div>
        <Template
            {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}
            displayInfo={social.displayInfo}
            displayWide={realm.password && social.providers !== undefined}
            headerNode={msg("doLogIn")}
            formNode={
                <div id="kc-form" className={clsx(realm.password && social.providers !== undefined && kcProps.kcContentWrapperClass)}>
                    <div
                        id="kc-form-wrapper"
                        className={clsx(
                            realm.password && social.providers && [kcProps.kcFormSocialAccountContentClass, kcProps.kcFormSocialAccountClass]
                        )}
                    >
                        {realm.password && (
                            <form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">
                                <div className={clsx(kcProps.kcFormGroupClass)}>
                                    {(() => {
                                        const label = !realm.loginWithEmailAllowed
                                            ? "username"
                                            : realm.registrationEmailAsUsername
                                            ? "email"
                                            : "usernameOrEmail";

                                       // const autoCompleteHelper: typeof label = label === "usernameOrEmail" ? "username" : label;    //aline
                                       const autoCompleteHelper = label === "usernameOrEmail" ? "username" : label;
                                        return (
                                            <>
                                                <label htmlFor={autoCompleteHelper} className={clsx(kcProps.kcLabelClass)}>
                                                    {/* {msg(label)}   //Aline */}  
                                                </label>
                                                <input
                                                    tabIndex={1}
                                                    id={autoCompleteHelper}
                                                    className={clsx(kcProps.kcInputClass)}
                                                    //NOTE: This is used by Google Chrome auto fill so we use it to tell
                                                    //the browser how to pre fill the form but before submit we put it back
                                                    //to username because it is what keycloak expects.
                                                    name={autoCompleteHelper}
                                                    placeholder="User Name"
                                                    defaultValue={login.username ?? ""}
                                                    type="text"
                                                    {...(usernameEditDisabled
                                                        ? { "disabled": true }
                                                        : {
                                                              "autoFocus": true,
                                                              "autoComplete": "off"
                                                          })}
                                                />
                                            </>
                                        );
                                    })()}
                                </div>      
                           
                                <div className={clsx(kcProps.kcFormGroupClass)}>
                                    <label htmlFor="password" className={clsx(kcProps.kcLabelClass)} >
                                        {/* {msg("password")}    //Aline */}    
                                    </label>
                                    <input
                                        tabIndex={2}
                                        id="password"
                                        className={clsx(kcProps.kcInputClass)}
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className={clsx(kcProps.kcFormGroupClass, kcProps.kcFormSettingClass)}>
                                    <div id="kc-form-options">
                                        {realm.rememberMe && !usernameEditDisabled && (
                                            <div className="checkbox">
                                                <label>
                                                    <input
                                                        tabIndex={3}
                                                        id="rememberMe"
                                                        name="rememberMe"
                                                        type="checkbox"
                                                        {...(login.rememberMe
                                                            ? {
                                                                  "checked": true
                                                              }
                                                            : {})}
                                                    />
                                                    {msg("rememberMe")}
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                    <div className={clsx(kcProps.kcFormOptionsWrapperClass)}>
                                        {realm.resetPasswordAllowed && (
                                            <span>
                                                <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                                                    {msg("doForgotPassword")}
                                                </a>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div id="kc-form-buttons" className={clsx(kcProps.kcFormGroupClass)}>
                                    <input
                                        type="hidden"
                                        id="id-hidden-input"
                                        name="credentialId"
                                        {...(auth?.selectedCredential !== undefined
                                            ? {
                                                  "value": auth.selectedCredential
                                              }
                                            : {})}
                                    />
                                    <input
                                        tabIndex={4}
                                        className={clsx(
                                            kcProps.kcButtonClass,
                                            kcProps.kcButtonPrimaryClass,
                                            kcProps.kcButtonBlockClass,
                                            kcProps.kcButtonLargeClass
                                        )}
                                        name="login"
                                        id="kc-login"
                                        type="submit"
                                        // value={msgStr("doLogIn")}
                                        value={msgStr("goToDashBoard")}
                                        disabled={isLoginButtonDisabled}
                                    />
                                </div>
                            </form>
                        )}
                    </div>
                       {realm.password && social.providers !== undefined && (
                        <div id="kc-social-providers" className={clsx(kcProps.kcFormSocialAccountContentClass, kcProps.kcFormSocialAccountClass)}>
                            <ul
                                className={clsx(
                                    kcProps.kcFormSocialAccountListClass,
                                    social.providers.length > 4 && kcProps.kcFormSocialAccountDoubleListClass
                                )}
                            >
                                {social.providers.map(p => (
                                    <li key={p.providerId} className={clsx(kcProps.kcFormSocialAccountListLinkClass)}>
                                        <a href={p.loginUrl} id={`zocial-${p.alias}`} className={clsx("zocial", p.providerId)}>
                                            <span>{p.displayName}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    </div>
            }
            // infoNode={
            //     realm.password &&
            //     realm.registrationAllowed &&
            //     !registrationDisabled && (
            //         <div id="kc-registration">
            //             <span>
            //                 {msg("noAccount")}
            //                 <span> List your self storage facility</span>   {/* //Aline */}
            //                 <a tabIndex={6} href={url.registrationUrl}>
            //                     {/*{msg("doRegister")} */} 
            //                     here
            //                 </a>
            //             </span>
            //         </div>
            //     )
            // }
        />
        
        <div id="kc-registration">
                    <span>
                        {msg("noAccount")}
                        <span className="kc-registration-text">  List your self storage facility</span>   {/* //Aline */}
                        <a tabIndex={6} href={url.registrationUrl}>
                            {/*{msg("doRegister")} */} 
                            here
                        </a>
                    </span>
        </div>
            
        
        </div>
    );
});

export default Login;