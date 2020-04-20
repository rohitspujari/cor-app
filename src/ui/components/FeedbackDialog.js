import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { DataStore } from '@aws-amplify/datastore';
import { Feedback } from '../../models';
import { TextField, Container, Box } from '@material-ui/core';
import UserContext from '../UserContext';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const user = useContext(UserContext);
  //console.log(user);
  const { onClose, selectedValue, open } = props;
  const [values, setValues] = useState({});

  const { contact, comment } = values;

  useEffect(() => {
    //console.log(user);
    if (user) {
      setValues({ ...values, contact: user.username });
    }
  }, [user]);

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleSubmit = async () => {
    //const createdAt = new Date();
    const input = {
      contact,
      comment,
    };

    await API.graphql(graphqlOperation(mutations.createFeedback, { input }));

    // await DataStore.save(
    //   new Feedback({
    //     contact,
    //     comment,
    //     createdAt: createdAt.toUTCString(),
    //   })
    // );
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        Your feedback is important!
      </DialogTitle>
      <Container>
        <TextField
          onChange={handleChange('comment')}
          value={values.comment}
          style={{ marginBottom: 10 }}
          helperText="We appreciate your comments."
          label="Comments"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />
        <TextField
          value={values.contact}
          onChange={handleChange('contact')}
          style={{ marginBottom: 10 }}
          helperText="Please leave your name and email if you would like us to follow up."
          label="Contact"
          variant="outlined"
          fullWidth
        />

        <Button
          onClick={handleSubmit}
          style={{ float: 'right', marginBottom: 20 }}
          color="primary"
          variant="contained"
        >
          Submit
        </Button>
      </Container>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function FeedbackDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Button
        style={{ marginLeft: 10 }}
        variant="outlined"
        disableRipple
        color="secondary"
        onClick={handleClickOpen}
      >
        Feedback?
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
