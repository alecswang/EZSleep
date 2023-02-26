// import React from 'react';

// // define themes
// const themes = {
//     dark: {
//         backgroundColor: '#654CE0',
//         color: 'white'
//     },
//     light: {
//         backgroundColor: '#7974E8',
//         color: 'black'
//     }
// }

// // set initial state
// const initialState = {
//     dark: false,
//     theme: themes.light,
//     toggle: () => {}
// }

// const ThemeContext = React.createContext(initialState)

// function ThemeProvider({children}) {
//     const [dark, setDark] = React.useState(false) // Default theme is light

//     // Toggle between dark and light modes
//     const toggle = () => {
//         setDark(!dark)
//     }

//     // Filter the styles based on the theme selected
//     const theme = dark ? themes.dark : themes.light

//     return(
//         <ThemeContext.Provider value={{theme, dark, toggle}}>
//             {children}
//         </ThemeContext.Provider>
//     )
// }

// export {ThemeProvider, ThemeContext}