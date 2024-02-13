
import { experimental_extendTheme as extendTheme } from "@mui/material/styles"
import { deepOrange, teal, cyan } from "@mui/material/colors"

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      },
      spacing: (factor) => `${0.25 * factor}rem` // (Bootstrap strategy)
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: deepOrange
      },
      spacing: (factor) => `${0.25 * factor}rem` // (Bootstrap strategy)
    }
  }
  // ...other properties
})

export default theme
