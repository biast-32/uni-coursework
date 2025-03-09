let game
let music

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: "#323232",
        scale: {
            width: 1920,
            height: 1080,
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
        scene: [TitleScreen, Level1, Level2, Level3, Level4, EndScreen]
    }
    game = new Phaser.Game(gameConfig)
    window.focus()
}

const gameOptions = {
    humanSpeed: 400,
    enemySpeed: 120,
    cardSpeed: 600
}

class TitleScreen extends Phaser.Scene {

    preload() {
        this.load.image("begining", "assets/bg/begining.png")
        this.load.audio("music", "assets/audio/music.mp3")
    }

    constructor() {
        super("TitleScreen")
    }

    create() {

        if(!this.sound.get("music")) {
            this.music = this.sound.add("music",{
                loop: true
            })
            this.music.play()
        }

        this.add.image(960, 540, "begining")
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    update() {
        if (this.enter.isDown) {
            this.scene.start("Level1")
        }
    }
}


class Level1 extends Phaser.Scene {

    preload() {
        this.load.image("background", "assets/bg/background.png")
        this.load.image("ground", "assets/bg/ground.png")
        this.load.image("wall", "assets/bg/wall.png")

        this.load.image("clubsCoin", "assets/coins/clubsCoin.png")

        this.load.image("clubsAce", "assets/aces/clubsAce.png")

        this.load.image("joker", "assets/other/joker.png")

        this.load.image("enemy", "assets/enemy/enemy.png")
        this.load.image("rabbit", "assets/enemy/rabbit.png")
        
        this.load.image("front", "assets/human/front.png")
        this.load.image("left", "assets/human/left.png")
        this.load.image("right", "assets/human/right.png")
        this.load.image("back", "assets/human/back.png")

        this.load.image("life", "assets/other/life.png")
        this.load.image("nolife", "assets/other/nolife.png")

        this.load.audio("getcoin", "assets/audio/getcoin.mp3")
        this.load.audio("throw", "assets/audio/throw.mp3")
        this.load.audio("getjoker", "assets/audio/getjoker.mp3")
        this.load.audio("tame", "assets/audio/tame.mp3")
        this.load.audio("bonk", "assets/audio/bonk.mp3")
        this.load.audio("lostlife", "assets/audio/lostlife.mp3")
        this.load.audio("gameover", "assets/audio/gameover.mp3")
        this.load.audio("nextlevel", "assets/audio/nextlevel.mp3")
    }

    constructor() {
        super("Level1")

        this.collectedCoins = 0
        this.tamedRabbits = 0

        this.enemyCounter = 0
        this.coinCounter = 0

        this.lives = 3
    }

    create() {

        this.back = this.add.image(960, 540, "background")

        this.getCoinSound = this.sound.add("getcoin")
        this.throwSound = this.sound.add("throw")
        this.getjokerSound = this.sound.add("getjoker")
        this.tameSound = this.sound.add("tame")
        this.bonkSound = this.sound.add("bonk")
        this.lostlifeSound = this.sound.add("lostlife")
        this.gameoverSound = this.sound.add("gameover")
        this.nextlevelSound = this.sound.add("nextlevel")

        this.groundGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        })

        this.human = this.physics.add.image(840, 170, "front").setScale(0.08)
        this.human.setCollideWorldBounds(true)

        this.coinGroup = this.physics.add.group({
            allowGravity: false
        })

        this.enemyGroup = this.physics.add.group({
            allowGravity: false
        })

        this.aceGroup = this.physics.add.group({
            allowGravity: false
        })

        this.jokerGroup = this.physics.add.group({
            allowGravity: false
        })

        this.add.image(40,36, "rabbit").setScale(0.04).setFlipX(true)
        this.rabbitText = this.add.text(80,18,"0", {fontSize: "48px", fill: "#000000"})

        this.add.image(180,36, "clubsCoin").setScale(0.04)
        this.coinText = this.add.text(222,18,"0", {fontSize: "48px", fill: "#000000"})

        this.life1 = this.add.image(1760, 36, "life").setScale(0.04)
        this.life2 = this.add.image(1820, 36, "life").setScale(0.04)
        this.life3 = this.add.image(1880, 36, "life").setScale(0.04)

        this.createMaze()

        this.physics.add.collider(this.human, this.groundGroup)
        this.physics.add.overlap(this.human, this.coinGroup, this.collectCoin, null, this)
        this.physics.add.collider(this.human, this.enemyGroup, this.getStabbed, null, this)
        this.physics.add.overlap(this.human, this.jokerGroup, this.getJ, null, this)
        this.physics.add.collider(this.aceGroup, this.enemyGroup, this.hitEnemy, null, this)
        this.physics.add.collider(this.aceGroup, this.groundGroup, this.hitWall, null, this)

        this.movingWalls.forEach (wall => {
            this.physics.add.collider(this.human, wall)
            this.physics.add.collider(this.aceGroup, wall, this.hitMovingWall, null, this)
        })

