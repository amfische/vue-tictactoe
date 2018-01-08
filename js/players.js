"use strict"

class Player {

	constructor() {
		this.board = {}
		this.opponent = {}
		this.marker = ''
		this.computer = false
		this.turn = false	
	}

	setMarker(value) {
		this.marker = value
		this.opponent.marker = value === 'X' ? 'O' : 'X'
	}

	settings(board, opponent, isComputer) {
		this.board = board
		this.opponent = opponent
		this.computer = isComputer
	}

	endTurn() {
		this.turn = false
		this.opponent.turn = true
		if (this.opponent.computer) {
			this.opponent.moveComputer()	
		}
	}

	checkForEndState() {
		if (this.board.gameover()) {
			this.board.displayWinner()
		} else {
			this.endTurn()
		}
	}

	availableMoves(state) {
		return state.spaces.filter(space => !space.occupied)
	}

	possibleStates(available, board) {
		return available.map((emptySquare) => {
			let nextState = new Board()

			//update new board object to current game state
			for (let i = 0; i < board.spaces.length; i++) {
				if (board.spaces[i].occupied) {
					nextState.spaces[i].occupied = true
					nextState.spaces[i].value = board.spaces[i].value
				}
			}

			//take a possible move on new board object
			nextState.spaces.forEach((e) => {
				if (e.x === emptySquare.x && e.y === emptySquare.y) {
					e.occupied = true
					e.value = board.availableMoves % 2 === 0 ? "O" : "X"
				}
			})

			nextState.availableMoves = board.availableMoves - 1
			return nextState
		})
	}

	minimax(state) {
		//check for terminal game state
		if (state.gameover()) {
			return state.score();
		} else {
			var marker = state.availableMoves % 2 === 0 ? "O" : "X";	//keep track of whose turn it is
			var stateScore;		// this stores the minimax value we'll compute
			if (marker === "X") {
				// X wants to maximize --> initialize to a value smaller than any possible score
				stateScore = -1000;
			} else {
				// O wants to minimize --> initialize to a value larger than any possible score
				stateScore = 1000;
			}			

			var availableMoves = this.availableMoves(state);
			var possibleBoardStates = this.possibleStates(availableMoves, state);		

			//calculate the minimax value for all available next states and evaluate the current state's value 
      possibleBoardStates.forEach((nextState) => {
        let nextScore = this.minimax(nextState)
        if(marker === "X") {
          // X wants to maximize --> update stateScore if nextScore is larger
          if(nextScore > stateScore)
            stateScore = nextScore
        }
        else {
          // O wants to minimize --> update stateScore if nextScore is smaller
          if(nextScore < stateScore)
            stateScore = nextScore
        }
      });
      return stateScore
		}
	}

	moveComputer() {
		let availableMoves = this.availableMoves(this.board);
		let possibleBoardStates = this.possibleStates(availableMoves, this.board);

		let stateValues = possibleBoardStates.map((state) => {
			return this.minimax(state)
		})

		//map minimax values with corresponding square
		for (var i = 0; i < availableMoves.length; i++) {
			stateValues[i] = [stateValues[i], availableMoves[i]]
		}

		//arrange values in ascending order
		stateValues.sort((a, b) => { return a[0] - b[0] })

		//If computer is 'X' play maximum value move, else play minimum value move
		if (this.marker === "X") {
			setTimeout(() => {
				this.board.update(stateValues[stateValues.length - 1][1], this.marker)
				this.checkForEndState()
			}, 1000)
		} else {
			setTimeout(() => {
				this.board.update(stateValues[0][1], this.marker)
				this.checkForEndState()
			}, 1000)
			
		}
	}
}
