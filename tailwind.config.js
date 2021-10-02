const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      spacing: {
        '0': '0rem',
        '0.5': '	0.125rem',
        '1': '0.25rem		',
        '1.5': '	0.375rem',
        '2': '	0.5rem		',
        '2.5': '	0.625rem	',
        '  3': '0.75rem	',
        '3.5': '0.875rem',
        '  4': '1rem',
        '5': '1.25rem		',
        '6': '1.5rem',
        '7': '1.75rem	',
        '8': '	2rem',
        '9': '	2.25rem',
        '10': '2.5rem',
        '11': '2.75rem	',
        '12': '3rem',
        '14': '	3.5rem	',
        '16': '	4rem',
        '20': '5rem',
        '24': '	6rem	',
        '28': '	7rem	',
        '32': '	8rem	',
        ' 36': '	9rem	',
        '40': '	10rem	',
        '44': '	11rem	',
        '48': '12rem',
        '52': '13rem',
        '56': '14rem	',
        '60': '15rem',
        '64': '16rem	',
        '72': '18rem',

        '84': '21rem',

        '96': '24rem',
        '120': '39rem',

        '200': '75rem'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Inter', 'serif'],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
      },
      textShadow: {
        default: '0px 0px 1px rgb(0 0 0 / 20%), 0px 0px 1px rgb(1 0 5 / 10%)',
        sm: '1px 1px 3px rgb(36 37 47 / 25%)',
        md: '0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)',
        lg: '3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)',
        xl: '1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)',
        none: 'none',
      },
      listStyleType: {
        none: 'none',

        disc: 'disc',

        decimal: 'decimal',

        roman: 'upper-roman'
      },
      scale: {
        '25': '.25',
        '50': '.5',
        '75': '.75',
        '90': '.9',
        '95': '.95',
        '100': '1',
        '105': '1.05',
        '110': '1.1',
        '125': '1.25',
        '150': '1.5',
        '200': '2',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        DEFAULT: '4px',
        'md': '0.375rem',
        '3xl': '1rem',
        '4xl': '2rem',
        'lg': '0.5rem',
        'full': '9999px',
        'large': '12px',
      },
      ringWidth: {
        'DEFAULT': '2px',
        '6': '6px',
        '10': '10px',
      },
      ringOpacity: {
        '5': '0.05',
        '10': '0.10',
        '15': '0.15',
        '25': '0.35',
        '35': '0.65',
      },
      backgroundImage: {
        'the-willy': "url('/head.png')",
        'bill': " url('https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X_400x400.jpg')",
        'stygian': "url('/stygian.png')",
        'enso': "url('https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg')",
        'emerald-citizen': "url('https://ipfs.io/ipfs/QmdpLLWDfgXJWvJyqydRwP6Dw8pFwrgn2ziZPAHosjWfCR')"
      },
      colors: {
        coolGray: colors.coolGray,
        blueGray: colors.blueGray,
        lightblue: colors.sky,
        darkblue: colors.indigo,
        teal: colors.teal,
        cyan: colors.cyan,
        blue: colors.blue,
        red: colors.rose,
        pink: colors.pink,
        green: colors.lime,
        purple: colors.violet,
        amber: colors.amber,
        fuchsia: colors.fuchsia,
        moralis: '#c5fa00',
        'th-background': 'var(--background)',
        'th-background-secondary': 'var(--background-secondary)',
        'th-foreground': 'var(--foreground)',
        'th-primary-dark': 'var(--primary-dark)',
        'th-primary-medium': 'var(--primary-medium)',
        'th-primary-light': 'var(--primary-light)',

        'th-accent-dark': 'var(--accent-dark)',
        'th-accent-medium': 'var(--accent-medium)',
        'th-accent-light': 'var(--accent-light)',

        'th-accent-success': 'var(--accent-success)',
        'th-accent-success-light': 'var(--accent-success-light)',
        'th-accent-success-medium': 'var(--accent-success-medium)',
        'th-accent-success-dark': 'var(--accent-success-dark)',

        'th-accent-failure': 'var(--accent-failure)',
        'th-accent-failure-light': 'var(--accent-failure-light)',
        'th-accent-failure-medium': 'var(--accent-failure-medium)',
        'th-accent-failure-dark': 'var(--accent-failure-dark)',

        'th-accent-info': 'var(--accent-info)',
        'th-accent-info-light': 'var(--accent-info-light)',
        'th-accent-info-medium': 'var(--accent-info-medium)',
        'th-accent-info-dark': 'var(--accent-info-dark)',

        'th-accent-warning': 'var(--accent-warning)',
        'th-accent-warning-light': 'var(--accent-warning-light)',
        'th-accent-warning-medium': 'var(--accent-warning-medium)',
        'th-accent-warning-dark': 'var(--accent-warning-dark)',

        'th-accent-moralis': 'var(--accent-moralis)',

      },
      keyframes: {

        bottomShadow: {
          '0%': { boxShadow: ('-5px  0px 0px -5px  rgba(0, 0, 0, 0.1)') },
          '25%': { boxShadow: ('-5px  2px 2px -5px  rgba(0, 0, 0, 0.1)') },
          '50%': { boxShadow: ('-5px  4px 4px -5px rgba(0, 0, 0, 0.1) '), },
          '75%': { boxShadow: ('0px 8px 8px 0px rgba(0, 0, 0, 0.1) ') },
          ' 100%': { boxShadow: ('0px 12px 12px 0px rgba(0, 0 , 0, 0.1)') },
        },
        shadowGlow: {
          '0%': { boxShadow: ('0 1px 1px 0px rgba(0, 0, 0, 0.1)') },
          '25%': { boxShadow: ('0 5px 5px 0px #0c4a6e ') },
          '50%': { boxShadow: ('0 7px 7px 0px #1e40af ') },
          '75%': { boxShadow: ('0 9px 9px 0px #60a5fa '), },
          ' 100%': { boxShadow: ('0 9px 9px 0px #7fb4f5 ') },

        },

      },
      animation: {
        bounce: 'bounce 3s infinite',
        spin: 'spin infinite linear  8s',
        shadowGlow: 'shadowGlow 2s alternate infinite ease-in-out',
        bottomShadow: 'bottomShadow 1s alternate infinite ease-in-out'
      }
    }
  },
  variants: {
    extend: {
      fontSize: ['hover', 'focus'],
      ringOpacity: ['hover', 'active'],
      animation: ['hover', 'focus'],
    },

  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('@tailwindcss/typography'),

  ],
}
