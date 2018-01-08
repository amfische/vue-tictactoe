new Vue({
	el: '.display',
	data: {
		board: new Board(),
		computer: new Player(),
		user: new Player(),
		symbol: '',
		start: false,
		startBtn: 'Start'
	},
	created() {
		this.computer.settings(this.board, this.user, true)
		this.user.settings(this.board, this.computer, false)
	},
	watch: {
		symbol(value) {
			this.user.setMarker(value)
			this.board.reset()
			this.start = false
			this.startBtn = 'Start'
		}
	},
	methods: {
		startGame() {
			if (this.symbol === '') {
				alert('Please choose a symbol')
			} else {
				this.start = true
				this.startBtn = 'Restart'
				this.board.reset()
				if (this.user.marker === 'X') {
					this.user.turn = true
				} else {
					this.computer.moveComputer()
				}
			}
		},
		occupySquare(square) {
			if (this.start && this.user.turn && !square.occupied) {
				this.board.update(square, this.symbol)
				if (!this.board.gameover()) {
					this.user.endTurn()
				} else {
					this.board.displayWinner()
				}
			} else {
				alert('Please choose a symbol and click start')
			}
		}
	}
})