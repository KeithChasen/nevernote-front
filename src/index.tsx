import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    ApolloClient,
    createHttpLink,
    ApolloLink,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import {getToken, isAuth, saveToken} from "./helper/auth";
import { TokenRefreshLink } from "apollo-link-token-refresh";

export const EXPRESS_URL = 'http://localhost:4000';
const GRAPHQL_URL = `${EXPRESS_URL}/graphql`;

const refreshLink =
    new TokenRefreshLink({
        accessTokenField: 'access_token',
        isTokenValidOrUndefined: () => isAuth(),
        fetchAccessToken: () => {
            return fetch(`${EXPRESS_URL}/refresh-token`, {
                method: 'POST',
                credentials: 'include'
            });
        },
        handleFetch: accessToken => saveToken(accessToken),
        handleError: err => {
            // full control over handling token fetch Error
            console.warn('Your refresh token is invalid. Try to relogin');
            console.error(err);
        }
    });

const httpLink = createHttpLink({
    uri: GRAPHQL_URL,
    credentials: 'include'
})

const authLink = setContext((_, { headers }) => {
    const token = getToken();
   return {
       headers: {
           ...headers,
           authorization: `Bearer ${token}`
       }
   }
});

const client = new ApolloClient({
    link: ApolloLink.from([refreshLink, authLink, httpLink]),
    cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
