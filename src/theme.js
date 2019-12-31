import { red } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    // h5: {
    //   fontWeight: 500,
    // },
    // h6: {
    //   marginTop: 32,
    // },
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#FD008B",
    },
    secondary: {
      main: "#0080FF",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700, //custom,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

export default theme
