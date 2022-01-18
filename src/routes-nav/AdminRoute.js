import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** "Higher-Order Component" for Admin-only routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user who is a Admin and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function AdminRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);

  console.debug(
      "PrivateRoute",
      "exact=", exact,
      "path=", path,
      "currentUser=", currentUser,
  );

  if (!currentUser || (currentUser && !currentUser.isAdmin)) {
    return <Redirect to="/notfound" />;
  }

  return (
      <Route exact={exact} path={path}>
        {children}
      </Route>
  );
}

export default AdminRoute;