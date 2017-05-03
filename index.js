let canvas = document.getElementById("canvas")
canvas.height = 900

let ctx = canvas.getContext("2d")

function createTrack(ctx, width, height) {
	const curbWidth = 35
	const curbHeight = 35

	// Draw a long rectangle
	// with "curbs" along side comprised of smaller red/white rectangles

	function track(ctx) {
		let targetX = ctx.canvas.width / (curbWidth * 2) + width
		let leftCurbX = targetX - curbWidth
		let rightCurbX = targetX + width

		ctx.fillStyle = "grey"
		ctx.fillRect(targetX, 0, width, height)

		let numberOfCurbs = Math.ceil(height / curbHeight)

		for (let i = 0; i < numberOfCurbs; i++) {
			// Draw left curb
			curb(ctx, leftCurbX, i * curbHeight, curbHeight, curbWidth, i % 2 == 0)

			// Draw right curb
			curb(ctx, rightCurbX, i * curbHeight, curbHeight, curbWidth, !(i % 2 == 0))
		}
	}

	function curb(ctx, x, y, w, h, even) {
		ctx.strokeStyle = "white"
		ctx.strokeRect(x, y, w, h)

		ctx.fillStyle = even ? "red" : "yellow"
		ctx.fillRect(x, y, w, h)
	}


	track(ctx)
}

function scene(ctx, height, width) {
		ctx.fillStyle = "green"
		ctx.fillRect(0, 0, height, width)

		return ctx
}


scene(ctx, 900, 900)
createTrack(ctx, 100, 900)
