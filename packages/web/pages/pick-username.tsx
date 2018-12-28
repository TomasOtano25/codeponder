import * as React from "react";
import { Formik, Field } from "formik";
import { InputField } from "../components/formik-fields/InputField";
import { Query } from "react-apollo";
import gql from "graphql-tag";

interface FormValues {
  username: string;
}

export default class PickUsername extends React.PureComponent {
  render() {
    return (
      <Query
        query={gql`
          {
            me {
              username
            }
          }
        `}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return (
              <iframe
                width="500"
                height="500"
                src="https://lottiefiles.com/iframe/3741-white-loading"
                frameBorder="0"
                allowFullScreen
              />
            );
          }

          if (!data.me) {
            return <div>error: div is null</div>;
          }

          if (!data.me.username || data.me.username === null) {
            return null;
          }

          console.log(error);

          return (
            <Formik<FormValues>
              initialValues={{ username: data.me.username }}
              onSubmit={async (values, { setSubmitting }) => {
                console.log(values);

                return new Promise(res =>
                  setTimeout(() => {
                    res();
                    setSubmitting(false);
                    console.log("you can submit again");
                  }, 5000)
                );
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  {/* <Input type="text" name="name" /> */}
                  {/* <input /> */}
                  <Field name="username" component={InputField} />
                  <button disabled={isSubmitting} type="submit">
                    submit
                  </button>
                </form>
              )}
            </Formik>
          );
        }}
      </Query>
    );
  }
}
