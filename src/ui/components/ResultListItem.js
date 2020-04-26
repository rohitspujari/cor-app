import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  TextField,
  //Link,
  Paper,
  Grid,
  Divider,
  Typography,
  Button,
  Card,
  Chip,
  Hidden,
} from '@material-ui/core';

export default function ResultListItem(props) {
  const {
    data: { id, service, feature, problem, user },
  } = props;

  const preventDefault = (event) => event.preventDefault();
  return (
    // <>
    <Card
      variant="outlined"
      elevation={0}
      //square
      style={{ padding: 10, marginBottom: 10 }}
    >
      <Typography
        variant="h6"
        component={Link}
        to={`/post/${id}`}
        color="textPrimary"
        style={{ textDecoration: 'none' }}
      >
        {/* <Link href="#" c to={`/case/${id}`} onClick={preventDefault}> */}
        {problem}
        {/* </Link> */}
      </Typography>
      <Grid style={{ marginTop: 10 }} container>
        <Grid
          item
          xs={10}
          container
          justify="flex-start"
          alignItems="flex-end"
          spacing={2}
        >
          <Grid item>
            <Chip
              size="small"
              label={service}
              variant="default"
              color="primary"
            />
            {/* <Typography>Billing & Accounting</Typography> */}
          </Grid>
          <Grid item>
            <Chip
              size="small"
              label={feature}
              variant="default"
              color="default"
            />
          </Grid>
        </Grid>
        <Hidden xsDown>
          <Grid item xs={2} container justify="flex-end" alignItems="flex-end">
            {/* <Typography
              style={{ marginRight: 5 }}
              //display="block"
              variant="body2"
            >{`Contributed by`}</Typography> */}
            <Typography
              color="textSecondary"
              //display="block"
              variant="body2"
            >{`${user ? user : ''}`}</Typography>
          </Grid>
        </Hidden>
      </Grid>
    </Card>
    // </>
  );
}
