class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('pfish', './assets/greenpinfish.png');
        this.load.image('shark', './assets/shark.png');
        this.load.image('trash', './assets/bag.png');
        this.load.image('background', './assets/oceanbackground.png');
        this.load.image('can', './assets/can.png');

        this.load.audio('music', './assets/music.wav');

        //spritesheets
        this.load.spritesheet('sharkChomp', './assets/sharkani.png', {frameWidth: 128, frameHeight: 96, startFrame: 0, endFrame: 4});
        this.load.spritesheet('damage', './assets/fishhurt.png', {frameWidth: 59, frameHeight: 64, startFrame: 0, endFrame: 4});
    }

    create(){

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#38939d',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // place tile sprite
        this.ocean = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        //create player and obstacles

        //create fish
        this.p1Fish = new Fish(this, game.config.width/3 + 25, game.config.height/2, 'pfish').setOrigin(0.5, 0.5)
        //create shark
        this.shark = new Shark(this, -60, game.config.height/2, 'shark').setOrigin(0, 0.5)
        //create trash
        this.trash01 = new Trash(this, game.config.width, game.config.height/2, 'trash').setOrigin(0.5, 0.5);
        this.trash02 = new Trash(this, game.config.width, game.config.height/4, 'trash').setOrigin(0.5, 0.5);

        this.clock = this.time.delayedCall(15000, () => {
            this.trash03 = new Trash(this, game.config.width, game.config.height/3, 'can').setOrigin(0.5, 0.5);
            three = true;
        }, null, this);


        var music = this.sound.add('music');
        music.setLoop(true);
        music.play();


        //define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //config animations
        this.anims.create({
            key: 'hurt',
            frames: this.anims.generateFrameNumbers('damage', {start: 0, end: 4, first: 0}),
            frameRate: 12
        });
        this.anims.create({
            key: 'chomp',
            frames: this.anims.generateFrameNumbers('sharkChomp', {start: 0, end: 4, first: 0}),
            frameRate: 12
        });

        this.p1Score = 0;
        this.timer = 0;

        // GAME OVER flag
        this.gameOver = false;

        this.score = this.add.text(0, 0, this.p1Score, scoreConfig);
        
    }


    update(time, delta){
        this.timer += delta;
        while (this.timer > 1000 && !this.gameOver) {
            this.p1Score += 1;
            this.score.text = this.p1Score;
            this.timer -= 1000;
        }
        if(this.shark.x <= -15)
        {
            this.shark.x += 2;
        } else
        if (!this.gameOver) {     
            this.ocean.tilePositionX += 4;          
            this.p1Fish.update();         // update fish
            this.trash01.update(); 
            this.trash02.update(); 
            if(three)
            {
                this.trash03.update(); 
                if(this.checkCollision(this.p1Fish, this.trash03)){
                    this.p1Fish.recoil();
                    this.fishHurt(this.p1Fish);
                    this.trash03.reset();
                }
            }
            if(this.shark.y != this.p1Fish.y)
            {
                this.shark.y = this.p1Fish.y;
            }
            //shark's following delay

            if(this.checkCollision(this.p1Fish, this.trash01)){
                this.p1Fish.recoil();
                this.fishHurt(this.p1Fish);
                this.trash01.reset();
            }
            if(this.checkCollision(this.p1Fish, this.trash02)){
                this.p1Fish.recoil();
                this.fishHurt(this.p1Fish);
                this.trash02.reset();
            }
            if(this.checkCollision(this.p1Fish, this.shark)){
                //
                this.sharkBite(this.shark, this.p1Fish)
                this.gameOver = true
            }
        } else 
        {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER - Press ENTER to restart', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
            if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
                this.game.sound.stopAll();
                this.scene.restart();
            }
        }
    }

    checkCollision(player, enemy) {
        if (player.x < enemy.x + enemy.width && 
            player.x + player.width > enemy.x && 
            player.y < enemy.y + enemy.height &&
            player.height + player.y > enemy. y) {
                return true;
        } else {
            return false;
        }
    }



    fishHurt(fish){
        this.input.keyboard.enabled = false;
        // temporarily hide player
        fish.alpha = 0;                         
        // create explosion sprite at player position
        let pain = this.add.sprite(fish.x, fish.y, 'hurt').setOrigin(0.5, 0.5);
        pain.anims.play('hurt');
        pain.on('animationcomplete', () => {
            fish.alpha = 1;
            pain.destroy();
        });
        this.sound.play('movement');
        this.input.keyboard.enabled = true;
    }


    sharkBite(shark, fish){
            // temporarily hide player
            shark.alpha = 0;                         
            // create explosion sprite at player position
            let chomp = this.add.sprite(shark.x, shark.y, 'chomp').setOrigin(0, 0.5);
            chomp.anims.play('chomp');
            chomp.on('animationcomplete', () => {
                fish.alpha = 0;
                chomp.destroy();
            });
            this.sound.play('movement');
            shark.alpha = 1; 
    }




}