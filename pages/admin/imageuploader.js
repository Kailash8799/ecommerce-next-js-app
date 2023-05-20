import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import CssBaseline from "@mui/material/CssBaseline";

const Imageuploader = () => {
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        .footeradd {
          display:none;
        }
        .navbaradd {
          display:none;
        }
      `}</style>
    <CssBaseline />
    <FullLayout>
    Imageuploader
    </FullLayout>
      </ThemeProvider>
  );
}

export default Imageuploader