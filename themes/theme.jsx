import { extendTheme } from "@chakra-ui/react"
import faille from '../assets/faille.png'

const styles = {
    global: (props) => ({
        body: {
            bg: { faille },
            color: '#fff'
        }
    })
}

export const theme = extendTheme({
    styles
})