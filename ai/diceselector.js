module.exports = {
	execute: (gameId,games,calculator) => {
		let index = games.map((o) => {
      return o.gameId;
    }).indexOf(gameId);
    let selected = [false,false,false,false,false];
    let calculatedTable = calculator.calculate(games[index].dice);

    // If there is a yatzy, straight or full house, keep all the dice.
    const keepAll=['yatzy','smallStraight','largeStraight','fullHouse'];
    for (let keep of keepAll) {
	    if (calculatedTable[keep]>0 && games[index].gameTable[keep+'Done']==false) {
	    	selected = [true,true,true,true,true];
	    	return selected;
	    }
  	}

  	// If all dice values are unique, go for straight.
  	if (calculatedTable.ones<=1
  		&& calculatedTable.twos<=2
  		&& calculatedTable.threes<=3
  		&& calculatedTable.fours<=4
  		&& calculatedTable.fives<=5
  		&& calculatedTable.sixes<=6) {

  		// Go for large straight.
  		if (games[index].gameTable.largeStraightDone==false) {
  			for (let [diceIndex,value] of games[index].dice.entries()) {
  				if (value==1) {
  					selected = [true,true,true,true,true];
  					selected[diceIndex] = false;
  					return selected;
  				}
  			}
  		}

  		// Go for small straight.
  		if (games[index].gameTable.smallStraightDone==false) {
  			for (let [diceIndex,value] of games[index].dice.entries()) {
  				if (value==6) {
  					selected = [true,true,true,true,true];
  					selected[diceIndex] = false;
  					return selected;
  				}
  			}
  		}
  	}

  	// If there are two pairs, aim for full house.
		if (calculatedTable.twoPairs>0 && games[index].gameTable.fullHouseDone==false) {
			for( var i = 0; i < games[index].dice.length; i++ ) {
        if( games[index].dice.indexOf( games[index].dice[i], games[index].dice.indexOf( games[index].dice[i] ) + 1 ) == -1 ) {
        	for (let [diceIndex,value] of games[index].dice.entries()) {
	  				if (value==games[index].dice[i]) {
	  					selected = [true,true,true,true,true];
	  					selected[diceIndex] = false;
	  					return selected;
	  				}
  				}	
        }   
    	}
		}

		// If there are two or more singles, aim for singles.
		const keepSingles=[
			{name:'sixes',value:30,diceValue:6},
			{name:'fives',value:25,diceValue:5},
			{name:'fours',value:20,diceValue:4},
			{name:'threes',value:15,diceValue:3},
			{name:'twos',value:10,diceValue:2},
			{name:'ones',value:5,diceValue:1},
			{name:'sixes',value:24,diceValue:6},
			{name:'fives',value:20,diceValue:5},
			{name:'fours',value:16,diceValue:4},
			{name:'threes',value:12,diceValue:3},
			{name:'twos',value:8,diceValue:2},
			{name:'ones',value:4,diceValue:1},
			{name:'sixes',value:18,diceValue:6},
			{name:'fives',value:15,diceValue:5},
			{name:'fours',value:12,diceValue:4},
			{name:'threes',value:9,diceValue:3},
			{name:'twos',value:6,diceValue:2},
			{name:'ones',value:3,diceValue:1},
			{name:'sixes',value:12,diceValue:6},
			{name:'fives',value:10,diceValue:5},
			{name:'fours',value:8,diceValue:4},
			{name:'threes',value:6,diceValue:3},
			{name:'twos',value:4,diceValue:2},
			{name:'ones',value:2,diceValue:1}
			];
		for (let keep of keepSingles) {
			if (calculatedTable[keep.name]>=keep.value && games[index].gameTable[keep.name+'Done']==false) {
				for (let [diceIndex,value] of games[index].dice.entries()) {
					if (value==keep.diceValue) {
						selected[diceIndex] = true;
					}
				}
				return selected;
			}
		}

		// Try to get as much the same dice result as possible.
		if (games[index].gameTable.onePairDone==false
			|| games[index].gameTable.twoPairsDone==false
			|| games[index].gameTable.threeOfAKindDone==false
			|| games[index].gameTable.fourOfAKindDone==false
			|| games[index].gameTable.fullHouseDone==false
			|| games[index].gameTable.yatzyDone==false) {
			const keepSame=[
				{name:'sixes',value:30,diceValue:6},
				{name:'fives',value:25,diceValue:5},
				{name:'fours',value:20,diceValue:4},
				{name:'threes',value:15,diceValue:3},
				{name:'twos',value:10,diceValue:2},
				{name:'ones',value:5,diceValue:1},
				{name:'sixes',value:24,diceValue:6},
				{name:'fives',value:20,diceValue:5},
				{name:'fours',value:16,diceValue:4},
				{name:'threes',value:12,diceValue:3},
				{name:'twos',value:8,diceValue:2},
				{name:'ones',value:4,diceValue:1},
				{name:'sixes',value:18,diceValue:6},
				{name:'fives',value:15,diceValue:5},
				{name:'fours',value:12,diceValue:4},
				{name:'threes',value:9,diceValue:3},
				{name:'twos',value:6,diceValue:2},
				{name:'ones',value:3,diceValue:1},
				{name:'sixes',value:12,diceValue:6},
				{name:'fives',value:10,diceValue:5},
				{name:'fours',value:8,diceValue:4},
				{name:'threes',value:6,diceValue:3},
				{name:'twos',value:4,diceValue:2},
				{name:'ones',value:2,diceValue:1},
				{name:'sixes',value:6,diceValue:6},
				{name:'fives',value:5,diceValue:5},
				{name:'fours',value:4,diceValue:4},
				{name:'threes',value:3,diceValue:3},
				{name:'twos',value:2,diceValue:2},
				{name:'ones',value:1,diceValue:1}
				];
			for (let keep of keepSame) {
				if (calculatedTable[keep.name]>=keep.value) {
					for (let [diceIndex,value] of games[index].dice.entries()) {
						if (value==keep.diceValue) {
							selected[diceIndex] = true;
						}
					}
					return selected;
				}
			}
		}

		// Aim for large straight if that has not been added yet at this point.
		if (games[index].gameTable.largeStraightDone==false) {
			for( var i = 0; i < games[index].dice.length; i++ ) {
        if( games[index].dice.indexOf( games[index].dice[i], games[index].dice.indexOf( games[index].dice[i] ) + 1 ) == -1 ) {
        	for (let [diceIndex,value] of games[index].dice.entries()) {
	  				if (value==games[index].dice[i]) {
	  					selected[diceIndex] = true;
	  				}
	  				if (value==1) {
	  					selected[diceIndex] = false;
	  				}
  				}	
        }   
    	}
    	return selected;
		}

		// Aim for small straight if that has not been added yet at this point.
		if (games[index].gameTable.smallStraightDone==false) {
			for( var i = 0; i < games[index].dice.length; i++ ) {
        if( games[index].dice.indexOf( games[index].dice[i], games[index].dice.indexOf( games[index].dice[i] ) + 1 ) == -1 ) {
        	for (let [diceIndex,value] of games[index].dice.entries()) {
	  				if (value==games[index].dice[i]) {
	  					selected[diceIndex] = true;
	  				}
	  				if (value==6) {
	  					selected[diceIndex] = false;
	  				}
  				}	
        }   
    	}
    	return selected;
		}

		// Try to get as big chance as possible.
		if (games[index].gameTable.chanceDone==false) {
			for( var i = 0; i < games[index].dice.length; i++ ) {
        	for (let [diceIndex,value] of games[index].dice.entries()) {
	  				if (value>=4) {
	  					selected[diceIndex] = true;
	  				}
        }   
    	}
    	return selected;
		}

		// If there are still singles left at this point, aim for those.
		const keepDesperateSingles=[
			{name:'sixes',diceValue:6},
			{name:'fives',diceValue:5},
			{name:'fours',diceValue:4},
			{name:'threes',diceValue:3},
			{name:'twos',diceValue:2},
			{name:'ones',diceValue:1}
			];
		for (let keep of keepDesperateSingles) {
			if (games[index].gameTable[keep.name+'Done']==false) {
				for (let [diceIndex,value] of games[index].dice.entries()) {
					if (value==keep.diceValue) {
						selected[diceIndex] = true;
					}
				}
				return selected;
			}
		}
	}
};