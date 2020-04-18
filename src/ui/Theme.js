import { createMuiTheme } from '@material-ui/core/styles';

const amazonGrey = '#222f3e';
const amazonOrange = '#ff9900';

export default createMuiTheme({
  palette: {
    common: {
      darkGray: `${amazonGrey}`,
      orange: `${amazonOrange}`,
    },
    primary: {
      main: `${amazonGrey}`,
    },
    secondary: {
      main: `${amazonOrange}`,
    },
    background: {
      paper: `#f7f7f7`,
    },
  },
  typography: {
    h6: {
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
    },
  },
});
