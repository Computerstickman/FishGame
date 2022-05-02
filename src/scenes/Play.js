class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('pfish', './assets/bluepinfish.png');
        this.load.image('shark', './assets/redpinfish.png');
        this.load.image('trash', './assets/greenpinfish.png');
        this.load.image('background', './assets/background.png');
    }

    create(){
        // place tile sprite
        this.ocean = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        //create player and obstacles

        //create fish
        this.p1Fish = new Fish(this, game.config.width/3, game.config.height/2, 'pfish').setOrigin(0.5, 0.5)
        //create shark
        this.shark = new Shark(this, game.config.width * 0.05, game.config.height/2, 'shark').setOrigin(0.5, 0.5)
        //create any ui that goes on top

        //define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //config animations

        this.p1Score = 0;

        // GAME OVER flag
        this.gameOver = false;
        
    }


    update(){
        if (!this.gameOver) {     
            this.ocean.tilePositionX += 4;          
            this.p1Fish.update();         // update fish

            if(this.shark.y != this.p1Fish.y)
            {
                this.shark.y = this.p1Fish.y;
            }
            //shark's following delay



            //this.ship01.update();           // update spaceships (x3)
            //this.ship02.update();
            //this.ship03.update();
        } 
    }


}