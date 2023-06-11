module.exports = {
  mode: 'jit',
  content: [   
    "./pages/**/*.{js,ts,jsx,tsx}",   
    "./components/**/*.{js,ts,jsx,tsx}",  
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['"Roboto"']
    },
    container: {
      center: true,
      padding: '0.75rem',
    },
    extend: {
      colors: {
        blue: {
          DEFAULT: '#143C96',
          darkblue: '#153D97',
          pale: '#2C6EBE',
          lightest: '#E2EFFF',
          bluishwhite: '#DAEEF3',
          link: '#0F5D85',
          facebook: '#1782F9'
        },
        pear: {
          yellowish: '#DCE84C',
          DEFAULT: '#CBD646',
          acid: '#B7C240'
        },
        gray: {
          extralight: '#F6FAFB',
          lightest: '#EEF2F3',
          lightestplus: '#F0F4F5',
          lightplus: '#EBEBEB',
          light: '#D3D9DB',
          DEFAULT: '#BCC8CC',
          dark: '#677889',
          darkest: '#4E5A61',
        },
        purple:{
          DEFAULT: '#B35B8F',
          dark: '#a64e82',
          darkest: '#9c4377'
        },
        red: {
          DEFAULT: '#AE1A20',
          light: '#F1D2D3'
        },
        green: '#06670B',
        paleyellow: '#FBF9F0',
        semipaleyellow: '#FAF2D2',
        yellow: '#FCC646',
        yellowlight: '#FFCB23',
        aqua: '#ACCFD7'
      },
      boxShadow: {
        graydark: '-4px 8px 16 0 #617179',
        'menu': '2px 3px 8px 0px rgba(0, 0, 0, 0.1)',
      },
      width:{
        '9.5': '38px',
        '10.5': '42px',
        '13.25': '53px', 
        '15.5': '60px', 
        '17': '68px',
        '18': '72px', 
        '19.25' : '77px',
        '20.5': "84px",
        '22': "88px",
        '22.5': "90px",
        '25': "100px",
        '30': '120px',
        '31.4': '124px',
        '32.25': '130px',
        '33': "133px",
        '35.25': "142px",
        '39': "156px",
        '39.5': '164px',
        '41.5': '175px',
        '47.25': '189px',
        '55': '220px',
        '56': '224px',
        '62': '244px',
        '68': '260px',
        '68.5': '266px',
        '71.1': '282px',
        '72': '288px',
        '72.5': '290px',
        '73.75': '295px',
        '74.5': '303px',
        '88': '360px',
        '82.5': '330px',
        '94': '376px',
        '94.5': '393px',
        '96.2': '400px',
        '103': '412px',
        '110.5': '459px',
        '117.5': '523px',
        '120.4': '500px',
        '123.5': '555px',
        '143.5': '655px',

      },
      height:{
        '7.5': '30px',
        '11.5': '46px',
        '11.55': '48px',
        '12.5': '50px',
        '16.5': '70px',
        '21.25': '85px',
        '30': '120px',
        '33.25': '133px',
        '37.5': '150px',
        '40.5': '166px',
        '62.25': '249px',
        '77': '308px',
        '96.5': '386px',
        '100': '400px',
        '101.5': '406px',
        '102.25': '409px',
        '105': '420px',
        '125': '500px',
        '128.5': '514px',
        '134.5': '538px',
        '156.5': '626px'
      },
      fontSize: {
        'xs1': '0.69rem',
        'xs': '0.75rem',
        'sm': '0.875rem',
        'tiny': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '2.5xl': '1.75rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
      margin: {
        '4.5': '18px',
        '22': '88px'
      },
      gridAutoColumns: {
        'min': '320px'
      },
      inset:{
        '33': '132px',
        '40.75': '163px'
      },
      gap:{
        '2.5': '10px'
      },
      screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1400px',
      // => @media (min-width: 1400px) { ... }
    },
    maxWidth: {
      'checkout-xl': '1000px',
    },
    animation: {
      autoClose: 'autoClose 10s ease-in',
      arrowRotate: 'arrowRotate 0.4s forwards',
      spinSlow: 'spin 2s linear infinite',
      slideInLeft: "slideInLeft 0.5s ease-in-out",
      slideInRight: "slideInRight 0.5s ease-in-out"
    },
    keyframes: {
      autoClose: {
        '0%': { width: '100%' },
        '100%': { width: '0%' },
      },
      arrowRotate:{
        // '50%': {transform: 'rotate(90deg)'},
        '100%': {transform: 'rotate(180deg)'},
      },
      slideInLeft: {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(0)" }
      },
      slideInRight: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-100%)" }
      }
    }
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover', 'active'],
    },
    scrollbar: ['rounded']
  },
  plugins: [
  ],
}
