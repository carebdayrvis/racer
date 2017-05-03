let canvas = document.getElementById("canvas")
canvas.height = 900

let ctx = canvas.getContext("2d")

function track(ctx, yOffset) {
	const curbWidth = 35
	const curbHeight = 35

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
	for (let i = 0; i < numberOfCurbs; i++) {
		// Draw left curb
		let y = (i * curbHeight) - yOffset
		curb(ctx, leftCurbX, y, curbHeight, curbWidth, i % 2 == 0)

		// Draw right curb
		curb(ctx, rightCurbX, y, curbHeight, curbWidth, !(i % 2 == 0))
	}

	function curb(ctx, x, y, w, h, even) {
		ctx.strokeStyle = "white"
		ctx.strokeRect(x, y, w, h)

		ctx.fillStyle = even ? "red" : "white"
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
let offset = 35
let firstDraw = Date.now()
timer().on(ts => {
	offset--
	if (offset < 1) offset = 35
	track(scene(ctx), offset)
}).start()
	


