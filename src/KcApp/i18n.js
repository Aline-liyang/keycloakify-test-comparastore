import { useI18n as useI18nBase } from "keycloakify";



export function useI18n(props) {
    const { kcContext } = props;
    return useI18nBase({
        kcContext,
        "extraMessages": {
            "en": {
                "doLogIn": "Please, sign in your account",
                "alphanumericalCharsOnly": "Only alphanumerical characters",
				"gender": "Gender",
				// Here we overwrite the default english value for the message "doForgotPassword" 
                // that is "Forgot Password?" see: https://github.com/InseeFrLab/keycloakify/blob/f0ae5ea908e0aa42391af323b6d5e2fd371af851/src/lib/i18n/generated_messages/18.0.1/login/en.ts#L17
                //"doForgotPassword": "I forgot my password",
                "doForgotPassword": "Forgot password?",
                "goToDashBoard": "Go to Dashboard",
                "loginTitleHtml": "",   //Aline
                "listYourSelfStorageFacility": "List your self storage facility",  //Aline
                "doRegister": "Register",  //Aline
                "userName":"User Name",
                "logoutConfirmTitle": "Logout",
            },
            "fr": {
                "doLogIn": "Please, sign in your account",
                /* spell-checker: disable */
                "alphanumericalCharsOnly": "Caractère alphanumérique uniquement",
				"gender": "Genre",
				"doForgotPassword": "J'ai oublié mon mot de passe"
                /* spell-checker: enable */
            },
        },
    });
}
