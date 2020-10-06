export default {
  useColorSchemeMediaQuery: false,
  colors: {
    grey: '#a8a8a8',
    primary: '#000',
    background: '#f4f4f4',
    green: '#15eca5',
    red: '#ec155c',
    purple: '#a515ec',
    pink: '#ec15c8',
    blue: '#22ecff',
    darkBlue: '#6321ff',
    shadow: '#efefef',
    white: '#fff',
    modes: {
      dark: {
        background: '#383a59',
        text: '#fff',
        grey: '#a8a8a8',
        primary: '#fff',
        green: '#15eca5',
        red: '#ec155c',
        purple: '#a515ec',
        pink: '#ec15c8',
        blue: '#22ecff',
        darkBlue: '#6321ff',
        shadow: '#efefef',
        white: '#383a59',
      },
      light: {
        text: '#000',
        primary: '#000',
        background: '#f3f3f3',
        grey: '#a8a8a8',
        green: '#15eca5',
        red: '#ec155c',
        purple: '#a515ec',
        pink: '#ec15c8',
        blue: '#22ecff',
        darkBlue: '#6321ff',
        shadow: '#efefef',
        white: '#fff',
      },
    },
  },
  styles: {
    ul: {
      listStyle: 'none',
    },
    root: {
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      height: '100vh',
      width: '100%',
      textAlign: 'left',
      overflowY: 'hidden',
      fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif`,
      margin: 0,
      '.active': {
        color: 'purple',
      },
      '.no-scroll': {
        overflowY: 'hidden',
        position: 'fixed',
      },
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      '&:-webkit-scrollbar ': {
        backgroundColor: 'transparent',
      },
    },
  },
  shadows: {
    borderTop: '0px -1px 0px lightgrey',
  },
  borders: {
    thin: '1px solid lightgrey',
  },
  fonts: {
    body: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
    heading: 'inherit',
  },
  text: {
    color: 'primary',
    headerHeading: {
      fontSize: ['2rem', '6rem'],
      fontWeight: 900,
      textAlign: 'left',
    },
  },
  forms: {
    input: {
      borderRadius: 7,
      '&:focus': {
        outline: 'none',
        borderColor: '#a515ec',
        boxShadow: '0 0 0 2px #a515ec',
      },
    },
    select: {
      borderRadius: 7,
      '&:focus': {
        outline: 'none',
        borderColor: '#a515ec',
        boxShadow: '0 0 0 2px #a515ec',
      },
    },
  },
  buttons: {
    primary: {
      backgroundColor: 'green',
      color: 'primary',
      p: [1],
    },
    monthSwitch: {
      color: 'primary',
      backgroundColor: 'background',
      fontSize: 3,
      fontWeight: 900,
    },
    remove: {
      backgroundColor: 'background',
      color: 'red',
      fontWeight: 900,
      padding: 0,
    },
    close: {
      backgroundColor: 'background',
      color: 'primary',
      fontWeight: 200,
      padding: 0,
      fontSize: 3,
      cursor: 'pointer',
    },
    green: {
      backgroundColor: 'green',
      color: 'black',
      fontWeight: 700,
      fontSize: [3],
    },
  },
  variants: {
    links: {
      navbarLink: {},
    },
    header: {
      backgroundColor: 'background',
      width: '100%',
      // zIndex: '200',
      // position: 'fixed',
      // top: 0,
      px: 4,
      py: 3,
    },

    container: {
      maxWidth: '1300px',
      margin: '0 auto',
      px: ['32px'],
    },
    card: {
      backgroundColor: 'background',
      boxShadow: '0px 1px 3px grey',
      borderRadius: '20px',
      p: [3],
    },
    formCard: {},
    navbar: {
      boxShadow: 'borderTop',
      width: '100%',
      height: ['3.5rem'],
      bottom: 0,
      position: 'fixed',
      backgroundColor: 'background',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      zIndex: 100,
    },
    navLinkHolder: {
      width: '100%',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: [2],
      a: {
        p: {
          marginTop: [1],
          fontSize: '14px',
        },
        span: {
          fontSize: 3,
        },
        '&.active': {
          color: 'purple',
        },
      },
    },
  },
};
