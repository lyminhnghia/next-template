import { Theme } from "@mui/material";

const Autocomplete = (theme: Theme) => {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          ".MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
            paddingRight: 4,
          },
        },
        paper: {
          boxShadow: theme.customShadows.z20,
          borderRadius: 5,
        },
      },
    },
  };
};

export default Autocomplete;
