import React from 'react';
// Modules
import { AppProps } from 'next/app';
import Head from 'next/head';
// MUI Core
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
// Utils
import theme from '../utils/theme';
import wrapper from '../Frontend/redux/store'

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/nprogress.css"


const CheckeeApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          //pauseOnVisibilityChange
          closeOnClick
          pauseOnHover
        />
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(CheckeeApp)