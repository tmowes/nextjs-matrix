import { extendTheme } from '@chakra-ui/react'

const inputsAutoFillStyle = {
  WebkitTextFillColor: '#EDF2F7',
  WebkitBoxShadow: '0 0 0px 1000px transparent inset',
  transition: 'background-color 9999s ease-in-out 0s',
}

export const theme = extendTheme({
  colors: {
    'gray.950': '#111116',
    grayAlpha: '#1212184D',
  },
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
  styles: {
    global: {
      ':host,:root': {
        '--chakra-ring-color': '#ffffff66',
      },
      body: {
        bg: 'green',
        color: 'gray.100',
        backgroundImage:
          'url("https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'multiply',
        height: '100%',
        width: '100%',
      },
      '*::placeholder': {
        color: 'gray.100',
      },
      'input:-webkit-autofill': inputsAutoFillStyle,
      'input:-webkit-autofill:hover': inputsAutoFillStyle,
      'input:-webkit-autofill:focus': inputsAutoFillStyle,
      'textarea:-webkit-autofill': inputsAutoFillStyle,
      'textarea:-webkit-autofill:hover': inputsAutoFillStyle,
      'textarea:-webkit-autofill:focus': inputsAutoFillStyle,
      'select:-webkit-autofill': inputsAutoFillStyle,
      'select:-webkit-autofill:hover': inputsAutoFillStyle,
      'select:-webkit-autofill:focus': inputsAutoFillStyle,
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        width: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        bgGradient:
          'linear(to-b, #A0AEC040, #71809666, #71809699, gray.500, gray.500, #71809666, #2D374840)',
        borderRadius: '3px',
      },
      '&::focus': {
        outlineColor: 'transparent',
        borderColor: 'gray.700',
        borderWidth: '1px',
        borderRadius: '6px',
      },
      '*::-webkit-calendar-picker-indicator': {
        filter: 'invert(100%)',
        fontSize: '22px',
      },
    },
  },
  shadows: {
    outline: '0 0 0 1px var(--chakra-ring-color)',
  },
})
