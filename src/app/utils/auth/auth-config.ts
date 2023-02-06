import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_signin-signup",
        editProfile: "B2C_1_edit-profile",
        passwordReset: "B2C_1_password-reset"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://digihubb2c.b2clogin.com/digihubB2C.onmicrosoft.com/B2C_1_signin-signup",
        },
        editProfile: {
            authority: "https://digihubb2c.b2clogin.com/digihubB2C.onmicrosoft.com/B2C_1_edit-profile",
        },
        passwordReset: {
            authority: "https://digihubb2c.b2clogin.com/digihubB2C.onmicrosoft.com/B2C_1_password-reset",
        }
    },
    authorityDomain: "digihubb2c.b2clogin.com"
};

export const msalConfig: Configuration = {
    auth: {
        clientId: '2d5ad050-62e9-4d17-832b-19296e076b52',
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: '/',
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: isIE,
    },
    system: {
        loggerOptions: {
            loggerCallback(logLevel, message, containsPii) {
                console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
}

export const protectedResources = {
    todoListApi: {
        endpoint: "http://localhost:5000/api/v1/todolist",
        scopes: ["https://digihubb2c.b2clogin.com/digihubB2C.onmicrosoft.com/api/tasks.read"],
    }
}

export const loginRequest = {
    scopes: []
}