        this.cursors = this.input.keyboard.createCursorKeys()
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.input.on('pointerdown', this.shootAce, this)
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        this.gotAce = false
        this.direction = 'front'
    }

    createMaze() {
        const mazeLayout = [
            ' XXXXXXXXXXXXXX ',
            'YC   CY    YC  Y',
            'Y     Y C      Y',
            'Y   XXXX       Y',
            'YC M   JY  C E Y',
            'Y     XX    Y CY',
            'Y E     C    XXY',
            'Y CY      E   CY',
            ' XXXXXXXXXXXXXX '
        ]

        const groundSize = 120
        const offsetY = 48
        this.movingWalls = []

        for (let row = 0; row < mazeLayout.length; row++) {
            for (let col = 0; col < mazeLayout[row].length; col++) {

                let x = col * groundSize + groundSize / 2.5
                let y = row * groundSize + groundSize / 2.5 + offsetY

                if (mazeLayout[row][col] === 'X') {
                    this.groundGroup.create(x, y, 'ground').setScale(0.17).refreshBody()
                } else if (mazeLayout[row][col] === "Y") {
                    this.groundGroup.create(x, y, 'wall').setScale(0.17).refreshBody()
                } else if (mazeLayout[row][col] === "M") {
                    let movingWall = this.physics.add.image(x, y, 'wall').setScale(0.17)
                    movingWall.setImmovable(true)
                    movingWall.setVelocityX(50)
                    movingWall.startX = col * groundSize + groundSize / 2.5
                    movingWall.endX = movingWall.startX + 220
                    this.movingWalls.push(movingWall)
                } else if (mazeLayout[row][col] === "C") {
                    this.coinCounter += 1
                    this.coinGroup.create(x, y, 'clubsCoin').setScale(0.032)
                } else if (mazeLayout[row][col] === "E") {
                    this.enemyCounter += 1
                    let enemy = this.enemyGroup.create(x, y, "enemy").setScale(0.07)
                    enemy.setVelocityY(gameOptions.enemySpeed)
                    enemy.startY = y - 400
                    enemy.endY = enemy.startY + 400
                    enemy.setImmovable(true)

                    if (x < this.scale.width / 2) {
                        enemy.setFlipX(true)
                    }

                    this.time.addEvent({
                        delay: Phaser.Math.Between(500, 2000),
                        callback: () => {
                            enemy.setVelocityY(gameOptions.enemySpeed)
                        },
                        loop: false
                    })
                } else if (mazeLayout[row][col] === "J") {
                    this.jokerGroup.create(x, y, 'joker').setScale(0.05)
                }
            }
        }
    }

    update() {

        this.movingWalls.forEach(wall => {
            if (wall.x <= wall.startX) {
                wall.setVelocityX(50)
            } else if (wall.x >= wall.endX) {
                wall.setVelocityX(-50)
            }
        })

        if (this.cursors.left.isDown || this.a.isDown) {
            this.human.setVelocityX(-gameOptions.humanSpeed)
            this.human.setTexture('left')
            this.human.setScale(0.08)
            this.direction = 'left'
        } else if (this.cursors.right.isDown || this.d.isDown) {
            this.human.setVelocityX(gameOptions.humanSpeed)
            this.human.setTexture('right')
            this.human.setScale(0.08)
            this.direction = 'right'
        } else {
            this.human.setVelocityX(0)
        }

        if (this.cursors.up.isDown || this.w.isDown) {
            this.human.setVelocityY(-gameOptions.humanSpeed)
            this.human.setTexture('back')
            this.human.setScale(0.08)
            this.direction = 'back'
        } else if (this.cursors.down.isDown || this.s.isDown) {
            this.human.setVelocityY(gameOptions.humanSpeed)
            this.human.setTexture('front')
            this.human.setScale(0.08)
            this.direction = 'front'
        } else {
            this.human.setVelocityY(0)
        }

        this.enemyGroup.children.iterate(enemy => {
            if (enemy.y <= enemy.startY) {
                enemy.setVelocityY(gameOptions.enemySpeed)
            } else if (enemy.y >= enemy.endY) {
                enemy.setVelocityY(-gameOptions.enemySpeed)
            }
        })

       if (this.collectedCoins === this.coinCounter && this.tamedRabbits === this.enemyCounter)
            {
                if (this.enter.isDown) 
                    {
                    this.nextlevelSound.play()
                    console.log("Level complete!")
                    this.scene.start('Level2')
                }
        }
    }

    collectCoin (human, clubsCoin) {
        this.getCoinSound.play()
        clubsCoin.destroy()
        this.collectedCoins += 1
        this.coinText.setText(this.collectedCoins)
    }

    getStabbed(human, enemy) {
        this.lostlifeSound.play()
        this.lives -= 1;
    
        if (this.lives === 2) {
            this.life3.setTexture("nolife")
            this.resetPlayerPosition()
        } else if (this.lives === 1) {
            this.life2.setTexture("nolife")
            this.resetPlayerPosition()
        } else if (this.lives === 0) {
            this.life1.setTexture("nolife")
            this.restart()
        }
    }

    getJ (human, joker) {
        this.getjokerSound.play()
        joker.destroy()
        this.gotAce = true
        this.add.image(340,36, "clubsAce").setScale(0.04)
    }

    shootAce (pointer) {
        if (this.gotAce) {
            this.throwSound.play()
            let clubsAce = this.aceGroup.create(this.human.x, this.human.y, 'clubsAce').setScale(0.05)

            switch (this.direction) {
                case 'left':
                    clubsAce.setVelocityX(-gameOptions.cardSpeed)
                    clubsAce.setAngle(30)
                    break
                case 'right':
                    clubsAce.setVelocityX(gameOptions.cardSpeed)
                    clubsAce.setAngle(-30)
                    break
                case 'front':
                    clubsAce.setVelocityY(gameOptions.cardSpeed)
                    clubsAce.setAngle(30)
                    break
                case 'back':
                    clubsAce.setVelocityY(-gameOptions.cardSpeed)
                    clubsAce.setAngle(-30)
                    break
            }
        }
    }

    hitEnemy (clubsAce, enemy) {
        this.tameSound.play()
        clubsAce.destroy()
        enemy.setTexture('rabbit')
        enemy.setVelocityX(0)
        enemy.setVelocityY(0)
        this.time.delayedCall(500, () => enemy.destroy())
        this.tamedRabbits += 1
        this.rabbitText.setText(this.tamedRabbits)
    }

    hitWall (clubsAce, wall) {
        clubsAce.destroy()
    }

    hitMovingWall (wall, clubsAce) {
        clubsAce.destroy()
    }

    resetPlayerPosition() {
        this.bonkSound.play()
        this.human.setPosition(840, 170)
    }

    restart() {
        this.gameoverSound.play()

        this.collectedCoins = 0
        this.tamedRabbits = 0

        this.enemyCounter = 0
        this.coinCounter = 0

        this.lives = 3

        this.scene.restart()
    }
}

