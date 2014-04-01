var backgroundMusic = new Audio("music/Batman.mp3");
var backgroundMusic = new Audio("music/Batman.ogg");

window.Game = (function() {
	'use strict';
	//this.state = 0;
	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Controls = window.Controls;
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pipe = new Pipe(this, 100);
		this.pipe1 = new Pipe(this, 140);
		this.pipe2 = new Pipe(this, 180);

	
		this.isPlaying = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
		delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.pipe.onFrame(delta);
		this.pipe1.onFrame(delta);
		this.pipe2.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.pipe.reset();
		this.pipe1.reset();
		this.pipe2.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		var cloud = this.el.find('.Cloud');
		var cloud1 = this.el.find('.Cloud1');
		var cloud2 = this.el.find('.Cloud2');
		var cloud3 = this.el.find('.Cloud3');
		var cloud4 = this.el.find('.Cloud4');
		var cloud5 = this.el.find('.Cloud5');
		var ground = this.el.find('.Ground');
		var player = this.el.find('.Player-move');

		this.isPlaying = false;
		var deathSound = new Audio("music/Death.mp3");
		var deathSound = new Audio("music/Death.ogg");
		deathSound.volume = 0.3;
		deathSound.play();

		cloud.addClass('stop');
		cloud1.addClass('stop');
		cloud2.addClass('stop');
		cloud3.addClass('stop');
		cloud4.addClass('stop');
		cloud5.addClass('stop');
		ground.addClass('stop');
		player.addClass('stop');
		
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					cloud.removeClass('stop');
					cloud1.removeClass('stop');
					cloud2.removeClass('stop');
					cloud3.removeClass('stop');
					cloud4.removeClass('stop');
					cloud5.removeClass('stop');
					ground.removeClass('stop');
					player.removeClass('stop');
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;
	Game.prototype.WORLD_HEIGHT_WITH_GROUND = 48.2;

	return Game;
})();

$(document).ready(function() {

	function init() {
		console.log("init");
		$(".play").hide();
		backgroundMusic.volume = 0.2;
		backgroundMusic.play();
	}

	init();
});

backgroundMusic.addEventListener('ended', function(){
	this.currentTime = 0;
	this.play();
}, false);

console.log("click");
function play() {
	console.log("play");
	$(".play").hide();
	backgroundMusic.play();
	$(".mute").show();
}

function mute() {
	console.log("mute");
	$(".mute").hide();
	backgroundMusic.pause();
	$(".play").show();
}

$('.mute').on('click', mute );
$('.play').on('click', play );
