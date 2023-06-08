import { getKcContext } from "keycloakify/lib/getKcContext";

export const { kcContext } = getKcContext({
    // Uncomment to test the login page for development.
    "mockPageId": "login-update-profile.ftl",
    "mockData": [
        {
            "pageId": "login-update-profile.ftl",
            "locale": {
                //When we test the login page we do it in french
				//"currentLanguageTag": "fr",    //Aline
				"currentLanguageTag": "en", 
            },
        },
		{
			"pageId": "my-extra-page-2.ftl",
			"someCustomValue": "foo bar baz"
		},
		{
			"pageId": "register.ftl",
			"authorizedMailDomains": [
				"example.com",
				"another-example.com",
				"*.yet-another-example.com",
				"*.example.com",
				"hello-world.com"
			]
		},
		{
			//NOTE: You will either use register.ftl (legacy) or register-user-profile.ftl, not both
			"pageId": "register-user-profile.ftl",
			"locale": {
				"currentLanguageTag": "fr"
			},
			"profile": {
				"attributes": [
					{
						"validators": {
							"pattern": {
								"pattern": "^[a-zA-Z0-9]+$",
								"ignore.empty.value": true,
								// eslint-disable-next-line no-template-curly-in-string
								"error-message": "${alphanumericalCharsOnly}",
							},
						},
						//NOTE: To override the default mock value
						"value": undefined,
						"name": "username"
					},
					{
						"validators": {
							"options": {
								"options": ["male", "female", "non-binary", "transgender", "intersex", "non_communicated"]
							}
						},
						// eslint-disable-next-line no-template-curly-in-string
						"displayName": "${gender}",
						"annotations": {},
						"required": true,
						"groupAnnotations": {},
						"readOnly": false,
						"name": "gender"
					}
				]
			}
		}
    ]
});

