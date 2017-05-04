let canvas = document.getElementById("canvas")

let ctx = canvas.getContext("2d")

function timer() {
	let interval = 1000 / 60 // 60 FPS?

	let ret = {
		start: function() {
			window.requestAnimationFrame(ts => {
				if (this.callback) {
					this.callback(ts)
				}
				this.start()
			})
		},

		on: function(func) {
			this.callback = func
			return this
		}
	}

	return ret

}

function box(ctx, color, x, y, initWidth, height) {
	// Init a box at these coords
	return {
		update: (x, y, i) => {
			// horizontal af
			let width = initWidth
			let targetX = x + (i  * width)

			if (targetX > ctx.canvas.width) {
				let diff = targetX - ctx.canvas.width
				targetX = 0 - width + diff
			}
				
				


			ctx.fillStyle = color
			ctx.fillRect(targetX, y, width, height)
			
		}
	}
}

function scene(ctx, trackWidth) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

	// Create track
	let y = ctx.canvas.height * 0.35

	ctx.fillStyle = "grey"
	ctx.fillRect(0, y, ctx.canvas.width, trackWidth)

	return y
}


function animator(ctx, trackWidth, boxWidth) {
	let x = 0
	let y = scene(ctx, trackWidth)

	let numBoxes = ctx.canvas.width / boxWidth

	let boxes = []
	for (let i = 0; i < numBoxes; i++) {
		let even = i % 2 === 0 
		let color = even ? "red" : "white"
		boxes.push(box(ctx, color, x, y, boxWidth, boxWidth))
		//boxes.push(box(ctx, color, x, ctx.canvas.height - 10, 10, 10))
	}


	let cb = ts => {
		let y = scene(ctx, 100)
		boxes.forEach((b, i) => b.update(x, y, i))
		x+=1
		if (x > ctx.canvas.width) x = boxes.length * (-boxWidth)
	}

	timer().on(cb).start()
	

}

	

animator(ctx, 100, 30.75)


