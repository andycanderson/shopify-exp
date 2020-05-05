import gql from 'graphql-tag';

const PRODUCTS_QUERY = gql`
  {
    products(first: 10) {
      edges {
        node {
          id,
          description,
          title
        }
      }
    }
  }
`;

export default PRODUCTS_QUERY;