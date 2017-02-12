function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

Array.prototype.extend = function (other_array) {
    other_array.forEach( (v) => this.push(v) )
}

cropImage = function (e, x, y, name) {
	return new Promise( (res, rej) => {
		let container = document.createElement('div')
		let layer = new Konva.Layer()
		let stage = new Konva.Stage({
			container: container,
			width: 64,
			height: 64
		})

		stage.add(layer)
		layer.add( new Konva.Image({
			x: 0, y: 0,
			crop: {
				x: x * 64,
				y: y * 64,
				width: e.target.width,
				height: e.target.height
			},
			image: e.target
		}) )
		layer.draw()

		stage.toImage({
			callback: (e) => {
				localStorage.setItem(name, e.src)
				res(e)
			}
		})
	})
}

makeImage = function (item) {
	return new Promise( (res, rej) => {
		let imageObj = new Image();
		imageObj.onload = ((x, y) => (e) => {

			let name = e.target.src
			let defs = {
				'up':    { x:0, y:0 },
				'down':  { x:0, y:2 },
				'left':  { x:0, y:1 },
				'right': { x:0, y:3 }
			}

			let array = Object.keys(defs).map( (k,i) => {
					let n = name.match('\\w://([\.\\w_/]+)')[1] + '/' + k

					if (!localStorage.getItem(n)) {
						return( this.cropImage(e, defs[k].x, defs[k].y, n) )
					}
					else {
						return( new Promise( (res, rej) => {
							let i = new Image()
							i.onload = (e) => res(e.target)
							i.src = localStorage.getItem(n)
						}))
					}
			})

			Promise.all(array).then( (_) => {
				_ = Object.keys(defs).reduce( (p, k, i) => {
					p[k] = _[i]
					return p
				}, {})

				let i = new Konva.Image({
					_position: item.position,
					x: x - _[item.position].width / 2,
					y: y - _[item.position].height / 2 - 32,
					images: _,
					image: _[item.position]
				})
				res(i)
			})

		})(item.x, item.y)

		imageObj.src = item.image
	})
}

makeAttack = function (battlestage, attacker, defender) {
	let player = attacker
	let target = defender
	let hits = config.Number_of_Hits(player).left
	let hit_rate = config.Hit_Rate(player, target)
	let damages = config.Basic_Damage(player, target).left

	if (player.jobpoints)
		player.jobpoints( config.JP_Gain(player) )

	battlestage.add( new StackElem({
		text: `hits ${attacker.attrs.name}`,
		node: new Konva.Text({
			x: player.x(),
			y: player.y() - 32,
			text: hits > 1 ? hits + ' hits' : hits + ' hit',
			fontSize: 30,
			fontFamily: 'Calibri',
			fill: 'black'
		}),
		fun: function (frame) {
			this.time += frame.timeDiff
			if (this.time > 400) {
				this.destroy()
			}
		}
	}) )

	battlestage.add( new StackElem({
		text: `move ${attacker.attrs.name}`,
		fun: function (frame) {
			this.time += frame.timeDiff

			var dist = Math.cos(this.time / 30) * 10
			if (player.character.attrs._position == 'right')
				player.move({x: dist, y: 0})
			if (player.character.attrs._position == 'left')
				player.move({x: -dist, y: 0})

			if (this.time > 200) {
				player.replace()
				this.destroy()
			}
		}
	}) )

	let t_config = {
	  x: target.x() + 32 + Math.round(Math.random() * 40) - 20,
	  y: target.y() - 42,
	  text: damages,
	  fontSize: 30,
	  fontFamily: 'Calibri',
	  fill: 'green'
	}

	if ( hit_rate > getRandomInt(0, 100) ) {

		target.life(-damages)
		t_config.text = String(damages)
		if (damages <= 0)
			t_config.fill = 'grey'
		else
			t_config.fill = 'green'
	}
	else {
		t_config.text = 'miss'
		t_config.fill = 'red'

	}

	battlestage.add( new StackElem({
		text: `damage ${defender.attrs.name}`,
		node: new Konva.Text(t_config),
		fun: function (frame) {
			this.time += frame.timeDiff
			this.node.move({x: 0, y: -frame.timeDiff / 10})
			if (this.time > 400) {
				this.destroy()
			}
		}
	}) )

	player.attrs.ready = false
	player.actionJauge.reset()
}