class Level2 extends Phaser.Scene {

    preload() {
        this.load.image("background", "assets/bg/background.png")
        this.load.image("ground", "assets/bg/ground.png")
        this.load.image("wall", "assets/bg/wall.png")

        this.load.image("heartsCoin", "assets/coins/heartsCoin.png")

        this.load.image("heartsAce", "assets/aces/heartsAce.png")

        this.load.image("joker", "assets/other/joker.png")

        this.load.image("enemy", "assets/enemy/enemy.png")
        this.load.image("rabbit", "assets/enemy/rabbit.png")
        
        this.load.image("front", "assets/human/front.png")
        this.load.image("left", "assets/human/left.png")
        this.load.image("right", "assets/human/right.png")
        this.load.image("back", "assets/human/back.png")

        this.load.image("life", "assets/other/life.png")
        this.load.image("nolife", "assets/other/nolife.png")

        this.load.audio("getcoin", "assets/audio/getcoin.mp3")
        this.load.audio("throw", "assets/audio/throw.mp3")
        this.load.audio("getjoker", "assets/audio/getjoker.mp3")
        this.load.audio("tame", "assets/audio/tame.mp3")
        this.load.audio("bonk", "assets/audio/bonk.mp3")
        this.load.audio("lostlife", "assets/audio/lostlife.mp3")
        this.load.audio("gameover", "assets/audio/gameover.mp3")
        this.load.audio("nextlevel", "assets/audio/nextlevel.mp3")
    }

    constructor() {
        super("Level2")

        this.collectedCoins = 0
        this.tamedRabbits = 0

        this.enemyCounter = 0
        this.coinCounter = 0

        this.lives = 3
    }

