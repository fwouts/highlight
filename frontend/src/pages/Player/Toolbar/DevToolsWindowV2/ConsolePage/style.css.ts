import { colors } from '@highlight-run/ui/src/css/colors'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const consoleBox = style({
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	paddingLeft: 8,
	overflowX: 'hidden',
	overflowY: 'auto',
	wordWrap: 'break-word',
})

export const consoleBar = style({
	width: 2,
	borderRadius: 4,
	marginRight: 4,
})

export const consoleText = style({
	lineHeight: '20px',
	color: 'rgba(26, 21, 35, 0.72)',
})

export const consoleRow = style({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-start',
	padding: '2px 4px',
	margin: '8px 0',
	selectors: {
		'&:focus, &:active, &:hover': {
			backgroundColor: colors.n5,
		},
	},
})

export const messageRowVariants = recipe({
	base: {
		borderRadius: 4,
	},
	variants: {
		current: {
			true: {
				backgroundColor: colors.n4,
			},
			false: {},
		},
	},
})
