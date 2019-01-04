import * as React from "react";
import { useInputValue } from "../utils/useInputValue";
import { CreateQuestionReplyComponent } from "./apollo-components";

interface Props {
  questionId: string;
}
export const QuestionReply: React.SFC<Props> = ({ questionId }) => {
  const [value, onChange] = useInputValue("");

  return (
    <CreateQuestionReplyComponent>
      {mutate => (
        <form
          onSubmit={async e => {
            e.preventDefault();
            const response = await mutate({
              variables: { questionReply: { questionId, reply: value } }
            });

            console.log(response);
          }}
        >
          <input placeholder="...reply" onChange={onChange} value={value} />
        </form>
      )}
    </CreateQuestionReplyComponent>
  );
};
