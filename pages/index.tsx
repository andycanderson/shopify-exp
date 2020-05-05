import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useQuery } from '@apollo/react-hooks';
import PRODUCTS_QUERY from '../queries/products.query';
import { withApollo } from '../lib/apollo';

const Index = () => {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  let productsTemplate;

  if (loading) {
    productsTemplate = <div>loading</div>;
  } else if (error) {
    productsTemplate = <div>Error: {JSON.stringify(error)}</div>;
  } else {
    productsTemplate = data.products.edges.map(({ node }) => {
      return (
        <div key={node.id}>
          <div>{node.title}</div>
          <div>{node.description}</div>
        </div>
      )
    })
  }

  return (
    <div>
      <p>Storefront</p>
      {productsTemplate}
    </div>
  )
};

export default withApollo({ ssr: true })(Index);