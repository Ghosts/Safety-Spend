import { IfFirebaseAuthed } from "@react-firebase/auth";
import React, { ReactChild, ReactChildren } from "react";

interface UserGuardProps {
  redirect: boolean;
  children: ReactChild | ReactChildren | ReactChildren[] | ReactChild[];
}
export const UserGuard = ({ children }: UserGuardProps) => {
  return (
    <IfFirebaseAuthed>
      {() => {
        return <>children</>;
      }}
    </IfFirebaseAuthed>
  );
};
