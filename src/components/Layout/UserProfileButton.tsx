import React from "react";

interface UserProfileButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const UserProfileButton: React.FC<UserProfileButtonProps> = ({
  children,
  ...props
}) => {
  return <div {...props}>{children}</div>;
};

export default UserProfileButton;
