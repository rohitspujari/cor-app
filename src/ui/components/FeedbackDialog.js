import React, { useState } from 'react';
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

const emails = ['username@gmail.com', 'user02@gmail.com'];

const initialState = {
  contact: null,
  comment: null,
};

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [values, setValues] = useState(initialState);

  const { contact, comment } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleSubmit = async () => {
    const createdAt = new Date();
    await DataStore.save(
      new Feedback({
        contact,
        comment,
        createdAt: createdAt.toUTCString(),
      })
    );
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
          onChange={handleChange('contact')}
          style={{ marginBottom: 10 }}
          helperText="Please leave your name and email if you would like us to follow up."
          label="Contact"
          variant="outlined"
          fullWidth
        />
        <TextField
          onChange={handleChange('comment')}
          style={{ marginBottom: 10 }}
          helperText="We appreciate your comments."
          label="Comments"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />

        <Button
          onClick={handleSubmit}
          style={{ float: 'right', marginBottom: 10 }}
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
      <Button color="inherit" onClick={handleClickOpen}>
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
