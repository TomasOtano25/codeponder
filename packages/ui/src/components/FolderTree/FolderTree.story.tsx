import * as React from "react";

import { storiesOf } from "@storybook/react";
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// import { Welcome } from '@storybook/react/demo';
import { FolderTree } from "./index";

storiesOf("FolderTree", module).add("with text", () => (
  <FolderTree items={[]} />
));
