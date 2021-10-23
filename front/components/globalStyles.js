import { createGlobalStyle, css } from "styled-components";

const fontCss = css`
  @font-face {
    font-family: "Middleschool_student";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Middleschool_student.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
`;

const GlobalStyles = createGlobalStyle`
    ${fontCss}

    body {
        font-family: "Middleschool_student", sans-serif;
    }
`;

export default GlobalStyles;
