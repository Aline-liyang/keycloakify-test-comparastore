import React, { memo } from "react";
//import DefaultTemplate from "./Template";
//import type { TemplateProps } from "./Template";
//import type { KcProps } from "./KcProps";
//import type { KcContextBase } from "../getKcContext/KcContextBase";
//import type { I18n } from "../i18n";
//import { clsx } from "keycloakify/lib/tools/clsx";
//import Template from "keycloakify/lib/components/Template";
import DefaultTemplate from "keycloakify/lib/components/Template";

/*export type LoginVerifyEmailProps = KcProps & {
    kcContext: KcContextBase.LoginVerifyEmail;
    i18n: I18n;
    doFetchDefaultThemeResources?: boolean;
    Template?: (props: TemplateProps) => JSX.Element | null;
};*/

const LoginVerifyEmail = memo((props) => {
    const { kcContext, i18n, doFetchDefaultThemeResources = true, Template = DefaultTemplate, ...kcProps } = props;

    const { msg } = i18n;

    const { url, user } = kcContext;

    return (
        <Template
            {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}
            displayMessage={false}
            headerNode={msg("emailVerifyTitle")}
            formNode={
                <>
                    <p className="instruction">{msg("emailVerifyInstruction1", user?.email)}</p>
                    <p className="instruction">
                        {msg("emailVerifyInstruction2")}
                        <br />
                        <a href={url.loginAction}>{msg("doClickHere")}</a>
                        &nbsp;
                        {msg("emailVerifyInstruction3")}
                    </p>
                </>
            }
        />
    );
});

export default LoginVerifyEmail;