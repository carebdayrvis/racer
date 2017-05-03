let canvas = document.getElementById("canvas")
canvas.height = 900

let ctx = canvas.getContext("2d")

function track(ctx, lastDrawTime, speed) {
	const curbWidth = 35
	const curbHeight = 35

	// Draw only a certain amount relative to the speed and last draw time and now
	let timeDiff = Date.now() - lastDrawTime


	let width = 0.35 * ctx.canvas.width
	let height = ctx.canvas.height

	// Draw a long rectangle
	// with "curbs" along side comprised of smaller red/white rectangles

	let targetX = ctx.canvas.width / (curbWidth * 2) + width
	let leftCurbX = targetX - curbWidth
	let rightCurbX = targetX + width

	ctx.fillStyle = "grey"
	ctx.fillRect(targetX, 0, width, ctx.canvas.height)

	let numberOfCurbs = Math.ceil(height / curbHeight) + 1
	let y = 0


	for (let i = 0; i < numberOfCurbs; i++) {
		// Draw left curb
		curb(ctx, leftCurbX, y + (i * curbHeight), curbHeight, curbWidth, i % 2 == 0)

		// Draw right curb
		curb(ctx, rightCurbX, y + (i * curbHeight), curbHeight, curbWidth, !(i % 2 == 0))
	}

	function curb(ctx, x, y, w, h, even) {
		ctx.strokeStyle = "white"
		ctx.strokeRect(x, y, w, h)

		ctx.fillStyle = even ? "red" : "yellow"
		ctx.fillRect(x, y, w, h)
	}


}

function scene(ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		ctx.fillStyle = "green"
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

		return ctx
}

function timer() {
	let interval = 1000 / 60 // 60 FPS?

	let ret = {
		start: function() {
			let loop = setInterval(() => {
				window.requestAnimationFrame(ts => {
					if (this.callback) {
						this.callback(ts)
					}
				})
			}, interval)
		},

		on: function(func) {
			this.callback = func
			return this
		}
	}

	return ret

}
let lastTs = 0
timer().on(ts => track(scene(ctx), lastTs, 5)).start()
	


