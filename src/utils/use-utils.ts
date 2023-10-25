import { useTheme } from "@mui/material/styles";

export function useResponsive(){
    const theme = useTheme();
    const responsiveStyles = {
        [`@media (maxWidth: ${theme.breakpoints.values.sm}px)`]: {
          // Styles for mobile screens
          styleMenuItem: {
            // Mobile-specific styles for styleMenuItem
            flex: 1,
          },
          styleMenuIconItem: {
            // Mobile-specific styles for styleMenuIconItem
            flex: 1,
          },
        },
        [`@media (minWidth: ${theme.breakpoints.values.md}px)`]: {
          // Styles for notebook screens
          styleMenuItem: {
            // Notebook-specific styles for styleMenuItem
            flex: 1,
          },
          styleMenuIconItem: {
            // Notebook-specific styles for styleMenuIconItem
            flex: 1,
          },
        },
      };
      return({
        responsiveStyles
      });
}
