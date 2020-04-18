import React from 'react';
import { TextField, Paper } from '@material-ui/core';

//import { makeStyles } from '@material-ui/core/styles';

export default function SearchBar() {
  return (
    <Paper
      elevation={0}
      style={{
        position: 'fixed',
        width: '100%',
        padding: 10,
        //backgroundColor: "blue",
      }}
    >
      <TextField
        style={{ marginTop: '4rem' }}
        id="filled-search"
        label="Search"
        type="search"
        variant="outlined"
        fullWidth
        helperText="Enter a keyword. For example, Redshift."
      />
    </Paper>
  );
}
