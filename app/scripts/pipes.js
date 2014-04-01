window.Pipe = (function() {
	var SPEED = 20;

	var Pipe = function(game, xpos) {
		this.game = game;
		this.xpos = xpos;
		
		this.bottomPipe = $(document.createElement('div'));
		this.bottomPipe.addClass("bottomPipe");
		game.el.append(this.bottomPipe);
		/*
		this.topPipe = $(document.createElement('div'));
		this.topPipe.addClass("topPipe");
		game.el.append(this.topPipe);
		*/
		this.pos = { x: xpos, y: 0 };
		this.randomizePipe();
	};
	
	Pipe.prototype.reset = function() {
		// Update UI
		this.pos.x = this.xpos;
	};

	Pipe.prototype.onFrame = function(delta) {
		//if(x is outside of frame){randomize and move pipe to right position}
		this.pos.x -= delta * SPEED;
		if(this.pos.x + 4.4 < 0) {
			this.pos.x = 103;
			//this.randomizePipe();
		}
		this.bottomPipe.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Pipe.prototype.randomizePipe = function() {

	};

	return Pipe;
})();