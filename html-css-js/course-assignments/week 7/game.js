let game
let music

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: "#89CFF0",
        scale: {
            width: 900,
            height: 500,
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y: 0
                }
            }
        },
        scene: [TitleScreen, PlayGame]
        }
    game = new Phaser.Game(gameConfig)
    window.focus()
}

const gameOptions = {
    //duck stuff
    duckGravity: 800,
    duckSpeed: 500 ,
    duckJump: -450,
    //lemon stuff
    lemonSpeed: 500,
    lemonSpawnInterval: 2000,
    lemonScale: 0.3,
    //watermelon stuff
    watermelonSpeed: 0,
    watermelonSpawnInterval: 3000,
    watermelonScale: 0.22,
    //superseed stuff
    superSeedDuration: 20000,
    watermelons4superSeed: 20,
    superSeedSpeed: 700,
    superSeedScale: 0.05
}

class TitleScreen extends Phaser.Scene{

    preload() {
        this.load.image("title", "assets/title.png")
        this.load.image("rules", "assets/rules.png")
    }

    constructor() {
        super("TitleScreen")
    }

    create() {
        this.add.image(450, 250, "title")
        this.add.image(475, 250, "rules").setScale(0.14)
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    update() {
        if (this.enter.isDown) {
            this.scene.start("PlayGame")
        }
    }
}


class PlayGame extends Phaser.Scene {

    preload() {
        this.load.image("duck","assets/duck.png")
        this.load.image("superduck","assets/superduck.png")
        this.load.image("watermelon","assets/watermelon.png")
        this.load.image("lemon","assets/lemon.png")
        this.load.image("ground","assets/ground.png")
        this.load.image("superseed","assets/superseed.png")
        this.load.image("back","assets/back.png")
        this.load.image("superback","assets/superback.png")
        this.load.audio("music", "assets/music.mp3")
    }

    constructor() {
        super("PlayGame")
        this.lemonCounter = 0
        this.watermelonCounter = 0
    }

    create() {

        this.back = this.add.image(475, 250, "back")

        //ground stuff
        const ground = this.physics.add.staticGroup()
        ground.create(300, 1000, "ground").setScale(1).refreshBody()
    
        //duck stuff
        this.duck = this.physics.add.image(475, 375, "duck").setScale(0.42)
        this.duck.body.gravity.y = gameOptions.duckGravity
        this.duck.setBounce(0.2)
        this.duck.setCollideWorldBounds(true)

        this.physics.add.collider(this.duck, ground)

        //lemon stuff
        this.lemonGroup = this.physics.add.group()
        this.physics.add.collider(this.lemonGroup, ground, this.lemonHitGround, null, this)
        this.physics.add.overlap(this.duck, this.lemonGroup, this.duckHitLemon, null, this)
        this.time.addEvent({
            delay: gameOptions.lemonSpawnInterval,
            callback: this.spawnLemon,
            callbackScope: this,
            loop: true
        })

        this.add.image(16,16, "lemon").setScale(0.1)
        this.lemonText = this.add.text(32,6,"0", {fontSize: "24px", fill:"#000000"})
    
        //watermelon stuff
        this.watermelonGroup = this.physics.add.group()
        this.physics.add.overlap(this.duck, this.watermelonGroup, this.duckGotWatermelon, null, this)
        this.time.addEvent({
            delay: gameOptions.watermelonSpawnInterval,
            callback: this.spawnWatermelon,
            callbackScope: this,
            loop: true
        })

        this.add.image(16,48, "watermelon").setScale(0.1)
        this.watermelonText = this.add.text(32,36,"0", {fontSize: "24px", fill:"#000000"})

        this.watermelonSpawning = true

        //music stuff
        if(!this.sound.get("music")) {
            this.music = this.sound.add("music",{
                loop: true
            })
            this.music.play()
        }

        //superseed stuff
        this.seedGroup = this.physics.add.group()
        this.physics.add.overlap(this.seedGroup, this.lemonGroup, this.seedHitLemon, null, this)
        
        this.superSeedActivate = false

        this.timerText = this.add.text(850,6,"",{fontSize:"42px", fill:"000000"}).setOrigin(0.5,0)
        this.timerText.setVisible(false)
    }