    create() {
        this.back = this.add.image(960, 540, "background")

        this.getCoinSound = this.sound.add("getcoin")
        this.throwSound = this.sound.add("throw")
        this.getjokerSound = this.sound.add("getjoker")
        this.tameSound = this.sound.add("tame")
        this.bonkSound = this.sound.add("bonk")
        this.lostlifeSound = this.sound.add("lostlife")
        this.gameoverSound = this.sound.add("gameover")
        this.nextlevelSound = this.sound.add("nextlevel")

        this.groundGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        })

        this.human = this.physics.add.image(840, 170, "front").setScale(0.08)
        this.human.setCollideWorldBounds(true)

        this.coinGroup = this.physics.add.group({
            allowGravity: false
        })

        this.enemyGroup = this.physics.add.group({
            allowGravity: false
        })

        this.aceGroup = this.physics.add.group({
            allowGravity: false
        })

        this.jokerGroup = this.physics.add.group({
            allowGravity: false
        })

        this.add.image(40,36, "rabbit").setScale(0.04).setFlipX(true)
        this.rabbitText = this.add.text(80,18,"0", {fontSize: "48px", fill: "#000000"})

        this.add.image(180,36, "heartsCoin").setScale(0.04)
        this.coinText = this.add.text(222,18,"0", {fontSize: "48px", fill: "#000000"})

        this.life1 = this.add.image(1760, 36, "life").setScale(0.04)
        this.life2 = this.add.image(1820, 36, "life").setScale(0.04)
        this.life3 = this.add.image(1880, 36, "life").setScale(0.04)

        this.createMaze()

        this.physics.add.collider(this.human, this.groundGroup)
        this.physics.add.overlap(this.human, this.coinGroup, this.collectCoin, null, this)
        this.physics.add.collider(this.human, this.enemyGroup, this.getStabbed, null, this)
        this.physics.add.overlap(this.human, this.jokerGroup, this.getJ, null, this)
        this.physics.add.collider(this.aceGroup, this.enemyGroup, this.hitEnemy, null, this)
        this.physics.add.collider(this.aceGroup, this.groundGroup, this.hitWall, null, this)

        this.movingWalls.forEach (wall => {
            this.physics.add.collider(this.human, wall)
            this.physics.add.collider(this.aceGroup, wall, this.hitMovingWall, null, this)
        })

        this.cursors = this.input.keyboard.createCursorKeys()
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.input.on('pointerdown', this.shootAce, this)
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        this.gotAce = false
        this.direction = 'front'
    }

    createMaze() {
        const mazeLayout = [
            ' XXXXXXXXXXXXXX ',
            'Y  CJY   CY  C Y',
            'Y    Y    YC   Y',
            'Y    Y     X   Y',
            'YE   YXX      EY',
            'Y   EYC        Y',
            'Y         X    Y',
            'Y C  M    CY ECY',
            ' XXXXXXXXXXXXXX '
        ]

        const groundSize = 120
        const offsetY = 48
        this.movingWalls = []

        for (let row = 0; row < mazeLayout.length; row++) {
            for (let col = 0; col < mazeLayout[row].length; col++) {

                let x = col * groundSize + groundSize / 2.5
                let y = row * groundSize + groundSize / 2.5 + offsetY

                if (mazeLayout[row][col] === 'X') {
                    this.groundGroup.create(x, y, 'ground').setScale(0.17).refreshBody()
                } else if (mazeLayout[row][col] === "Y") {
                    this.groundGroup.create(x, y, 'wall').setScale(0.17).refreshBody()
                } else if (mazeLayout[row][col] === "M") {
                    let movingWall = this.physics.add.image(x, y, 'wall').setScale(0.17)
                    movingWall.setImmovable(true)
                    movingWall.setVelocityX(70)
                    movingWall.startX = col * groundSize + groundSize / 2.5
                    movingWall.endX = movingWall.startX + 240
                    this.movingWalls.push(movingWall)
                } else if (mazeLayout[row][col] === "C") {
                    this.coinCounter += 1
                    this.coinGroup.create(x, y, 'heartsCoin').setScale(0.032)
                } else if (mazeLayout[row][col] === "E") {
                    this.enemyCounter += 1
                    let enemy = this.enemyGroup.create(x, y, "enemy").setScale(0.07)
                    enemy.setVelocityY(gameOptions.enemySpeed)
                    enemy.startY = y - 400
                    enemy.endY = enemy.startY + 400
                    enemy.setImmovable(true)

                    if (x < this.scale.width / 2) {
                        enemy.setFlipX(true)
                    }

                    this.time.addEvent({
                        delay: Phaser.Math.Between(500, 2000),
                        callback: () => {
                            enemy.setVelocityY(gameOptions.enemySpeed)
                        },
                        loop: false
                    })
                } else if (mazeLayout[row][col] === "J") {
                    this.jokerGroup.create(x, y, 'joker').setScale(0.05)
                }
            }
        }
    }

    update() {

        this.movingWalls.forEach(wall => {
            if (wall.x <= wall.startX) {
                wall.setVelocityX(50)
            } else if (wall.x >= wall.endX) {
                wall.setVelocityX(-50)
            }
        })

        if (this.cursors.left.isDown || this.a.isDown) {
            this.human.setVelocityX(-gameOptions.humanSpeed)
            this.human.setTexture('left')
            this.human.setScale(0.08)
            this.direction = 'left'
        } else if (this.cursors.right.isDown || this.d.isDown) {
            this.human.setVelocityX(gameOptions.humanSpeed)
            this.human.setTexture('right')
            this.human.setScale(0.08)
            this.direction = 'right'
        } else {
            this.human.setVelocityX(0)
        }

        if (this.cursors.up.isDown || this.w.isDown) {
            this.human.setVelocityY(-gameOptions.humanSpeed)
            this.human.setTexture('back')
            this.human.setScale(0.08)
            this.direction = 'back'
        } else if (this.cursors.down.isDown || this.s.isDown) {
            this.human.setVelocityY(gameOptions.humanSpeed)
            this.human.setTexture('front')
            this.human.setScale(0.08)
            this.direction = 'front'
        } else {
            this.human.setVelocityY(0)
        }

        this.enemyGroup.children.iterate(enemy => {
            if (enemy.y <= enemy.startY) {
                enemy.setVelocityY(gameOptions.enemySpeed)
            } else if (enemy.y >= enemy.endY) {
                enemy.setVelocityY(-gameOptions.enemySpeed)
            }
        })

       if (this.collectedCoins === this.coinCounter && this.tamedRabbits === this.enemyCounter)
            {
                if (this.enter.isDown) 
                    {
                    this.nextlevelSound.play()
                    console.log("Level complete!")
                    this.scene.start('Level3')
                }
        }
    }

    collectCoin (human, heartsCoin) {
        this.getCoinSound.play()
        heartsCoin.destroy()
        this.collectedCoins += 1
        this.coinText.setText(this.collectedCoins)
    }

    getStabbed(human, enemy) {
        this.lostlifeSound.play()
        this.lives -= 1;
    
        if (this.lives === 2) {
            this.life3.setTexture("nolife")
            this.resetPlayerPosition()
        } else if (this.lives === 1) {
            this.life2.setTexture("nolife")
            this.resetPlayerPosition()
        } else if (this.lives === 0) {
            this.life1.setTexture("nolife")
            this.restart()
        }
    }


    getJ (human, joker) {
        this.getjokerSound.play()
        joker.destroy()
        this.gotAce = true
        this.add.image(340,36, "heartsAce").setScale(0.04)
    }

    shootAce (pointer) {
        if (this.gotAce) {
            this.throwSound.play()
            let heartsAce = this.aceGroup.create(this.human.x, this.human.y, 'heartsAce').setScale(0.05)

            switch (this.direction) {
                case 'left':
                    heartsAce.setVelocityX(-gameOptions.cardSpeed)
                    heartsAce.setAngle(30)
                    break
                case 'right':
                    heartsAce.setVelocityX(gameOptions.cardSpeed)
                    heartsAce.setAngle(-30)
                    break
                case 'front':
                    heartsAce.setVelocityY(gameOptions.cardSpeed)
                    heartsAce.setAngle(30)
                    break
                case 'back':
                    heartsAce.setVelocityY(-gameOptions.cardSpeed)
                    heartsAce.setAngle(-30)
                    break
            }
        }
    }

    hitEnemy (heartsAce, enemy) {
        this.tameSound.play()
        heartsAce.destroy()
        enemy.setTexture('rabbit')
        enemy.setVelocityX(0)
        enemy.setVelocityY(0)
        this.time.delayedCall(500, () => enemy.destroy())
        this.tamedRabbits += 1
        this.rabbitText.setText(this.tamedRabbits)
    }

    hitWall (heartsAce, wall) {
        heartsAce.destroy()
    }

    hitMovingWall (wall, heartsAce) {
        heartsAce.destroy()
    }

    resetPlayerPosition() {
        this.bonkSound.play()
        this.human.setPosition(840, 170)
    }

    restart() {
        this.gameoverSound.play()

        this.collectedCoins = 0
        this.tamedRabbits = 0

        this.enemyCounter = 0
        this.coinCounter = 0

        this.lives = 3

        this.scene.restart()
    }
}

class Level3 extends Phaser.Scene {

