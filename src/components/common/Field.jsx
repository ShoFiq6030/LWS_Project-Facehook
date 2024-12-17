import React from "react";

function Field({ label, children, htmlFor, error }) {
  const getChildId = () => {
    const child = React.Children.only(children);
    if ("id" in child?.props) {
      return child.props.id;
    }
  };
  const id = htmlFor || getChildId(children);
  return (
    <div className="form-control">
      {label && (
        <label className="auth-label" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {!!error && <div className="text-red-600">{error?.message}</div>}
    </div>
  );
}

export default Field;
