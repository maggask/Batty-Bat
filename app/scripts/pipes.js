window.Pipe = (function() {

	var Pipe = function(game, xpos) {
		this.game = game;
		this.xpos = xpos;
		
		this.bottomPipe = $(document.createElement('div'));
		this.bottomPipe.addClass("bottomPipe");
		game.el.append(this.bottomPipe);
		
		this.topPipe = $(document.createElement('div'));
		this.topPipe.addClass("topPipe");
		game.el.append(this.topPipe);
		
		//this.pos = { x: xpos, y: 0 };
	};
	
	Pipe.prototype.reset = function() {
		// Update UI
		this.bottomPipe.css('margin-left: ' + this.pos + 'em')
	};

	Pipe.prototype.onFrame = function() {
		//if(x is outside of frame){randomize and move pipe to right position}

		this.bottomPipe.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Pipe.prototype.randomizePipe = function() {

	};

	return Pipe;
})();