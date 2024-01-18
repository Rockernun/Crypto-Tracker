import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { theme } from "./theme";
import { HelmetProvider } from 'react-helmet-async';

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111"
}

const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke"
}

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);



