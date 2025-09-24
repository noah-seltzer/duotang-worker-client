import { PublicClientApplication } from "@azure/msal-browser";

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID",
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // or 'localStorage'
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["api://YOUR_API_CLIENT_ID/Your.Scope"]
};

export const msalInstance = new PublicClientApplication(msalConfig);