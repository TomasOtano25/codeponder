import * as React from "react";
import styled from "styled-components";
import FolderIcon from "@material-ui/icons/Folder";
import FileIcon from "@material-ui/icons/InsertDriveFileOutlined";
import { background } from "styled-system";

interface TreeItem {
  name: string;
  type: string;
}

interface Props {
  items: TreeItem[];
  // onItemPress: (path: string) => void;
  Link: any;
  getLinkProps: (path: string) => any;
}

const Container = styled.div`
  background: #f3faff;
  border: 1px solid #d7eeff;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  border-radius: 5px;
  font-size: 1rem;
  overflow: hidden;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
`;

const Item: any = styled.div`
  /* ${(props: any) => ({
    backgroundColor: props.backgroundColor //idx % 2 === 0 ? "#ffffff" : "#f3faff"
  })} */
  ${background}
  /* padding: 6px 10px; */
  font-family: "Rubik";
  font-size: 1rem;
  color: #113f60;
  display: flex;
  align-items: center;
  &:hover {
    box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
    z-index: 1;
  }

`;

const A = styled.a`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px 10px;
  text-decoration: none;
  color: #113f60;
  /* &:hover {
    text-decoration: underline;
  } */
`;

// const Link = styled.a`
//   color: #113f60;
//   text-decoration: none;
//   &:visited {
//     text-decoration: none;
//   }
// `;

const iconProps = {
  fontSize: "small" as "small",
  style: { color: "#78909C", width: 18, height: 18 }
};

export const FolderTree: React.FunctionComponent<Props> = ({
  items,
  // onItemPress,
  Link,
  getLinkProps
}) => (
  <Container>
    {items.map((item, idx) => {
      return (
        <Item
          key={`${item.name}-${idx}`}
          background={idx % 2 === 0 ? "#ffffff" : "#f3faff"}
        >
          <Link {...getLinkProps(item.name)}>
            <A
            // href="#"
            // onClick={() => onItemPress(item.name)}
            >
              <div>
                {item.type === "tree" && <FolderIcon {...iconProps} />}
                {item.type === "blob" && <FileIcon {...iconProps} />}
              </div>
              <div style={{ paddingLeft: 10 }}>{item.name}</div>
            </A>
          </Link>
        </Item>
      );
    })}
  </Container>
);
