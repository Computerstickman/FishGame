class Tutorial extends Phaser.Scene {
    constructor(){
        super("tutorialScene");
    }

    preload(){
        this.load.image('pfish', './assets/bluepinfish.png');
        this.load.image('shark', './assets/redpinfish.png');
        this.load.image('trash', './assets/greenpinfish.png');
        this.load.image('background', './assets/background.png');
        this.load.image('controls', './assets/arrows.png');
        //key images
        //warning images
    }

    
    create(){
        // place tile sprite
        this.ocean = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        //create player and obstacles

        //create fish
        this.p1Fish = new Fish(this, 0, game.config.height/2, 'pfish').setOrigin(0.5, 0.5)
        //create shark
        //create shark
        //create any ui that goes on top

        this.clock = this.time.delayedCall(2000, () => {
            controls = this.add.sprite(game.config.width/3, game.config.height/2, 'controls');
        }, null, this);
        //define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //config animations

        this.p1Score = 0;

        //tutorial length
        this.clock = this.time.delayedCall(10000, () => {
            this.scene.start("playScene");
        }, null, this);
        
    }


    update(){
        this.ocean.tilePositionX += 4;   
        if(this.p1Fish.x <= game.config.width/3)
        {
            this.p1Fish.x += 2;
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP) || Phaser.Input.Keyboard.JustDown(keyDOWN))
        {
            controls.alpha = 0.0;
        }
        this.p1Fish.update(); 

            
        } 
    }


