import Phaser from "phaser";
import "./style.css";

class NinjaScene extends Phaser.Scene {
  ninja!: Phaser.Physics.Arcade.Sprite;
  keys!: {
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    attack: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super("NinjaScene");
  }

  preload() {
    this.load.image("ninja_idle", "/sprites/ninja/idle.png");
    this.load.image("ninja_walk", "/sprites/ninja/walk.png");
    this.load.image("ninja_attack", "/sprites/ninja/attack.png");
    this.load.image("ninja_hit", "/sprites/ninja/hit.png");
    this.load.image("ninja_death", "/sprites/ninja/death.png");
  }

  create() {
    this.cameras.main.setBackgroundColor("#151515");

    this.add.text(400, 35, "NINJA ANIMATION TEST", {
      fontSize: "30px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(400, 75, "A / D = Walk    SPACE = Attack", {
      fontSize: "18px",
      color: "#aaaaaa"
    }).setOrigin(0.5);

    this.add.rectangle(400, 550, 800, 10, 0x555555);

    this.ninja = this.physics.add.sprite(
      400,
      500,
      "ninja_idle"
    );

    this.ninja.setScale(0.35);
    this.ninja.setCollideWorldBounds(true);

    this.keys = {
      left: this.input.keyboard!.addKey(
        Phaser.Input.Keyboard.KeyCodes.A
      ),
      right: this.input.keyboard!.addKey(
        Phaser.Input.Keyboard.KeyCodes.D
      ),
      attack: this.input.keyboard!.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      )
    };
  }

  update() {
    if (this.keys.left.isDown) {
      this.ninja.setVelocityX(-180);
      this.ninja.setFlipX(true);
      this.ninja.setTexture("ninja_walk");
    }
    else if (this.keys.right.isDown) {
      this.ninja.setVelocityX(180);
      this.ninja.setFlipX(false);
      this.ninja.setTexture("ninja_walk");
    }
    else {
      this.ninja.setVelocityX(0);
      this.ninja.setTexture("ninja_idle");
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.keys.attack)
    ) {
      this.attack();
    }
  }

  attack() {
    this.ninja.setTexture("ninja_attack");

    this.time.delayedCall(300, () => {
      if (this.ninja.active) {
        this.ninja.setTexture("ninja_idle");
      }
    });
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game",

  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },

  scene: NinjaScene
};

new Phaser.Game(config);
