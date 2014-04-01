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
		this.topPipePos = 0;
		this.botPipePos = 28.5;
		this.randomizePipe();
	};

	Pipe.prototype.reset = function() {
		// Update UI
		this.pos.x = this.xpos;
	};

	Pipe.prototype.randomizePipe = function() {
		var number = Math.random() * 25 + 10;
		this.topPipePos = number - 50;
		this.botPipePos = number + 12;

	};

	Pipe.prototype.onFrame = function(delta) {
		this.pos.x = this.pos.x - 0.3;
		this.collision();
		if(this.pos.x + 4.4 < 0) {
			this.pos.x = 111;
			this.randomizePipe();
		}
		this.topPipe.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.topPipePos + 'em, 0em)');
		this.bottomPipe.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.botPipePos + 'em, 0em)');
	};

	Pipe.prototype.collision = function() {
		//console.log('player');
		//console.log(this.game.player.pos.y);
		//console.log('pipe')
		//console.log(this.botPipePos);
		if (((this.pos.x === 36) && ((this.botPipePos + 100) > this.game.player.pos.y)) /*|| 
			((this.pos.x < 36) && (this.topPipePos > this.game.player.pos.y))*/ ) {
			return this.game.gameover();
		}
	};

	return Pipe;
})();