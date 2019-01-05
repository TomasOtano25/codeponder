import * as React from "react";
import {
  FindCodeReviewQuestionsComponent,
  CreateCodeReviewQuestionComponent
} from "./apollo-components";
import { QuestionReply } from "./QuestionReply";
import { useInputValue } from "../utils/useInputValue";
import Highlight, { defaultProps } from "prism-react-renderer";
// import theme from "prism-react-renderer/themes/duotoneLight";
import "prismjs/themes/prism-solarizedlight.css";

interface Props {
  code: string | null;
  repo: string;
  username: string;
  branch: string;
  path?: string;
}

export const CodeFile: React.SFC<Props> = ({
  code,
  repo,
  username,
  branch,
  path
}) => {
  const [startingLineNum, startingLineNumChange] = useInputValue("0");
  const [endingLineNum, endingLineNumChange] = useInputValue("0");
  const [text, textChange] = useInputValue("");

  const extension = path ? path.split(".").pop() : "";

  return (
    <CreateCodeReviewQuestionComponent>
      {mutate => (
        <>
          <Highlight
            {...defaultProps}
            code={code}
            language={extension}
            theme={undefined}
          >
            {({
              className,
              style,
              tokens,
              getLineProps,
              getTokenProps
            }: any) => (
              <pre className={className} style={style}>
                {tokens.map((line: string[], i: number) => (
                  <div {...getLineProps({ line, key: i })}>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          color: "rgba(27,31,35,.3)",
                          padding: "0  10px",
                          textAlign: "right",
                          minWidth: "50px",
                          lineHeight: "20px",
                          cursor: "pointer",
                          userSelect: "none"
                        }}
                      >
                        {i + 1}
                      </div>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
          <pre>
            <code className={`language-${extension}`}>{code}</code>
          </pre>
          <form
            onSubmit={async e => {
              e.preventDefault();
              console.log("send mutation");
              const response = await mutate({
                variables: {
                  codeReviewQuestion: {
                    startingLineNum: parseInt(startingLineNum, 10), // parseInt(startingLineNum, 10)
                    endingLineNum: parseInt(endingLineNum, 10),
                    text,
                    repo,
                    username,
                    branch,
                    path
                  }
                }
              });
              console.log(response);
            }}
          >
            <input
              // type="number"
              name="startingLineNum"
              placeholder="startingLineNum"
              value={startingLineNum}
              onChange={startingLineNumChange}
            />
            <input
              // type="number"
              name="endingLineNum"
              placeholder="endingLineNum"
              value={endingLineNum}
              onChange={endingLineNumChange}
            />
            <input
              name="text"
              placeholder="question"
              value={text}
              onChange={textChange}
            />
            <button type="submit">save</button>
          </form>
          <FindCodeReviewQuestionsComponent
            variables={{
              branch,
              path,
              repo,
              username
            }}
          >
            {({ data, loading }) => {
              console.log(data);
              if (!data || loading) {
                return null;
              }

              if (!data.findCodeReviewQuestions) {
                return null;
              }

              return (
                <div>
                  {data.findCodeReviewQuestions.map(crq => {
                    return (
                      <div key={crq.id}>
                        <div>|{crq.creator.username}|</div>
                        <div>{crq.text}</div>
                        <div>
                          {crq.replies.map(reply => (
                            <div key={reply.id} style={{ color: "pink" }}>
                              <div>|{reply.creator.username}|</div>
                              {reply.text}
                            </div>
                          ))}
                        </div>
                        <QuestionReply questionId={crq.id} />
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </FindCodeReviewQuestionsComponent>
        </>
      )}
    </CreateCodeReviewQuestionComponent>
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
