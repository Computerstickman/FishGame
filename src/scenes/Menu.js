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
        keyENTER = this.input.keyboard.addKey(Phaser.Inpur.Keyboard.KeyCodes.ENTER)
    }

    update(){

        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {
            //play enter sound
        }
    }

}