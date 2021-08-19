import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import slashes from "remove-trailing-slash"

const link = createHttpLink({
  uri: `${slashes(process.env.NEXT_PUBLIC_WORDPRESS_URL)}/graphql`,
  credentials: "include",
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})