    update() {

        this.duck.setVelocityX(0)

        this.cursors = this.input.keyboard.createCursorKeys()
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        
        if (this.cursors.left.isDown) {
            this.duck.setVelocityX(-gameOptions.duckSpeed)
            this.duck.flipX = false
        } else if (this.cursors.right.isDown) {
            this.duck.setVelocityX(gameOptions.duckSpeed)
            this.duck.flipX = true
        } else {
            this.duck.body.velocity.x = 0
        }

        if (this.space.isDown && this.duck.body.touching.down) {
            this.duck.setVelocityY(gameOptions.duckJump)
        }

        if (this.superSeedActivate && Phaser.Input.Keyboard.JustDown(this.s)) {
            this.shootSeed()
        }
    }

    //lemon stuff
    spawnLemon() {
        const x = Phaser.Math.Between(0, this.scale.width)
        const lemon = this.lemonGroup.create(x, 0, "lemon").setScale(gameOptions.lemonScale)
        lemon.setVelocityY(gameOptions.lemonSpeed)
        lemon.setCollideWorldBounds(true)
        lemon.setBounce(0.5)
    }

    lemonHitGround(lemon, ground) {
        lemon.destroy()
        this.lemonCounter += 1
        this.lemonText.setText(this.lemonCounter)
    }

    duckHitLemon(duck, lemon) {
        this.scene.restart()
        this.lemonCounter = 0
        this.watermelonCounter = 0
    }

    //watermelon stuff
    spawnWatermelon() {
        if(this.watermelonSpawning) {
        const x = Phaser.Math.Between(0, this.scale.width)
        const watermelon = this.watermelonGroup.create(x,300,"watermelon").setScale(gameOptions.watermelonScale)
        watermelon.setVelocityY(gameOptions.watermelonSpeed)
        watermelon.setCollideWorldBounds(true)
        watermelon.setBounce(0.5)
        }
    }

    duckGotWatermelon(duck, watermelon) {
        watermelon.destroy()
        this.watermelonCounter += 1
        this.watermelonText.setText(this.watermelonCounter)

        if (this.watermelonCounter >= gameOptions.watermelons4superSeed && !this.superSeedActivate) {
            this.activateSuperSeed()
        }
    }

    //superseed stuff
    activateSuperSeed() {
        this.superSeedActivate = true
        this.back.setTexture("superback")
        this.duck.setTexture("superduck")
        this.duck.setScale(0.42)
        this.watermelonCounter = 0
        this.watermelonSpawning = false
        this.timer = gameOptions.superSeedDuration / 1000
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        })
        this.timerText.setVisible(true)
        this.time.delayedCall(gameOptions.superSeedDuration, this.deactivateSuperSeed, [], this)
    }

    updateTimer() {
        this.timer -= 1
        this.timerText.setText("•" + this.timer + "•")
    }

    deactivateSuperSeed() {
        this.superSeedActivate = false
        this.back.setTexture("back")
        this.duck.setTexture("duck")
        this.duck.setScale(0.42)
        this.watermelonCounter = 0
        this.watermelonSpawning = true
        this.timerText.setVisible(false)
        this.watermelonText.setText(this.watermelonCounter)
    }

    shootSeed() {
        const seed = this.seedGroup.create(this.duck.x, this.duck.y, "superseed").setScale(gameOptions.superSeedScale)
        seed.setVelocityY(-gameOptions.superSeedSpeed)
        seed.setBounce(0.5)
        
    }

    seedHitLemon(seed, lemon) {
        seed.destroy()
        lemon.destroy()
    }
}