import React, { useState } from 'react';

import {
  Grid,
  Paper,
  Typography,
  IconButton,
  TextField,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/CheckBox';
import ReactMarkdown from 'react-markdown';

export default function Section(props) {
  const { source, label, editable, onChange } = props;
  const isEditable = false || editable;
  const [state, setState] = useState(true); // true = saved-state => display edit icon, false = edit-state => display save icon
  //const [state, setState] = useState(!editable);
  return (
    <Paper elevation={0} style={{ padding: 10, marginTop: 10 }}>
      <Grid container spacing={2} alignItems="center" justify="space-between">
        <Grid item xs={11}>
          <Typography variant="h6" color="secondary">
            {label}
          </Typography>
        </Grid>
        {isEditable === true ? (
          <Grid item container justify="flex-end" xs={1}>
            <IconButton
              size="small"
              disableRipple
              aria-label="delete"
              onClick={() => setState(!state)}
            >
              {state === true ? <EditIcon /> : <CheckIcon />}
            </IconButton>
          </Grid>
        ) : null}
      </Grid>

      {state === true ? (
        <Typography
          component={ReactMarkdown}
          source={source}
          escapeHtml={false}
        />
      ) : (
        //<ReactMarkdown source={value} />
        <TextField
          fullWidth
          id="outlined-textarea"
          //label="Multiline Placeholder"
          onChange={onChange}
          //onChange={(e) => setValue(e.target.value)}
          multiline
          value={source}
          variant="outlined"
        />
      )}
    </Paper>
  );
}
