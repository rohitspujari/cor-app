import React, { useState, useEffect } from 'react';
//import logo from "./logo.svg";
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';

import { Route, Switch } from 'react-router-dom';

import Post from './ui/pages/PostDetail';
import NewPost from './ui/pages/NewPost';
import Home from './ui/pages/Home';
import theme from './ui/Theme';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
import FeedbackPage from './ui/pages/FeedbackPage';
import UserContext from './ui/UserContext';

//update context from the child component https://codesandbox.io/s/react-context-4c174?file=/src/LanguageSwitcher.js

Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState();
  //const value = { user, setUser };

  const getAuthenticatedUser = async () => {
    const u = await Auth.currentAuthenticatedUser();
    console.log(u);
    setUser(u);
  };

  useEffect(() => {
    Hub.listen(
      'auth',
      ({ payload }) => {
        //debugger;
        console.log(payload);
        switch (payload.event) {
          case 'oAuthSignOut':
            //dispatch({ type: 'signOut' });
            break;
          case 'signOut':
            setUser(null);
            // if (payload.data.attributes.identities) {
            //   //This is necessary check, if removed the Auth UI will refresh twice. Once due to signOut state change, and other due to browser refresh as a result of logging out from oauth provider (facebook)
            //   return;
            // }
            //dispatch({ type: 'signOut' });

            break;
          case 'signIn': //console.log(Auth.user);
            setUser(payload.data);
            //getAuthenticatedUser();
            //dispatch({ type: 'signIn', payload: Auth.user });
            break;
        }
      },
      []
    );

    //getAuthenticatedUser();
  }, []);

  useEffect(() => {
    getAuthenticatedUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/post/:number" component={Post} />
          <Route path="/create" component={NewPost} />
          <Route path="/feedback" component={FeedbackPage} />
        </Switch>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
