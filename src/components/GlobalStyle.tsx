import { css, Global } from '@emotion/react';

const STYLES = css`
  * {
    padding: 0;
    margin:  0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    text-rendering: optimizeLegibility;
    font-smooth: always;
    -webkit-font-smooth: antialiased;
    -moz-font-smooth: grayscale;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  button {
    cursor: pointer;
    border: none;
    
  }
`;

export const GENERICS = {
    primaryColor: '#00a82d',
    primaryColorDark: '#008f26',
    border: '1px solid #f1f1f1',
    colorBlackCalm: "#333",
    colorGrey: "#737373",
    boxShadow: '#ccc 0px 4px 5px -2px'
};

export const MIXINS = {
    va: (align = "center") => css`
      display: flex;
      align-items: center;
      ${align !== 'center' ? "justify-content: flex-start;" : "justify-content: center;"}
    `
}

export const GlobalStyles = () => <Global styles={STYLES}/>
