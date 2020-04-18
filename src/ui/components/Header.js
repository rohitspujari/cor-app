import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import SearchBar from './SearchBar';
import { Button, Menu, MenuItem, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import UploadIcon from '@material-ui/icons/CloudUpload';
import { useHistory } from 'react-router-dom';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Post } from '../../models';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';

import logo from '../../assets/logo.png';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  input: {
    display: 'none',
  },
  logo: {
    height: '2em',
    marginRight: 20,
  },
}));

const ProcessExcel = (file) => {
  var reader = new FileReader();

  reader.onload = (e) => {
    var data = e.target.result;
    var workbook = window.XLSX.read(data, {
      type: 'binary',
    });

    workbook.SheetNames.forEach(function (sheetName) {
      // Here is your object
      var XL_row_object = window.XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[sheetName]
      );
      //var json_object = JSON.stringify(XL_row_object);
      //console.log(XL_row_object);

      InsertData(XL_row_object);
    });
  };

  reader.onerror = function (ex) {
    console.log(ex);
  };

  reader.readAsBinaryString(file);
};

const InsertData = (data) => {
  data.map(async ({ Service, Feature, Problem, Solution, Resources }) => {
    const input = {
      service: Service,
      feature: Feature,
      problem: Problem,
      solution: Solution,
      resources: Resources,
    };

    //await API.graphql(graphqlOperation(mutations.createPost, { input }));
    await DataStore.save(
      new Post({
        service: Service,
        feature: Feature,
        problem: Problem,
        solution: Solution,
        resources: Resources,
      })
    );
  });
};

function UploadButton() {
  const classes = useStyles();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    ProcessExcel(file);
  };

  return (
    <div>
      <input
        onChange={handleUpload}
        accept="*/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <IconButton
          component="span"
          //onClick={() => history.push('/upload')}
          //edge="start"
          //className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <UploadIcon />
        </IconButton>
      </label>
    </div>
  );
}

function MenuButton() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        onClick={handleMenuClick}
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => history.push('/create')}>Create New</MenuItem>
        <MenuItem
          onClick={async () => await DataStore.delete(Post, Predicates.ALL)}
        >
          Delete All
        </MenuItem>
      </Menu>
    </>
  );
}

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();

  const {
    children,
    search,
    createButton,
    onSearchTextChange,
    onSearchSubmit,
  } = props;

  const displayCreate = false || createButton;

  let topMargin = '6rem'; ///'6rem';

  if (!search) {
    topMargin = '0';
  }

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <>
          <AppBar>
            <Toolbar>
              <Hidden smUp>
                <MenuButton />
              </Hidden>
              <Hidden xsDown>
                <img alt="company-logo" src={logo} className={classes.logo} />
              </Hidden>
              <Typography className={classes.title} variant="h6">
                Cost Optimization Repository
              </Typography>

              <Hidden only="xs">
                {displayCreate === true ? (
                  <>
                    <UploadButton />
                    <Button
                      onClick={() => history.push('/create')}
                      color="inherit"
                    >
                      Create New
                    </Button>
                  </>
                ) : null}
              </Hidden>

              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          {search === true ? (
            <SearchBar
              onChange={onSearchTextChange}
              onSearchSubmit={onSearchSubmit}
            />
          ) : null}
        </>
      </ElevationScroll>

      <Toolbar />
      <Box
        className={classes.toolbarMargin}
        style={{
          marginTop: topMargin,
          padding: 15,
        }}
      >
        {children}
      </Box>
    </>
  );
}
