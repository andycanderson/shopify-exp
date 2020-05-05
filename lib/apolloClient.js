import fetch from 'isomorphic-unfetch';
import { createHttpLink, HttpLink } from 'apollo-link-http';
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default function createApolloClient(initialState, ctx) {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      fetch,
      uri: process.env.STOREFRONT_API,
      headers: {
        "Accept": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.STOREFRONT_PUBLIC_KEY
      }
    }),
    cache: new InMemoryCache().restore(initialState)
  })
}
