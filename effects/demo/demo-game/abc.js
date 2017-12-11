// pages/draw/draw.js
Page({
	data: {
		x: 0,
		y: 0,
		hidden: true,
		width: 320,
		height: 500,
		gloop: 0,
		points: 0,
		state: true,
		ctx: wx.createCanvasContext('jump'),
		howManyCircles: 10,
		circles: [],
		nrOfPlatforms: 7,
		platforms: [],
		platformWidth: 70,
		platformHeight: 20
	},
	clear: function () {
		this.ctx.fillStyle = '#d0e7f9';
		this.ctx.clearRect(0, 0, width, height);
		this.ctx.beginPath();
		this.ctx.rect(0, 0, width, height);
		this.ctx.closePath();
		this.ctx.fill();
	},
	DrawCircles: function () {
		for (var i = 0; i < this.data.howManyCircles; i++) {
			ctx.fillStyle = 'rgba(255, 255, 255, ' + this.data.circles[i][3] + ')';
			ctx.beginPath();
			ctx.arc(this.data.circles[i][0], this.data.circles[i][1], this.data.circles[i][2], 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
		}
	},
	MoveCircles: function (e) {
		for (var i = 0; i < this.data.howManyCircles; i++) {
			if (this.data.circles[i][1] - this.data.circles[i][2] > height) {
				this.data.circles[i][0] = Math.random() * width;
				this.data.circles[i][2] = Math.random() * 100;
				this.data.circles[i][1] = 0 - this.data.circles[i][2];
				this.data.circles[i][3] = Math.random() / 2;
			}
			else {
				circles[i][1] += e;
			}
		}
	},
	player: new (function () {
		var that = this;
		that.image = new Image();

		that.image.src = "angel.png"
		that.width = 65;
		that.height = 95;
		that.frames = 1;
		that.actualFrame = 0;
		that.X = 0;
		that.Y = 0;

		that.isJumping = false;
		that.isFalling = false;
		that.jumpSpeed = 0;
		that.fallSpeed = 0;

		that.jump = function () {
			if (!that.isJumping && !that.isFalling) {
				that.fallSpeed = 0;
				that.isJumping = true;
				that.jumpSpeed = 17;
			}
		}

		that.checkJump = function () {
			//a lot of changes here

			if (that.Y > height * 0.4) {
				that.setPosition(that.X, that.Y - that.jumpSpeed);
			}
			else {
				if (that.jumpSpeed > 10)
					points++;
				// if player is in mid of the gamescreen
				// dont move player up, move obstacles down instead
				MoveCircles(that.jumpSpeed * 0.5);

				platforms.forEach(function (platform, ind) {
					platform.y += that.jumpSpeed;

					if (platform.y > height) {
						var type = ~~(Math.random() * 5);
						if (type == 0)
							type = 1;
						else
							type = 0;

						platforms[ind] = new Platform(Math.random() * (width - platformWidth), platform.y - height, type);
					}
				});
			}
			that.jumpSpeed--;
			if (that.jumpSpeed == 0) {
				that.isJumping = false;
				that.isFalling = true;
				that.fallSpeed = 1;
			}

		}

		that.fallStop = function () {
			that.isFalling = false;
			that.fallSpeed = 0;
			that.jump();
		}

		that.checkFall = function () {
			if (that.Y < height - that.height) {
				that.setPosition(that.X, that.Y + that.fallSpeed);
				that.fallSpeed++;
			} else {
				if (points == 0)
					that.fallStop();
				else
					GameOver();
			}
		}

		that.moveLeft = function () {
			if (that.X > 0) {
				that.setPosition(that.X - 5, that.Y);
			}
		}

		that.moveRight = function () {
			if (that.X + that.width < width) {
				that.setPosition(that.X + 5, that.Y);
			}
		}


		that.setPosition = function (x, y) {
			that.X = x;
			that.Y = y;
		}

		that.interval = 0;
		that.draw = function () {
			try {
				ctx.drawImage(that.image, 0, that.height * that.actualFrame, that.width, that.height, that.X, that.Y, that.width, that.height);
			}
			catch (e) {
			};

			if (that.interval == 4) {
				if (that.actualFrame == that.frames) {
					that.actualFrame = 0;
				}
				else {
					that.actualFrame++;
				}
				that.interval = 0;
			}
			that.interval++;
		}
	})(),
	Platform: function (x, y, type) {
		var that = this;

		that.firstColor = '#FF8C00';
		that.secondColor = '#EEEE00';
		that.onCollide = function () {
			player.fallStop();
		};

		if (type === 1) {
			that.firstColor = '#AADD00';
			that.secondColor = '#698B22';
			that.onCollide = function () {
				player.fallStop();
				player.jumpSpeed = 50;
			};
		}
		that.x = ~~x;
		that.y = y;
		that.type = type;

		//NEW IN PART 5
		that.isMoving = ~~(Math.random() * 2);
		that.direction = ~~(Math.random() * 2) ? -1 : 1;

		that.draw = function () {
			ctx.fillStyle = 'rgba(255, 255, 255, 1)';
			var gradient = ctx.createRadialGradient(that.x + (platformWidth / 2), that.y + (platformHeight / 2), 5, that.x + (platformWidth / 2), that.y + (platformHeight / 2), 45);
			gradient.addColorStop(0, that.firstColor);
			gradient.addColorStop(1, that.secondColor);
			ctx.fillStyle = gradient;
			ctx.fillRect(that.x, that.y, platformWidth, platformHeight);
		};

		return that;
	},

	start: function (e) {
		for (var i = 0; i < this.data.howManyCircles; i++)
			this.data.circles.push([Math.random() * this.width, Math.random() * this.height, Math.random() * 100, Math.random() / 2]);
		console.log(this.data.circle)
		// this.player.setPosition(~~((width-player.width)/2), height - player.height);
		// this.player.jump();
		GameLoop();
		this.setData({
			hidden: false,
			x: e.touches[0].x,
			y: e.touches[0].y
		})
	},
	generatePlatforms: function () {
		var position = 0, type;
		for (var i = 0; i < nrOfPlatforms; i++) {
			type = ~~(Math.random() * 5);
			if (type == 0)
				type = 1;
			else
				type = 0;
			platforms[i] = new Platform(Math.random() * (width - platformWidth), position, type);
			if (position < height - platformHeight)
				position += ~~(height / nrOfPlatforms);
		}
	} (),
	checkCollision: function () {
		platforms.forEach(function (e, ind) {
			if (
				(player.isFalling) &&
				(player.X < e.x + platformWidth) &&
				(player.X + player.width > e.x) &&
				(player.Y + player.height > e.y) &&
				(player.Y + player.height < e.y + platformHeight)
			) {
				e.onCollide();
			}
		})
	},
	GameLoop: function () {
		clear();
		//MoveCircles(5);
		DrawCircles();

		if (player.isJumping) player.checkJump();
		if (player.isFalling) player.checkFall();

		player.draw();

		platforms.forEach(function (platform, index) {
			if (platform.isMoving) {
				if (platform.x < 0) {
					platform.direction = 1;
				} else if (platform.x > width - platformWidth) {
					platform.direction = -1;
				}
				platform.x += platform.direction * (index / 2) * ~~(points / 100);
			}
			platform.draw();
		});

		checkCollision();

		ctx.fillStyle = "Black";
		ctx.fillText("POINTS:" + points, 10, height - 10);

		if (state)
			gLoop = setTimeout(GameLoop, 1000 / 50);
	},
	GameOver: function () {
		state = false;
		clearTimeout(gLoop);
		setTimeout(function () {
			clear();
			ctx.fillStyle = "Black";
			ctx.font = "10pt Arial";
			ctx.fillText("GAME OVER", width / 2 - 60, height / 2 - 50);
			ctx.fillText("YOUR RESULT:" + points, width / 2 - 60, height / 2 - 30);
		}, 100);

	},
	move: function (e) {
		this.setData({
			x: e.touches[0].x,
			y: e.touches[0].y
		})
		if (player.X + c.offsetLeft > e.pageX) {
			player.moveLeft();
		} else if (player.X + c.offsetLeft < e.pageX) {
			player.moveRight();
		}
	},
	end: function (e) {
		this.setData({
			hidden: true
		})
	}
})
