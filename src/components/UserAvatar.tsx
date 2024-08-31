
import { User } from '@nextui-org/react';
import React from 'react'

export default function UserAvatar({displayName, email}: Readonly<{displayName: string, email: string}>) {
  return (
    <User
      avatarProps={{
        radius: "lg",
        src: `https://i.pravatar.cc/150?u=${email}`,
      }}
      description={email}
      name={displayName}
    >
      {email}
    </User>
  );
}
