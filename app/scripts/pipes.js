window.Pipe = (function() {
	var Player = window.Player;
	
	var Pipe = function(game, xpos) {
		this.game = game;
		this.xpos = xpos;

		this.bottomPipe = $(document.createElement('div'));
		this.topPipe = $(document.createElement('div'));

		this.bottomPipe.addClass("Pipe");
		document.getElementById('AllPipes').appendChild(this.bottomPipe[0]);
		
		this.topPipe.addClass("Pipe");
		document.getElementById('AllPipes').appendChild(this.topPipe[0]);
		
		this.pos = { x: xpos, y: 0};

		// Potition of top and bottom pipe in gamecanvas
		this.topPipePos = 0;
		this.botPipePos = 28.5;

		this.randomizePipe();
	};

	Pipe.prototype.GAP_BETWEEN_PIPES = 15;
	Pipe.prototype.HEIGHT_OF_PIPE = 50;
	Pipe.prototype.WIDTH_OF_PIPE = 4.4;
	Pipe.prototype.STARTING_POINT_FOR_FIRST_PIPE = 111;

	Pipe.prototype.reset = function() {
		// Update UI
		this.pos.x = this.xpos;
	};

	Pipe.prototype.randomizePipe = function() {
		// Random number between 25 and 10
		var number = Math.random() * 25 + 10;
		this.topPipePos = number - this.HEIGHT_OF_PIPE;
		this.botPipePos = number + this.GAP_BETWEEN_PIPES;
	};

	Pipe.prototype.onFrame = function(delta) {
		this.pos.x = this.pos.x - 0.3;
		this.collision();
		// Check if pipe is out of bounds and then place it a 9 em's from the right possition of game canvas
		if(this.pos.x + this.WIDTH_OF_PIPE < 0) {
			this.pos.x = this.STARTING_POINT_FOR_FIRST_PIPE;
			this.randomizePipe();
		}
		this.topPipe.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.topPipePos + 'em, 0em)');
		this.bottomPipe.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.botPipePos + 'em, 0em)');
	};

	Pipe.prototype.collision = function() {
		var score = 0;
		//console.log(this.game.player.WIDTH);
		var player = this.game.player.pos; 
		var playerRadius = (player.HEIGHT + player.WIDTH) / 4;

		if (((this.pos.x - (this.WIDTH_OF_PIPE/2)) < (player.x + (this.game.player.WIDTH/2)))
			&& ((this.pos.x + (this.WIDTH_OF_PIPE/2)) > (player.x))
			&& ( ((this.topPipePos + (this.HEIGHT_OF_PIPE - 5)) > (player.y - (this.game.player.HEIGHT/2))) 
			|| ((this.botPipePos - 2) < (player.y + (this.game.player.HEIGHT/2))) )) {
			
			return this.game.gameover();	
		}
		else if (this.pos.x < this.game.player.pos.x) {
			score++;
		}
	};

	return Pipe;
})();