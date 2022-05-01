class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        //preload menu assets and sound effects here
    }

    create(){
        //text config if applicable

        //menu text

        //define keys;
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

    }

    update(){

        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {
            //play enter sound
            //skips intro
        this.scene.start("playScene");
        }
    }

}