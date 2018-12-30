import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// import { linkTo } from '@storybook/addon-links';
import { FolderTree } from "./index";

storiesOf("FolderTree", module).add("basic example", () => (
  <FolderTree
    items={[
      {
        path: ".gitignore",
        type: "blob",
        url:
          "https://api.github.com/repos/benawad/codeponder/git/blobs/8b467557dca4fd4b61160b2168d852ed975ddc3f"
      },
      {
        path: "README.md",
        type: "blob",
        url:
          "https://api.github.com/repos/benawad/codeponder/git/blobs/6ac3895889c10685dcb1c4c8f9dca688755b374b"
      },
      {
        path: "lerna.json",
        type: "blob",
        url:
          "https://api.github.com/repos/benawad/codeponder/git/blobs/da876e94fc360267a850182aa45d2b56b058cae9"
      },
      {
        path: "package.json",
        type: "blob",
        url:
          "https://api.github.com/repos/benawad/codeponder/git/blobs/4c6d43149b410bc291ed8742aa09fb7b148c707d"
      },
      {
        path: "packages",
        type: "tree",
        url:
          "https://api.github.com/repos/benawad/codeponder/git/trees/ec1d8c10c3b2eb47ec8ae182f6bcd0d40dd385b2"
      }
    ]}
    onItemPress={action("item-click")}
  />
));
