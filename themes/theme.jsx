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

const components = {
    Text: {
        variants: {
            SkinName: {
                backdropFilter: "blur(10px)",
                pos: 'absolute',
                bottom: 10,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '1.5em',
                p: '5px 15px',
                borderRadius: 8
            }
        }
    }
}

export const theme = extendTheme({
    styles,
    components
})