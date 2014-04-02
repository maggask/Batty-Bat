window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 40; // * 10 pixels per second.
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var gravity = 0;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	// Constants for height and width of the player.
	Player.prototype.WIDTH = 10;
	Player.prototype.HEIGHT = 8.9;
	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	// Player onFrame takes care of checking if a key is pressed, if so than
	// gravity is initialized to zero. Gravity is used to increment speed when falling.
	// Classes that take care of rotation are added to the player div and collision with
	// bounds is checked.
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
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');

		gravity++;
	};
	
	// Checkes for collision with bounds, checks where player is
	// according to world height with ceiling and with ground.
	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < this.game.WORLD_HEIGHT_WITH_CEILING || 
			this.pos.x + this.WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < this.game.WORLD_HEIGHT_WITH_CEILING ||
			this.pos.y + this.HEIGHT > this.game.WORLD_HEIGHT_WITH_GROUND) {
			return this.game.gameover();
		}
	};
	
	return Player;
})();
