import Head from "next/head";
import dynamic from "next/dynamic";
import { useQuery } from "@apollo/react-hooks";
import PRODUCTS_QUERY from "../queries/products.query";
import { withApollo } from "../lib/apollo";
import styled from "styled-components";

const Page = styled.div``;
const Grid = styled.div`
  margin: 0 auto;

  max-width: 1000px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, var(--grid-item-size));
  grid-template-rows: auto;
  justify-content: center;
  margin-top: 40px;
`;

const GridItem = styled.div`
  border: 1px solid var(--color);
  height: var(--grid-item-size);
  border-radius: 5px;
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 1.4;
  margin-bottom: 4px;
  padding: 4px 16px 0;
`;

const Description = styled.div`
  font-size: 12px;
  line-height: 1.4;
  padding: 0 16px 16px;
`;

const Placeholder = styled.div`
  background: var(--color);
  height: 150px;
  width: 100%;
`;

const Index = () => {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  let productsTemplate;

  if (loading) {
    productsTemplate = <div>loading</div>;
  } else if (error) {
    productsTemplate = <div>Error: {JSON.stringify(error)}</div>;
  } else {
    const products = data.products.edges;

    productsTemplate = products.map(({ node }, index) => {
      return (
        <GridItem key={`${node.id}-${index}`}>
          <Placeholder></Placeholder>
          <Title>{node.title}</Title>
          <Description>{node.description}</Description>
        </GridItem>
      );
    });
  }

  return (
    <Page>
      <Grid>{productsTemplate}</Grid>
    </Page>
  );
};

export default withApollo({ ssr: true })(Index);
