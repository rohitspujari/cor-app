import React, { useState, useEffect } from 'react';

export function useIsAdmin(user) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      if (
        user.signInUserSession.accessToken.payload.hasOwnProperty(
          'cognito:groups'
        )
      ) {
        if (
          user.signInUserSession.accessToken.payload['cognito:groups'].includes(
            'admin'
          )
        ) {
          //console.log('hurray!');
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return isAdmin;
}
