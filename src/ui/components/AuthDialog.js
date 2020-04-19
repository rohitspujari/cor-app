import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Container, Grid } from '@material-ui/core';
import UserContext from '../UserContext';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const federated = {
  google_client_id: '',
};

export default function AuthDialog({ onSignIn }) {
  //const user = useContext(UserContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    Hub.listen(
      'auth',
      ({ payload }) => {
        //debugger;
        //console.log(payload);
        switch (payload.event) {
          case 'oAuthSignOut':
            //dispatch({ type: 'signOut' });
            break;
          case 'signOut':
            //setUser(payload.data);
            // if (payload.data.attributes.identities) {
            //   //This is necessary check, if removed the Auth UI will refresh twice. Once due to signOut state change, and other due to browser refresh as a result of logging out from oauth provider (facebook)
            //   return;
            // }
            //dispatch({ type: 'signOut' });

            break;
          case 'signIn': //console.log(Auth.user);
            //setUser(payload.data);
            //onSignIn();
            //handleClose();
            //getAuthenticatedUser();
            //dispatch({ type: 'signIn', payload: Auth.user });
            break;
        }
        return () => console.log('unmounting...');
      },
      []
    );

    //getAuthenticatedUser();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button disableRipple color="inherit" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              disableRipple
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container justify="center" style={{ marginTop: '1.5rem' }}>
          <AmplifyAuthenticator>
            <div>
              My App
              <AmplifySignOut />
            </div>
          </AmplifyAuthenticator>
          ;
        </Grid>
      </Dialog>
    </div>
  );
}
