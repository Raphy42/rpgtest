class Character {
	constructor (opt) {
		let callback = opt.callback

		makeImage( opt.item ).then( (e) => {
			let group = new Konva.Group({
				lvl: 1,
				strength: 5,
				agility: getRandomInt(2, 6),
				vitality: 5,
				intellect: 5,
				mind: 5,

				attack: 1,
				defense: 1,
				magic_defense: 1,

				head: {},
 				body: items.Vest,
 				arm: {},
 				left: items.Knife,
 				right: {},

				rightproficiency: 1,
				leftproficiency: 1,

				weight: 1,
				jobpoints: 0,
				joblvl: 1,

				ready: false,

				x: e.x(),
				_x: e.x(),
				y: e.y(),
				_y: e.y()
			})
			e.x(0)
			e.y(0)

			group.add( new Konva.Rect({
				width: 64,
				height: 64,
				stroke: 'black'
			}))
			group.lock = false
			group.children[0].hide()

			group.add(e)
			group.character = e

			group.add(new Konva.Rect({
				y: -8,
				width: 64,
				height: 8,
				fill: 'grey'
			}))
			group.add(new Konva.Rect({
				x: 2,
				y: -6,
				width: 60,
				height: 4,
				fill: 'white'
			}))

			let Actionjauge = new Konva.Rect({
				x: 2,
				y: -6,
				width: 0,
				height: 4,
				fill: 'darkblue'
			})

			group.add(Actionjauge)
			group.resetAction = () => {
				Actionjauge.width(0)
			}

			group.add(new Konva.Rect({
				x: 2,
				y: 72 - 6,
				width: 60,
				height: 4,
				fill: 'white'
			}))

			let Lifejauge = new Konva.Rect({
				x: 2,
				y: 72 - 6,
				width: 60,
				height: 4,
				fill: 'darkred'
			})

			group.add(Lifejauge)

			group.loseLife = (x) => {
				Lifejauge.width( Lifejauge.width() - x)
				if (Lifejauge.width() < 0)
					group.destroy()
			}

			group.add(new Konva.Rect({
				x: 2,
				y: 76 - 6,
				width: 60,
				height: 4,
				fill: 'white'
			}))

			let Manajauge = new Konva.Rect({
				x: 2,
				y: 76 - 6,
				width: 60,
				height: 4,
				fill: 'darkgreen'
			})

			group.add(Manajauge)

			// console.log(document.querySelector('adebray-config').jobs[opt.item.class])
			// console.log( config.jobs[opt.item.class](1) )
			// console.log(group.attrs.lvl)
			// group.attack = () => {
			// 	if (group.left.attack)
			// }

			group.attackAnimation = new Konva.Animation( function(frame) {
  				var dist = Math.cos(frame.time / 30) * 10
  				group.move({x: dist, y: 0})
			}, opt.layer)
			group.replace = () => {
				group.x(group.attrs._x)
				group.y(group.attrs._y)
			}

			group.levelup = () => {
				let [s, a, v, i, m] = config.jobs[opt.item.class](group.lvl + 1)

				group.attrs.lvl = group.attrs.lvl + 1,
				group.attrs.strength = group.attrs.strength + s,
				group.attrs.agility = group.attrs.agility + a,
				group.attrs.vitality = group.attrs.vitality + v,
				group.attrs.intellect = group.attrs.intellect + i,
				group.attrs.mind = group.attrs.mind + m
			}

			group.update = (incr) => {
				Actionjauge.width( Actionjauge.width() + incr * group.attrs.agility)
				// console.log(Actionjauge.width())
				if ( Actionjauge.width() > 60 ) {
					group.attrs.ready = true
					Actionjauge.width(60)
					group.fire('ready')
				}
			}

			let eventTable = [
				// konva
				'mouseover',
				'mousemove',
				'mouseout',
				'mouseenter',
				'mouseleave',
				'mousedown',
				'mouseup',
				'wheel',
				'click',
				'dblclick',
				'touchstart',
				'touchmove',
				'touchend',
				'tap',
				'dbltap',
				'dragstart',
				'dragmove',
				'dragend',

				// adebray
				'ready',
			]

			eventTable.forEach( (e) => {
				if (opt.item[e])
					group.on(e, opt.item[e](group))
			})

			callback(group)
		})
	}
}
