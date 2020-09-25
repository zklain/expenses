export default {
  useColorSchemeMediaQuery: false,
  colors: {
    grey: '#a8a8a8',
    primary: '#000',
    background: '#fff',
    green: '#15eca5',
    red: '#ec155c',
    purple: '#a515ec',
    pink: '#ec15c8',
    blue: '#22ecff',
    darkBlue: '#6321ff',
    shadow: '#efefef',
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
      },
      light: {
        text: '#000',
        primary: '#000',
        background: '#fff',
        grey: '#a8a8a8',
        green: '#15eca5',
        red: '#ec155c',
        purple: '#a515ec',
        pink: '#ec15c8',
        blue: '#22ecff',
        darkBlue: '#6321ff',
        shadow: '#efefef',
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
      zIndex: '200',
      position: 'fixed',
      top: 0,
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
    formCard: {
      zIndex: 2,
      backgroundColor: 'background',
      boxShadow: '0 1px 3px grey',
      transition: 'all 0.3s ease-in-out',
      width: '100%',
      position: 'fixed',
      borderRadius: '30px',
      paddingBottom: '50px',
      '&.closed': {
        bottom: '-500px',
        // marginTop: '400px',
        // transform: 'scaleY(0)',
      },
      '&.opened': {
        bottom: '20px',
        // transform: 'scaleY(1)',
        // marginTop: 0,
      },
    },
    navbar: {
      boxShadow: 'borderTop',
      width: '100%',
      bottom: 0,
      position: 'fixed',
      backgroundColor: 'background',
      height: 'auto',
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
