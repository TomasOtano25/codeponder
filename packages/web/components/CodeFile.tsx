import * as React from "react";
import { useState, useCallback } from "react";
import { CreateCodeReviewComponent } from "./apollo-components";

interface Props {
  text: string | null;
  repo: string;
  username: string;
  branch?: string;
  path?: string;
}

function useInputValue<T>(
  initialValue: T
): [T, (e: React.ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const onChange = useCallback(event => {
    setValue(event.currentTarget.value);
  }, []);

  return [value, onChange];
}

export const CodeFile: React.SFC<Props> = ({
  text,
  repo,
  username,
  branch,
  path = "/"
}) => {
  const [startingLineNum, startingLineNumChange] = useInputValue(0);
  const [endingLineNum, endingLineNumChange] = useInputValue(0);
  const [question, questionOnChange] = useInputValue("");

  return (
    <CreateCodeReviewComponent>
      {mutate => (
        <>
          <pre>{text}</pre>
          <form
            onSubmit={async e => {
              e.preventDefault();
              console.log("send mutation");
              const response = await mutate({
                variables: {
                  startingLineNum, // parseInt(startingLineNum, 10)
                  endingLineNum,
                  question,
                  repo,
                  username,
                  branch: branch ? branch : "master",
                  path
                }
              });
              console.log(response);
            }}
          >
            <input
              type="number"
              name="startingLineNum"
              placeholder="startingLineNum"
              value={startingLineNum}
              onChange={startingLineNumChange}
            />
            <input
              type="number"
              name="endingLineNum"
              placeholder="endingLineNum"
              value={endingLineNum}
              onChange={endingLineNumChange}
            />
            <input
              name="question"
              placeholder="question"
              value={question}
              onChange={questionOnChange}
            />
            <button type="submit">save</button>
          </form>{" "}
        </>
      )}
    </CreateCodeReviewComponent>
  );
};

// export default class CodeFile extends React.PureComponent<Props> {
//   state = {
//     startingLineNum: 0,
//     endingLineNum: 0,
//     question: ""
//   };

//   handleChange = (e: any) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   render() {
//     const { text } = this.props;
//     const { startingLineNum, endingLineNum, question } = this.state;
//     return (
//       <>
//         <pre>{text}</pre>
//         <form
//           onSubmit={e => {
//             e.preventDefault();
//             console.log("send mutation");
//           }}
//         >
//           <input
//             type="number"
//             name="startingLineNum"
//             placeholder="startingLineNum"
//             value={startingLineNum}
//             onChange={this.handleChange}
//           />
//           <input
//             type="number"
//             name="endingLineNum"
//             placeholder="endingLineNum"
//             value={endingLineNum}
//             onChange={this.handleChange}
//           />
//           <input
//             name="question"
//             placeholder="question"
//             value={question}
//             onChange={this.handleChange}
//           />
//           <button type="submit">save</button>
//         </form>
//       </>
//     );
//   }
// }
