import React, { useMemo } from "react";
// material
import {
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
  PaletteMode,
} from "@mui/material";

//
import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import componentsOverride from "./overrides";
import shadows, { CustomShadowProps, customShadows } from "./shadows";

// ----------------------------------------------------------------------

interface ThemeConfigProps {
  mode: PaletteMode;
  children: React.ReactNode;
}

declare module "@mui/material" {
  interface ShapeOptions {
    borderRadiusSm: number | string;
    borderRadiusMd: number | string;
  }
}
declare module "@mui/material/styles" {
  interface Theme {
    customShadows: CustomShadowProps;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows: CustomShadowProps;
  }

  interface Shape {
    borderRadiusSm: number | string;
    borderRadiusMd: number | string;
  }
  interface ShapeOptions {
    borderRadiusSm: number | string;
    borderRadiusMd: number | string;
  }

  interface PaletteColor {
    darker: string;
    lighter: string;
  }
}

const ThemeConfig = (props: ThemeConfigProps) => {
  const { mode, children } = props;
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: mode === "dark" ? { mode: "dark" } : palette,
      shape,
      typography,
      shadows,
      customShadows,
    }),
    [mode]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeConfig;
