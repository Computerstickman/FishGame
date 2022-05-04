class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('pfish', './assets/greenpinfish.png');
        this.load.image('shark', './assets/shark.png');
        this.load.image('trash', './assets/bag.png');
        this.load.image('background', './assets/oceanbackground.png');

        //spritesheets
        this.load.spritesheet('sharkchomp', './assets/sharkani.png', {framewidth: 640, frameheight: 96, startframe: 0, endframe: 5});
        this.load.spritesheet('damage', './assets/fishhurt.png', {framewidth: 295, frameheight: 64, startframe: 0, endframe: 5});
    }

    create(){
        // place tile sprite
        this.ocean = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        //create player and obstacles

        //create fish
        this.p1Fish = new Fish(this, game.config.width/3, game.config.height/2, 'pfish').setOrigin(0.5, 0.5)
        //create shark
        this.shark = new Shark(this, game.config.width * 0.05, game.config.height/2, 'shark').setOrigin(0.5, 0.5)
        //create trash
        this.trash01 = new Trash(this, game.config.width, game.config.height/2, 'trash').setOrigin(0.5, 0.5);
        this.trash02 = new Trash(this, game.config.width, game.config.height/4, 'trash').setOrigin(0.5, 0.5);
        //create any ui that goes on top

        //define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //config animations
        this.anims.create({
            key: 'hurt',
            frames: this.anims.generateFrameNumbers('damage', {start: 0, end: 5, first: 0}),
            frameRate: 12
        });
        this.anims.create({
            key: 'chomps',
            frames: this.anims.generateFrameNumbers('sharkchomp', {start: 0, end: 5, first: 0}),
            frameRate: 12
        });

        this.p1Score = 0;

        // GAME OVER flag
        this.gameOver = false;
        
    }


    update(){
        if (!this.gameOver) {     
            this.ocean.tilePositionX += 4;          
            this.p1Fish.update();         // update fish
            this.trash01.update(); 
            this.trash02.update(); 

            if(this.shark.y != this.p1Fish.y)
            {
                this.shark.y = this.p1Fish.y;
            }
            //shark's following delay

            if(this.checkCollision(this.p1Fish, this.trash01)){
                this.p1Fish.recoil();
                this.trash01.reset();
            }
            if(this.checkCollision(this.p1Fish, this.trash02)){
                this.p1Fish.recoil();
                this.trash02.reset();
            }
            if(this.checkCollision(this.p1Fish, this.shark)){
                //
                this.gameOver = true
            }

            //this.enemy01.update();           // update spaceenemys (x3)
            //this.enemy02.update();
            //this.enemy03.update();
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

    fishhurt(p1Fish){
        // temporarily hide player
        p1Fish.alpha = 0;                         
        // create explosion sprite at player position
        let pain = this.add.sprite(p1Fish.x, p1Fish.y, 'hurt').setOrigin(0, 0);
        pain.anims.play('hurt');
        pain.on('animationcomplete', () => {
            p1Fish.reset();
            p1Fish.alpha = 1;
            pain.destroy();
        });
        // score add and repaint
        //this.p1Score += ship.points;
        //this.scoreLeft.text = this.p1Score;
        this.sound.play('damage');
    }

    sharkbite(shark){
        
    }




}