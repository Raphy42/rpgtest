let Player_conf = {
	mouseenter : (group) => (e) => {
		e.evt.preventDefault()
		e.evt.stopPropagation()
		e.cancelBubble = true

		group.selectionRect.show()
		group.getParent().draw()
		// console.log('mouseenter', group )
	},

	mouseleave : (group) => (e) => {
		e.evt.preventDefault()
		e.evt.stopPropagation()
		e.cancelBubble = true

		if (group.lock == false)
			group.selectionRect.hide()
		group.getParent().draw()
		// console.log('mouseleave', group )
	},

	click : (group) => (e) => {
		e.evt.preventDefault()
		e.evt.stopPropagation()
		e.cancelBubble = true

		let menu = document.querySelector('adebray-work')

		if (menu.selected.attrs) {
			menu.selected.lock = false
			menu.selected.selectionRect.hide()
			group.getParent().draw()
		}

		menu.selected = group
		menu.selected.selectionRect.show()
		group.getParent().draw()

		group.lock = true
	},

	update: (group) => (e) => {
		if (document.querySelector('adebray-work').selected === group)
		{
			document.querySelector('adebray-work').set('selected', {})
			document.querySelector('adebray-work').set('selected', group)
		}
	},

	ready : (group) => (e) => {
		let menu = document.querySelector('adebray-work')

		if (menu.selected == e.target) {
			menu.$.fight.disabled = false
			menu.$.item.disabled = false
		}

		let rand = getRandomInt(5, 9)
		let enemy = this.layer.children[rand]
		makeAttack(this.layer, group, enemy)
	}
}

let IA_conf = {
	ready : (group) => (e) => {
		e.cancelBubble = true

		group.attrs.ready = false
		group.actionJauge.reset()

		let rand = getRandomInt(1, 5)
		let enemy = this.layer.children[rand]
		makeAttack(this.layer, group, enemy)
	},
	click : (group) => (e) => {
		e.evt.preventDefault()
		e.evt.stopPropagation()
		e.cancelBubble = true

		let menu = document.querySelector('adebray-work')
		if (menu.$.fight.focused && menu.selected.attrs.ready)
			makeAttack(this.layer, menu.selected, group)
	}
}

class BattleStage {
	constructor (opt) {
		this.layer = opt.layer

		this.teamA = opt.teamA
		this.teamB = opt.teamB

		var cmp = 0
		var step = 50
		var w = this.layer.width() / 2 - step
		var h = this.layer.height() / 2 + step
		var promises = []

		for (var i = 0; i < 8; i++) {
			if (this.teamA[i]) {
				this.teamA[i].x = w - cmp * step
				this.teamA[i].y = h + cmp * step

				Object.keys(Player_conf).forEach( k => {
					this.teamA[i][k] = Player_conf[k]
				})

				promises.push( characterPromise( this.teamA[i] ) )
			}

			cmp += 1
			if ( h + 32 + (cmp + 1) * step > this.layer.height() ) {
				cmp = 0
				w -= 120
			}
		}

		var cmp = 0
		var step = 50
		var w = this.layer.width() / 2 + step
		var h = this.layer.height() / 2 + step

		for (var i = 0; i < 8; i++) {

			if (this.teamB[i]) {
				this.teamB[i].x = w + cmp * step
				this.teamB[i].y = h + cmp * step

				Object.keys(IA_conf).forEach( k => {
					this.teamB[i][k] = IA_conf[k]
				})

				promises.push( characterPromise( this.teamB[i] ) )
			}

			cmp += 1
			if ( h + 32 + (cmp + 1) * step > this.layer.height() ) {
				cmp = 0
				w += 120
			}
		}

		this._time = {
			ticks: 0,
			time: 0
		}

		this.stack = [
			(_time) => _time.ticks += 1
		]

		let divisor = 20

		Promise.all(promises).then( _ => {
			_.forEach( e => {
				this.layer.add(e)
			})

			this.stack.extend( this.layer.children.map( (e) => (_time) => {
				if (e.nodeType == 'Group') {
					e.update(1 / divisor)
					e.draw()
				}
			}))

			this.stack.extend([(_time) => {
				if (parseInt(_time.ticks / divisor) > _time.time)
					_time.time = parseInt(_time.ticks / divisor)
			}])

			this.layer.draw()
			opt.callback(this)
		})
	}

	update() {
		this.stack.forEach( (f) => f(this._time))
	}
}