    preload() {
        this.load.image("background", "assets/bg/background.png")
        this.load.image("ground", "assets/bg/ground.png")
        this.load.image("wall", "assets/bg/wall.png")

        this.load.image("spadesCoin", "assets/coins/spadesCoin.png")

        this.load.image("spadesAce", "assets/aces/spadesAce.png")

        this.load.image("joker", "assets/other/joker.png")

        this.load.image("enemy", "assets/enemy/enemy.png")
        this.load.image("rabbit", "assets/enemy/rabbit.png")
        
        this.load.image("front", "assets/human/front.png")
        this.load.image("left", "assets/human/left.png")
        this.load.image("right", "assets/human/right.png")
        this.load.image("back", "assets/human/back.png")

        this.load.image("life", "assets/other/life.png")
        this.load.image("nolife", "assets/other/nolife.png")

        this.load.audio("getcoin", "assets/audio/getcoin.mp3")
        this.load.audio("throw", "assets/audio/throw.mp3")
        this.load.audio("getjoker", "assets/audio/getjoker.mp3")
        this.load.audio("tame", "assets/audio/tame.mp3")
        this.load.audio("bonk", "assets/audio/bonk.mp3")
        this.load.audio("lostlife", "assets/audio/lostlife.mp3")
        this.load.audio("gameover", "assets/audio/gameover.mp3")
        this.load.audio("nextlevel", "assets/audio/nextlevel.mp3")
    }

    constructor() {
        super("Level3")

        this.collectedCoins = 0
        this.tamedRabbits = 0

        this.enemyCounter = 0
        this.coinCounter = 0

        this.lives = 3
    }

