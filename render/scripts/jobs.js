jobs = {
	// Dummy : {
	// 	name: 'Dummy',
	// 	image: 'images2/combat_dummy/BODY_animation.png',
	// 	commands: [
	// 		'Attack',
	// 		'Magic',
	// 		'Guard',
	// 		'Item'
	// 	],
	// 	stats: {
	// 		1:  [  5,  5,  5,  5,  5 ],
	// 		10: [ 10, 10, 10, 10, 10 ],
	// 		20: [ 15, 15, 15, 15, 15 ],
	// 		30: [ 20, 20, 20, 20, 20 ],
	// 		40: [ 24, 24, 24, 24, 24 ],
	// 		50: [ 29, 29, 29, 29, 29 ],
	// 		60: [ 34, 34, 34, 34, 34 ],
	// 		70: [ 38, 38, 38, 38, 38 ],
	// 		80: [ 43, 43, 43, 43, 43 ],
	// 		90: [ 48, 48, 48, 48, 48 ],
	// 		99: [ 52, 52, 52, 52, 52 ]
	// 	},
	// 	mps: {
	// 		1:  [  1,  0,  0,  0,  0,  0,  0,  0 ],
	// 		10: [  7,  0,  0,  0,  0,  0,  0,  0 ],
	// 		20: [ 12,  0,  0,  0,  0,  0,  0,  0 ],
	// 		30: [ 15,  0,  0,  0,  0,  0,  0,  0 ],
	// 		40: [ 17,  0,  0,  0,  0,  0,  0,  0 ],
	// 		50: [ 20,  0,  0,  0,  0,  0,  0,  0 ],
	// 		60: [ 20,  0,  0,  0,  0,  0,  0,  0 ],
	// 		70: [ 20,  0,  0,  0,  0,  0,  0,  0 ],
	// 		80: [ 20,  0,  0,  0,  0,  0,  0,  0 ],
	// 		90: [ 20,  0,  0,  0,  0,  0,  0,  0 ],
	// 		99: [ 50,  0,  0,  0,  0,  0,  0,  0 ]
	// 	}
	// },
	Freelancer : {
		name: 'Freelancer',
		image: 'LPC/body/male/light.png', // 'images2/combat_dummy/test.png',
		commands: {
			'Attack' : [],
			'Magic' : [ 'White Magic' ],
			'Guard' : [],
			'Item' : []
		},
		stats: {
			1:  [  5,  5,  5,  5,  5 ],
			10: [ 10, 10, 10, 10, 10 ],
			20: [ 15, 15, 15, 15, 15 ],
			30: [ 20, 20, 20, 20, 20 ],
			40: [ 24, 24, 24, 24, 24 ],
			50: [ 29, 29, 29, 29, 29 ],
			60: [ 34, 34, 34, 34, 34 ],
			70: [ 38, 38, 38, 38, 38 ],
			80: [ 43, 43, 43, 43, 43 ],
			90: [ 48, 48, 48, 48, 48 ],
			99: [ 52, 52, 52, 52, 52 ]
		},
		mps: {
			1:  [  1,  0,  0,  0,  0,  0,  0,  0 ],
			10: [  7,  0,  0,  0,  0,  0,  0,  0 ],
			20: [ 12,  0,  0,  0,  0,  0,  0,  0 ],
			30: [ 15,  0,  0,  0,  0,  0,  0,  0 ],
			40: [ 17,  0,  0,  0,  0,  0,  0,  0 ],
			50: [ 20,  0,  0,  0,  0,  0,  0,  0 ],
			60: [ 20,  0,  0,  0,  0,  0,  0,  0 ],
			70: [ 20,  0,  0,  0,  0,  0,  0,  0 ],
			80: [ 20,  0,  0,  0,  0,  0,  0,  0 ],
			90: [ 20,  0,  0,  0,  0,  0,  0,  0 ],
			99: [ 50,  0,  0,  0,  0,  0,  0,  0 ]
		}
	},
	"Warrior": {
		name: "Warrior",
		image: 'LPC/body/male/dark.png',
		commands: {
			'Attack' : [],
			'Advance' : [],
			'Guard' : [],
			'Item' : []
		},
		stats: {
			1:  [  5,  5,  5,  5,  5 ],
			10: [ 10, 10, 10,  9,  9 ],
			20: [ 17, 17, 16, 14, 14 ],
			30: [ 24, 24, 22, 18, 18 ],
			40: [ 31, 31, 28, 22, 22 ],
			50: [ 38, 38, 34, 26, 26 ],
			60: [ 44, 44, 40, 29, 29 ],
			70: [ 51, 51, 46, 33, 33 ],
			80: [ 58, 58, 52, 37, 37 ],
			90: [ 65, 65, 58, 41, 41 ],
			99: [ 71, 71, 63, 45, 45 ]
		},
	},
	"White Mage" : {
		name: "White Mage",
		image: 'LPC/body/male/skeleton.png',
		commands: {
			'Attack' : [],
			'Magic' : [ 'White Magic' ],
			'Guard' : [],
			'Item' : []
		},
		stats: {
			1:  [  5,  5,  5,  5,  5 ],
			10: [ 10, 10, 10,  9, 10 ],
			20: [ 15, 16, 16, 14, 17 ],
			30: [ 20, 22, 22, 18, 24 ],
			40: [ 24, 28, 28, 22, 31 ],
			50: [ 29, 34, 34, 26, 38 ],
			60: [ 34, 40, 40, 34, 44 ],
			70: [ 38, 46, 46, 33, 51 ],
			80: [ 43, 52, 52, 37, 58 ],
			90: [ 48, 58, 58, 41, 65 ],
			99: [ 52, 63, 63, 45, 71 ]
		},
		mps: {
			1:  [  4,  0,  0,  0,  0,  0,  0,  0 ],
			10: [ 13,  2,  1,  0,  0,  0,  0,  0 ],
			20: [ 23,  7,  5,  3,  0,  0,  0,  0 ],
			30: [ 33, 12,  9,  7,  2,  1,  0,  0 ],
			40: [ 43, 17, 12, 10,  4,  3,  2,  0 ],
			50: [ 53, 22, 15, 14,  7,  5,  3,  0 ],
			60: [ 63, 27, 18, 18,  9,  8,  5,  0 ],
			70: [ 73, 32, 21, 21, 11, 10,  6,  0 ],
			80: [ 83, 37, 24, 25, 14, 12,  7,  0 ],
			90: [ 93, 42, 27, 29, 16, 14,  9,  0 ],
			99: [ 99, 47, 29, 32, 18, 16, 10,  0 ]
		}
	}
}
