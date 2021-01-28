import { useAuth0 } from "@auth0/auth0-react";
import React, { ReactChild, ReactChildren, useEffect } from "react";
import { useHistory } from "react-router-dom";

interface UserGuardProps {
  redirect: boolean;
  children: ReactChild | ReactChildren | ReactChildren[] | ReactChild[];
}
export const UserGuard = ({ children, redirect }: UserGuardProps) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    console.log(user);
    if (!isLoading && isAuthenticated) {
      if (redirect) {
        history.push("/app");
      }
    }
  }, [isLoading, isAuthenticated, history, redirect]);
  return <>{children}</>;
};
