
import { Inter } from '@next/font/google'
import SideBar from '../components/SideBar'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'

import { MuiThemeProvider, Typography } from '@material-ui/core'

let theme = createTheme(
)

theme = responsiveFontSizes(theme)



export default function Home() {

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <SideBar />
      </MuiThemeProvider>
    </>
  )
}