    create() {
        this.back = this.add.image(960, 540, "background")

        this.getCoinSound = this.sound.add("getcoin")
        this.throwSound = this.sound.add("throw")
        this.getjokerSound = this.sound.add("getjoker")
        this.tameSound = this.sound.add("tame")
        this.bonkSound = this.sound.add("bonk")
        this.lostlifeSound = this.sound.add("lostlife")
        this.gameoverSound = this.sound.add("gameover")
        this.nextlevelSound = this.sound.add("nextlevel")

        this.groundGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        })

        this.human = this.physics.add.image(840, 170, "front").setScale(0.08)
        this.human.setCollideWorldBounds(true)

        this.coinGroup = this.physics.add.group({
            allowGravity: false
        })

        this.enemyGroup = this.physics.add.group({
            allowGravity: false
        })

        this.aceGroup = this.physics.add.group({
            allowGravity: false
        })

        this.jokerGroup = this.physics.add.group({
            allowGravity: false
        })

        this.add.image(40,36, "rabbit").setScale(0.04).setFlipX(true)
        this.rabbitText = this.add.text(80,18,"0", {fontSize: "48px", fill: "#000000"})

        this.add.image(180,36, "spadesCoin").setScale(0.04)
        this.coinText = this.add.text(222,18,"0", {fontSize: "48px", fill: "#000000"})

        this.life1 = this.add.image(1760, 36, "life").setScale(0.04)
        this.life2 = this.add.image(1820, 36, "life").setScale(0.04)
        this.life3 = this.add.image(1880, 36, "life").setScale(0.04)

        this.createMaze()

        this.physics.add.collider(this.human, this.groundGroup)
        this.physics.add.overlap(this.human, this.coinGroup, this.collectCoin, null, this)
        this.physics.add.collider(this.human, this.enemyGroup, this.getStabbed, null, this)
        this.physics.add.overlap(this.human, this.jokerGroup, this.getJ, null, this)
        this.physics.add.collider(this.aceGroup, this.enemyGroup, this.hitEnemy, null, this)
        this.physics.add.collider(this.aceGroup, this.groundGroup, this.hitWall, null, this)

        this.movingWalls.forEach (wall => {
            this.physics.add.collider(this.human, wall)
            this.physics.add.collider(this.aceGroup, wall, this.hitMovingWall, null, this)
        })

        this.cursors = this.input.keyboard.createCursorKeys()
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.input.on('pointerdown', this.shootAce, this)
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        this.gotAce = false
        this.direction = 'front'
    }

    createMaze() {
        const mazeLayout = [
            ' XXXXXXXXXXXXXX ',
            'Y C         F CY',
            'Y   XXXXXX     Y',
            'Y  YJ    CY  C Y',
            'Y  Y   X   XXXXY',
            'Y  Y   CY   C  Y',
            'Y   X   Y      Y',
            'YCE  M  YE    CY',
            ' XXXXXXXXXXXXXX '
        ]

        const groundSize = 120
        const offsetY = 48
        this.movingWalls = []

        for (let row = 0; row < mazeLayout.length; row++) {
            for (let col = 0; col < mazeLayout[row].length; col++) {

                let x = col * groundSize + groundSize / 2.5
                let y = row * groundSize + groundSize / 2.5 + offsetY

                if (mazeLayout[row][col] === 'X') {
                    this.groundGroup.create(x, y, 'ground').setScale(0.17).refreshBody()
                } else if (mazeLayout[row][col] === "Y") {
                    this.groundGroup.create(x, y, 'wall').setScale(0.17).refreshBody()
                } else if (mazeLayout[row][col] === "M") {
                    let movingWall = this.physics.add.image(x, y, 'wall').setScale(0.17)
                    movingWall.setImmovable(true)
                    movingWall.setVelocityX(70)
                    movingWall.startX = col * groundSize + groundSize / 2.5
                    movingWall.endX = movingWall.startX + 320
                    this.movingWalls.push(movingWall)
                } else if (mazeLayout[row][col] === "C") {
                    this.coinCounter += 1
                    this.coinGroup.create(x, y, 'spadesCoin').setScale(0.032)
                } else if (mazeLayout[row][col] === "E") {
                    this.enemyCounter += 1
                    let enemy = this.enemyGroup.create(x, y, "enemy").setScale(0.07)
                    enemy.setVelocityY(gameOptions.enemySpeed)
                    enemy.startY = y - 400
                    enemy.endY = enemy.startY + 400
                    enemy.setImmovable(true)

                    if (x < this.scale.width / 2) {
                        enemy.setFlipX(true)
                    }

                    this.time.addEvent({
                        delay: Phaser.Math.Between(500, 2000),
                        callback: () => {
                            enemy.setVelocityY(gameOptions.enemySpeed)
                        },
                        loop: false
                    })
                } else if (mazeLayout[row][col] === "F") {
                    this.enemyCounter += 1
                    let enemy = this.enemyGroup.create(x, y, "enemy").setScale(0.07)
                    enemy.setVelocityY(gameOptions.enemySpeed)
                    enemy.startY = y - 20
                    enemy.endY = enemy.startY + 300
                    enemy.setImmovable(true)

                    if (x < this.scale.width / 2) {
                        enemy.setFlipX(true)
                    }

                    this.time.addEvent({
                        delay: Phaser.Math.Between(500, 2000),
                        callback: () => {
                            enemy.setVelocityY(gameOptions.enemySpeed)
                        },
                        loop: false
                    })
                } else if (mazeLayout[row][col] === "J") {
                    this.jokerGroup.create(x, y, 'joker').setScale(0.05)
                }
            }
        }
    }

    update() {

        this.movingWalls.forEach(wall => {
            if (wall.x <= wall.startX) {
                wall.setVelocityX(50)
            } else if (wall.x >= wall.endX) {
                wall.setVelocityX(-50)
            }
        })

        if (this.cursors.left.isDown || this.a.isDown) {
            this.human.setVelocityX(-gameOptions.humanSpeed)
            this.human.setTexture('left')
            this.human.setScale(0.08)
            this.direction = 'left'
        } else if (this.cursors.right.isDown || this.d.isDown) {
            this.human.setVelocityX(gameOptions.humanSpeed)
            this.human.setTexture('right')
            this.human.setScale(0.08)
            this.direction = 'right'
        } else {
            this.human.setVelocityX(0)
        }

        if (this.cursors.up.isDown || this.w.isDown) {
            this.human.setVelocityY(-gameOptions.humanSpeed)
            this.human.setTexture('back')
            this.human.setScale(0.08)
            this.direction = 'back'
        } else if (this.cursors.down.isDown || this.s.isDown) {
            this.human.setVelocityY(gameOptions.humanSpeed)
            this.human.setTexture('front')
            this.human.setScale(0.08)
            this.direction = 'front'
        } else {
            this.human.setVelocityY(0)
        }

        this.enemyGroup.children.iterate(enemy => {
            if (enemy.y <= enemy.startY) {
                enemy.setVelocityY(gameOptions.enemySpeed)
            } else if (enemy.y >= enemy.endY) {
                enemy.setVelocityY(-gameOptions.enemySpeed)
            }
        })

       if (this.collectedCoins === this.coinCounter && this.tamedRabbits === this.enemyCounter)
            {
                if (this.enter.isDown) 
                    {
                    this.nextlevelSound.play()
                    console.log("Level complete!")
                    this.scene.start('Level4')
                }
        }
    }

    collectCoin (human, spadesCoin) {
        this.getCoinSound.play()
        spadesCoin.destroy()
        this.collectedCoins += 1
        this.coinText.setText(this.collectedCoins)
    }

    getStabbed(human, enemy) {
        this.lostlifeSound.play()
        this.lives -= 1;
    
        if (this.lives === 2) {
            this.life3.setTexture("nolife")
            this.resetPlayerPosition()
        } else if (this.lives === 1) {
            this.life2.setTexture("nolife")
            this.resetPlayerPosition()
        } else if (this.lives === 0) {
            this.life1.setTexture("nolife")
            this.restart()
        }
    }

    getJ (human, joker) {
        this.getjokerSound.play()
        joker.destroy()
        this.gotAce = true
        this.add.image(340,36, "spadesAce").setScale(0.04)
    }

    shootAce (pointer) {
        if (this.gotAce) {
            this.throwSound.play()
            let spadesAce = this.aceGroup.create(this.human.x, this.human.y, 'spadesAce').setScale(0.05)

            switch (this.direction) {
                case 'left':
                    spadesAce.setVelocityX(-gameOptions.cardSpeed)
                    spadesAce.setAngle(30)
                    break
                case 'right':
                    spadesAce.setVelocityX(gameOptions.cardSpeed)
                    spadesAce.setAngle(-30)
                    break
                case 'front':
                    spadesAce.setVelocityY(gameOptions.cardSpeed)
                    spadesAce.setAngle(30)
                    break
                case 'back':
                    spadesAce.setVelocityY(-gameOptions.cardSpeed)
                    spadesAce.setAngle(-30)
                    break
            }
        }
    }

    hitEnemy (spadesAce, enemy) {
        this.tameSound.play()
        spadesAce.destroy()
        enemy.setTexture('rabbit')
        enemy.setVelocityX(0)
        enemy.setVelocityY(0)
        this.time.delayedCall(500, () => enemy.destroy())
        this.tamedRabbits += 1
        this.rabbitText.setText(this.tamedRabbits)
    }

    hitWall (spadesAce, wall) {
        spadesAce.destroy()
    }

    hitMovingWall (wall, spadesAce) {
        spadesAce.destroy()
    }

    resetPlayerPosition() {
        this.bonkSound.play()
        this.human.setPosition(840, 170)
    }

    restart() {
        this.gameoverSound.play()

        this.collectedCoins = 0
        this.tamedRabbits = 0

        this.enemyCounter = 0
        this.coinCounter = 0

        this.lives = 3

        this.scene.restart()
    }
}

class Level4 extends Phaser.Scene {

