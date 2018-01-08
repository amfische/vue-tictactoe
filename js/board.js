"use strict";

class Board {

	constructor() {
		this.winner = ''
		this.availableMoves = 9
		this.spaces = [
			new BoardSpace(1,3),
			new BoardSpace(2,3),
			new BoardSpace(3,3),
			new BoardSpace(1,2),
			new BoardSpace(2,2),
			new BoardSpace(3,2),
			new BoardSpace(1,1),
			new BoardSpace(2,1),
			new BoardSpace(3,1),
		]
	}

	reset() {
		this.spaces.forEach((e) => {
			e.occupied = false
			e.value = ''
		})
		this.availableMoves = 9
		this.winner = ''
	}

	update(square, marker) {
		this.spaces.forEach((e) => {
			if (e.x === square.x && e.y === square.y) {
				e.value = marker
				e.occupied = true
			}
		})
		this.availableMoves--
	}

	gameover() {
		let gameover = false;

		//check rows - [0,1,2] or [3,4,5] or [6,7,8]
		for (var r = 0; r <= 6; r += 3) {
			if (this.spaces[r].occupied && this.spaces[r].value === this.spaces[r+1].value && this.spaces[r+1].value === this.spaces[r+2].value) {
				gameover = true
				this.winner = this.spaces[r].value
			}
		}

		//check columns - [0,3,6] or [1,4,7] or [2,5,8]
		for (var c = 0; c <= 2; c++ ) {
			if (this.spaces[c].occupied && this.spaces[c].value === this.spaces[c+3].value && this.spaces[c+3].value === this.spaces[c+6].value) {
				gameover = true
				this.winner = this.spaces[c].value
			}
		}

		//check diaganols - [0,4,8] or [2,4,6]
		for (var d1 = 0, d2 = 4; d1 <= 2; d1 += 2, d2 -= 2) {
			if (this.spaces[d1].occupied && this.spaces[d1].value === this.spaces[d1+d2].value && this.spaces[d1+d2].value === this.spaces[d1+d2*2].value) {
				gameover = true
				this.winner = this.spaces[d1].value
			}
		}

		//check for draw
		if (this.availableMoves === 0 && this.winner === "") {
			gameover = true
			this.winner = "draw"
		}

		return gameover
	}

	score() {
		switch (this.winner) {
			//if X wins return positive score minus number of moves it took to win
			case 'X': 
				return 10 - this.availableMoves 
			//if X loses return negative score plus number of moves it took to lose
			case 'O': 
				return -10 + this.availableMoves 
			//return 0 points for a draw
			default: 
				return 0 
		}
	}

	displayWinner() {
		switch (this.winner) {
			case 'X':
				setTimeout(() => { alert("X is the winner!") }, 500)
				break
			case 'O':
				setTimeout(() => { alert("O is the winner!") }, 500)
				break
			case 'draw':
				setTimeout(() => { alert("Cats Game!") }, 500)
				break
		}
	}

}

