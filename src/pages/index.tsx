
import { Inter } from '@next/font/google'
import SideBar from '../components/SideBar/SideBar'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'

import { MuiThemeProvider, Typography } from '@material-ui/core'

let theme = createTheme(
)

theme = responsiveFontSizes(theme)



export default function Home() {

  return (
    <>
      <h1>PedeFast is running</h1>
    </>
  )
}
