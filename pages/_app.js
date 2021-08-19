import { ApolloProvider } from "@apollo/client"
import React from "react"
import { client } from "../lib/apolloClient"

import "../styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
