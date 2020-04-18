import React from 'react';
import { TextField, Paper } from '@material-ui/core';

//import { makeStyles } from '@material-ui/core/styles';

export default function SearchBar({ onChange, onSearchSubmit }) {
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
        onChange={onChange}
        id="filled-search"
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            // console.log('search');
            onSearchSubmit();
          }
        }}
        label="Search"
        type="search"
        variant="outlined"
        fullWidth
        helperText="Enter a keyword. For example, Redshift."
      />
    </Paper>
  );
}
