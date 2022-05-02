// ifsh prefab
class Fish extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.moveSpeed = 2;
    }

    update() {
        //up down movement
        if(keyUP.isDown && this.y < game.config.height){
            this.y -= this.moveSpeed;
        } else if (keyDOWN.isDown && this.y >= 0) {
            this.y += this.moveSpeed;
        }

    }





}