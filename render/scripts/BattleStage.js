class BattleStage {
	constructor (opt) {
		this.layer = opt.layer

		this.teamA = opt.teamA
		this.teamB = opt.teamB

		var cmp = 0
		var step = 60
		var w = this.layer.width() / 2 - step
		var h = this.layer.height() / 2 + step
		var promises = []

		for (var i = 0; i < 8; i++) {
			if (this.teamA[i]) {
				this.teamA[i].x = w - cmp * step
				this.teamA[i].y = h + cmp * step
				this.teamA[i].click = (group) => (e) => {
					// this.
					e.evt.stopPropagation()
					e.cancelBubble = true
				// 	console.log('click')
					let menu = document.querySelector('adebray-work')
					menu.selected = group
				// 	menu.hidden = false
				// 	menu.x = e.evt.clientX
				// 	menu.y = 0e.evt.clientY
				}
				promises.push( make( this.teamA[i] ) )
			}

			cmp += 1
			if ( h + (cmp + 1) * step > this.layer.height() ) {
				cmp = 0
				w -= 120
			}
		}

		var cmp = 0
		var step = 60
		var w = this.layer.width() / 2 + step
		var h = this.layer.height() / 2 + step

		for (var i = 0; i < 8; i++) {

			if (this.teamB[i]) {
				this.teamB[i].x = w + cmp * step
				this.teamB[i].y = h + cmp * step
				promises.push( make( this.teamB[i] ) )
			}

			cmp += 1
			if ( h + (cmp + 1) * step > this.layer.height() ) {
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

		Promise.all(promises).then( _ => {
			_.forEach( e => this.layer.add(e) )

			 this.stack.extend( this.layer.children.map( (e) => (_time) => {
				if (parseInt(_time.ticks / 60) > _time.time) {
					e.update(1)
					this.layer.draw()
				}
			}))

			this.stack.extend([(_time) => {
				if (parseInt(_time.ticks / 60) > _time.time)
					_time.time = parseInt(_time.ticks / 60)
			}])

			this.layer.draw()
			opt.callback(this)
		})
	}

	update() {
		this.stack.forEach( (f) => f(this._time))
	}
}
