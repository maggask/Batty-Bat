window.Pipe = (function() {

	var Pipe = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};
	
	Pipe.prototype.create = function() {
		
	};

	Player.prototype.onFrame = function(delta) {
		
		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};
})();
