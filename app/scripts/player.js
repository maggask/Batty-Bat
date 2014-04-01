window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var gravity = 0;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {
		var sprite = this.el.find('.Player-sprite');
		var move = sprite.find('.Player-move');
		
		if (Controls.keys.up || Controls.keys.space) {
			if(Controls.didJump){
				this.pos.y -= delta * SPEED;
				gravity = 0;

				if (!sprite.hasClass('rotUp')) {
					sprite.addClass('rotUp');
					sprite.removeClass('rotDown');
				}
				move.addClass('is-jumping');
			}		
		}
		else {
			move.removeClass('is-jumping');
		}

		if (!sprite.hasClass('rotUp')) {
			sprite.addClass('rotDown');
		}
		sprite.removeClass('rotUp');

		this.pos.y += (delta * SPEED/10) * gravity/2;

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(1) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');

		gravity++;
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 || 
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT_WITH_GROUND) {
			return this.game.gameover();
		}
	};

	return Player;
})();
