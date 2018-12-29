import * as React from "react";
import styled from "styled-components";
import { buttonStyle } from "styled-system";

interface TreeItem {
  path: string;
  type: string;
  //   size: string;
  url: string;
}

interface Props {
  items: TreeItem[];
}

const Container = styled.div`
  background: #f3faff;
  border: 1px solid #d7eeff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  font-size: 1rem;
`;

export const FolderTree: React.FunctionComponent<Props> = props => (
  <Container>text</Container>
);
