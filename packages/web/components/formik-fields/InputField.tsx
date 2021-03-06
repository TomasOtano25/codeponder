import * as React from "react";
import { Input } from "@codeponder/ui";
import { FieldProps } from "formik";

export const InputField = ({
  field,
  form: { touched, errors },
  ...props
}: FieldProps<any>) => {
  const errorText = touched[field.name] && errors[field.name];
  // <div className="error">{errors[field.name]}</div>;

  return <Input errorText={errorText} type="text" {...field} {...props} />;
};
