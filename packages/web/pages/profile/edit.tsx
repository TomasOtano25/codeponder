import * as React from "react";
// import { Input } from "@codeponder/ui";
import { Formik, Field } from "formik";

interface FormValues {
  name: string;
  bio: string;
}

export default class EditProfile extends React.PureComponent {
  render() {
    return (
      <div>
        <Formik
          initialValues={{ name: "", bio: "" }}
          onSubmit={(values: FormValues) => {}}
        >
          {() => (
            <form>
              <Field />
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