    preload() {
        this.load.image("background", "assets/bg/background.png")
        this.load.image("ground", "assets/bg/ground.png")
        this.load.image("wall", "assets/bg/wall.png")

        this.load.image("diamondsCoin", "assets/coins/diamondsCoin.png")

        this.load.image("diamondsAce", "assets/aces/diamondsAce.png")

        this.load.image("joker", "assets/other/joker.png")

        this.load.image("enemy", "assets/enemy/enemy.png")
        this.load.image("rabbit", "assets/enemy/rabbit.png")
        
        this.load.image("front", "assets/human/front.png")
        this.load.image("left", "assets/human/left.png")
        this.load.image("right", "assets/human/right.png")
        this.load.image("back", "assets/human/back.png")

        this.load.image("life", "assets/other/life.png")
        this.load.image("nolife", "assets/other/nolife.png")

        this.load.audio("getcoin", "assets/audio/getcoin.mp3")
        this.load.audio("throw", "assets/audio/throw.mp3")
        this.load.audio("getjoker", "assets/audio/getjoker.mp3")
        this.load.audio("tame", "assets/audio/tame.mp3")
        this.load.audio("bonk", "assets/audio/bonk.mp3")
        this.load.audio("lostlife", "assets/audio/lostlife.mp3")
        this.load.audio("gameover", "assets/audio/gameover.mp3")
        this.load.audio("nextlevel", "assets/audio/nextlevel.mp3")
    }

    constructor() {
        super("Level4")

        this.collectedCoins = 0
        this.tamedRabbits = 0

        this.enemyCounter = 0
        this.coinCounter = 0

        this.lives = 3
    }

