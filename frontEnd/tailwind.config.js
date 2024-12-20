/** @type {import('tailwindcss').Config} */
import colors, { inherit } from 'tailwindcss/colors';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
	// Path to Tremor module
    "./node_modules/@tremor/react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
		extend: {
			colors:{
				transparent: 'transparent',
				'darkBlue' : '#206AC4',
				'ligthBlue' : '#5EAFE8',
				'orange' : '#FF6D00',
				'black': '#1E1E1E',
				'backgroundWhite' : '#F0F4F9',
				'white' : '#FFFFFF',
				'placeholderBlue' : '#D6DEFA',
				'gray' : '#B1B1B1',
				'grayOpaque' : '#B1B1B150',
				'greenFull' : '#1D8348',
				'redFull' : '#E74C3C',
				'yellowFull' : '#F5E960',
				'greenOpaque' : '#1D834850',
				'redOpaque' : '#E74C3C50',
				'yellowOpaque' : '#F5E96050',
				 // light mode
				tremor: {
					brand: {
						faint: colors.blue[50],
						muted: colors.transparent,
						subtle: colors.transparent,
						DEFAULT: colors.blue[500],
						emphasis: colors.blue[700],
						inverted: colors.white,
					},
					background: {
						muted: colors.gray[50],
						subtle: colors.gray[100],
						DEFAULT: colors.white,
						emphasis: colors.gray[700],
					},
					border: {
						DEFAULT: 'transparent',
					},
					ring: {
						DEFAULT: colors.gray[200],
					},
					content: {
						subtle: colors.gray[400],
						DEFAULT: colors.gray[500],
						emphasis: colors.gray[700],
						strong: colors.gray[900],
						inverted: colors.white,
						
					},
					
				},
				// dark mode
				'dark-tremor': 'class'
			},
			boxShadow: {
				// light
				'tremor-input': 'none',
				'tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
				'tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
				// dark
				'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
				'dark-tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
				'dark-tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
			},
			borderRadius: {
				'tremor-small': '0.375rem',
				'tremor-default': '0.75rem',
				'tremor-full': '9999px',
			},
			fontSize:{
				'title' : '28px',
				'title2' : '22px',
				'subTitle' : '20px',
				'subTitle2' : '18px',
				'paragraph' :'16px',
				'paragraph2': '14px',
				'paragraph3' : '12px',
				'paragraphSmall' : '8px',
				'button' : '18px',
				'button2' : '15px',
				'tremor-label': ['0.75rem', { lineHeight: '1rem' }],
				
				'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
				'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],
				'tremor-default': 'inherit',
			},
			fontFamily:{
				cocogooseRegular: ['Cocogoose-Regular', 'sans-serif'],
				cocogooseSemiLight : ['Cocogoose-SemiLight', 'sans-serif'],
				cocogooseLight: ['Cocogoose-Light', 'sans-serif'],
				cocogooseUltraLight: ['Cocogoose-UltraLight', 'sans-serif']
			},
			
		}
	},
	safelist: [
		{
		  pattern:
			/^(bg-(?:slate|gray|greenFull|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		  variants: ['hover', 'ui-selected'],
		},
		{
		  pattern:
			/^(text-(?:slate|gray|greenFull|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		  variants: ['hover', 'ui-selected'],
		},
		{
		  pattern:
			/^(border-(?:slate|gray|greenFull|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		  variants: ['hover', 'ui-selected'],
		},
		{
		  pattern:
			/^(ring-(?:slate|gray|greenFull|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		},
		{
		  pattern:
			/^(stroke-(?:slate|gray|greenFull|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		},
		{
		  pattern:
			/^(fill-(?:slate|gray|greenFull|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		},
	  ],
  plugins: [],
}

