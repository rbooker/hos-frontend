import React from "react";

/** Presentational component for showing bootstrap-style alerts.
 *
 * { LoginForm, SignupForm, ProfileForm } -> Alert
 **/

function Alert({ type = "danger", messages = [] }) {
  console.debug("Alert", "type=", type, "messages=", messages);

  return (
      <div className={`alert alert-${type}`} role="alert">
        {messages.map(error => (
            <div className="showcardalert" key={error}>
              {error}
            </div>
        ))}
      </div>
  );
}

export default Alert;