    create() {
        this.back = this.add.image(960, 540, "background")

        this.getCoinSound = this.sound.add("getcoin")
        this.throwSound = this.sound.add("throw")
        this.getjokerSound = this.sound.add("getjoker")
        this.tameSound = this.sound.add("tame")
        this.bonkSound = this.sound.add("bonk")
        this.lostlifeSound = this.sound.add("lostlife")
        this.gameoverSound = this.sound.add("gameover")
        this.nextlevelSound = this.sound.add("nextlevel")

        this.groundGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        })

        this.human = this.physics.add.image(840, 170, "front").setScale(0.08)
        this.human.setCollideWorldBounds(true)

        this.coinGroup = this.physics.add.group({
            allowGravity: false
        })

        this.enemyGroup = this.physics.add.group({
            allowGravity: false
        })

        this.aceGroup = this.physics.add.group({
            allowGravity: false
        })

        this.jokerGroup = this.physics.add.group({
            allowGravity: false
        })

        this.add.image(40,36, "rabbit").setScale(0.04).setFlipX(true)
        this.rabbitText = this.add.text(80,18,"0", {fontSize: "48px", fill: "#000000"})

        this.add.image(180,36, "diamondsCoin").setScale(0.04)
        this.coinText = this.add.text(222,18,"0", {fontSize: "48px", fill: "#000000"})

        this.life1 = this.add.image(1760, 36, "life").setScale(0.04)
        this.life2 = this.add.image(1820, 36, "life").setScale(0.04)
        this.life3 = this.add.image(1880, 36, "life").setScale(0.04)

        this.createMaze()

        this.physics.add.collider(this.human, this.groundGroup)
        this.physics.add.overlap(this.human, this.coinGroup, this.collectCoin, null, this)
        this.physics.add.collider(this.human, this.enemyGroup, this.getStabbed, null, this)
        this.physics.add.overlap(this.human, this.jokerGroup, this.getJ, null, this)
        this.physics.add.collider(this.aceGroup, this.enemyGroup, this.hitEnemy, null, this)
        this.physics.add.collider(this.aceGroup, this.groundGroup, this.hitWall, null, this)

        this.movingWalls.forEach (wall => {
            this.physics.add.collider(this.human, wall)
            this.physics.add.collider(this.aceGroup, wall, this.hitMovingWall, null, this)
        })

        this.cursors = this.input.keyboard.createCursorKeys()
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.input.on('pointerdown', this.shootAce, this)
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        this.gotAce = false
        this.direction = 'front'
    }

    createMaze() {
        const mazeLayout = [
            ' XXXXXXXXXXXXXX ',
            'Y C      Y    CY',
            'Y   XX         Y',
            'Y  Y CY  M     Y',
            'Y  Y  Y C X    Y',
            'YC   FY   FYC  Y',
            'Y     Y    YX EY',
            'Y E C Y  C YJ  Y',
            ' XXXXXXXXXXXXXX '
        ]

        const groundSize = 120
        const offsetY = 48
        this.movingWalls = []

        for (let row = 0; row < mazeLayout.length; row++) {
            for (let col = 0; col < mazeLayout[row].length; col++) {

                let x = col * groundSize + groundSize / 2.5
                let y = row * groundSize + groundSize / 2.5 + offsetY

                if (mazeLayout[row][col] === 'X') {
                    this.groundGroup.create(x, y, 'ground').setScale(0.17).refreshBody()
                } else if (mazeLayout[row][col] === "Y") {
                    this.groundGroup.create(x, y, 'wall').setScale(0.17).refreshBody()
                } else if (mazeLayout[row][col] === "M") {
                    let movingWall = this.physics.add.image(x, y, 'wall').setScale(0.17)
                    movingWall.setImmovable(true)
                    movingWall.setVelocityX(70)
                    movingWall.startX = col * groundSize + groundSize / 2.5
                    movingWall.endX = movingWall.startX + 240
                    this.movingWalls.push(movingWall)
                } else if (mazeLayout[row][col] === "C") {
                    this.coinCounter += 1
                    this.coinGroup.create(x, y, 'diamondsCoin').setScale(0.032)
                } else if (mazeLayout[row][col] === "E") {
                    this.enemyCounter += 1
                    let enemy = this.enemyGroup.create(x, y, "enemy").setScale(0.07)
                    enemy.setVelocityY(gameOptions.enemySpeed)
                    enemy.startY = y - 400
                    enemy.endY = enemy.startY + 400
                    enemy.setImmovable(true)

                    if (x < this.scale.width / 2) {
                        enemy.setFlipX(true)
                    }

                    this.time.addEvent({
                        delay: Phaser.Math.Between(500, 2000),
                        callback: () => {
                            enemy.setVelocityY(gameOptions.enemySpeed)
                        },
                        loop: false
                    })
                } else if (mazeLayout[row][col] === "F") {
                    this.enemyCounter += 1
                    let enemy = this.enemyGroup.create(x, y, "enemy").setScale(0.07)
                    enemy.setVelocityY(gameOptions.enemySpeed)
                    enemy.startY = y - 20
                    enemy.endY = enemy.startY + 300
                    enemy.setImmovable(true)

                    if (x < this.scale.width / 2) {
                        enemy.setFlipX(true)
                    }

                    this.time.addEvent({
                        delay: Phaser.Math.Between(500, 2000),
                        callback: () => {
                            enemy.setVelocityY(gameOptions.enemySpeed)
                        },
                        loop: false
                    })
                } else if (mazeLayout[row][col] === "J") {
                    this.jokerGroup.create(x, y, 'joker').setScale(0.05)
                }
            }
        }
    }

    update() {

        this.movingWalls.forEach(wall => {
            if (wall.x <= wall.startX) {
                wall.setVelocityX(50)
            } else if (wall.x >= wall.endX) {
                wall.setVelocityX(-50)
            }
        })

        if (this.cursors.left.isDown || this.a.isDown) {
            this.human.setVelocityX(-gameOptions.humanSpeed)
            this.human.setTexture('left')
            this.human.setScale(0.08)
            this.direction = 'left'
        } else if (this.cursors.right.isDown || this.d.isDown) {
            this.human.setVelocityX(gameOptions.humanSpeed)
            this.human.setTexture('right')
            this.human.setScale(0.08)
            this.direction = 'right'
        } else {
            this.human.setVelocityX(0)
        }

        if (this.cursors.up.isDown || this.w.isDown) {
            this.human.setVelocityY(-gameOptions.humanSpeed)
            this.human.setTexture('back')
            this.human.setScale(0.08)
            this.direction = 'back'
        } else if (this.cursors.down.isDown || this.s.isDown) {
            this.human.setVelocityY(gameOptions.humanSpeed)
            this.human.setTexture('front')
            this.human.setScale(0.08)
            this.direction = 'front'
        } else {
            this.human.setVelocityY(0)
        }

        this.enemyGroup.children.iterate(enemy => {
            if (enemy.y <= enemy.startY) {
                enemy.setVelocityY(gameOptions.enemySpeed)
            } else if (enemy.y >= enemy.endY) {
                enemy.setVelocityY(-gameOptions.enemySpeed)
            }
        })

       if (this.collectedCoins === this.coinCounter && this.tamedRabbits === this.enemyCounter)
            {
                if (this.enter.isDown) 
                    {
                    this.nextlevelSound.play()
                    console.log("Level complete!")
                    this.scene.start('EndScreen')
                }
        }
    }

    collectCoin (human, diamondsCoin) {
        this.getCoinSound.play()
        diamondsCoin.destroy()
        this.collectedCoins += 1
        this.coinText.setText(this.collectedCoins)
    }

    getStabbed(human, enemy) {
        this.lostlifeSound.play()
        this.lives -= 1;
    
        if (this.lives === 2) {
            this.life3.setTexture("nolife")
            this.resetPlayerPosition()
        } else if (this.lives === 1) {
            this.life2.setTexture("nolife")
            this.resetPlayerPosition()
        } else if (this.lives === 0) {
            this.life1.setTexture("nolife")
            this.restart()
        }
    }

    getJ (human, joker) {
        this.getjokerSound.play()
        joker.destroy()
        this.gotAce = true
        this.add.image(340,36, "diamondsAce").setScale(0.04)
    }

    shootAce (pointer) {
        if (this.gotAce) {
            this.throwSound.play()
            let diamondsAce = this.aceGroup.create(this.human.x, this.human.y, 'diamondsAce').setScale(0.05)

            switch (this.direction) {
                case 'left':
                    diamondsAce.setVelocityX(-gameOptions.cardSpeed)
                    diamondsAce.setAngle(30)
                    break
                case 'right':
                    diamondsAce.setVelocityX(gameOptions.cardSpeed)
                    diamondsAce.setAngle(-30)
                    break
                case 'front':
                    diamondsAce.setVelocityY(gameOptions.cardSpeed)
                    diamondsAce.setAngle(30)
                    break
                case 'back':
                    diamondsAce.setVelocityY(-gameOptions.cardSpeed)
                    diamondsAce.setAngle(-30)
                    break
            }
        }
    }

    hitEnemy (diamondsAce, enemy) {
        this.tameSound.play()
        diamondsAce.destroy()
        enemy.setTexture('rabbit')
        enemy.setVelocityX(0)
        enemy.setVelocityY(0)
        this.time.delayedCall(500, () => enemy.destroy())
        this.tamedRabbits += 1
        this.rabbitText.setText(this.tamedRabbits)
    }

    hitWall (diamondsAce, wall) {
        diamondsAce.destroy()
    }

    hitMovingWall (wall, diamondsAce) {
        diamondsAce.destroy()
    }

    resetPlayerPosition() {
        this.bonkSound.play()
        this.human.setPosition(840, 170)
    }

    restart() {
        this.gameoverSound.play()

        this.collectedCoins = 0
        this.tamedRabbits = 0

        this.enemyCounter = 0
        this.coinCounter = 0

        this.lives = 3

        this.scene.restart()
    }
}
class EndScreen extends Phaser.Scene {

    preload() {
        this.load.image("end", "assets/bg/end.png")
    }

    constructor() {
        super("EndScreen")
    }

    create() {
        this.add.image(960, 540, "end")
    }
}
