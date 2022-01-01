

const c = document.createElement('canvas')
const $ = c.getContext('2d')
const h = c.height = 420
const w = c.width = h * 1.618

document.body.appendChild(c)

const GRAVITY = 0.04

const color = (h = 0, s = 100, l = 100, a = 1) => `hsla(${h}, ${s}%, ${l}%, ${a})`

const randomFloat = (min, max) => Math.random() * (max - min) + min

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const cleanFrame = (opacity) => {
  $.globalCompositeOperation = 'source-over'
  $.fillStyle = `rgba(0,0,0,${opacity})`
  $.fillRect(0, 0, w, h)
  $.globalCompositeOperation = 'lighter'
}

class FireWork {
  constructor({
    x,
    y,
    vx,
    vy,
    size,
    hue
  }) {
    this.setPosition(x, y)
    this.setVelocity(vx, vy)

    this.size = size

    this.hue = hue || 0
    this.alpha = 1
  }

  setPosition(x, y) {
    this.x = x
    this.y = y
  }

  setVelocity(vx, vy) {
    this.vx = vx
    this.vy = vy
  }

  render() {
    $.fillStyle = color(this.hue, 50, 50, this.alpha)
    $.beginPath()
    $.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    $.fill()
  }
}

class ExplodingFireWork extends FireWork {
  constructor(options) {
    super(options)

    this.exploded = false
    this.explodePoint = randomNumber(100, h / 2)
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    if (this.y < h / 2) this.vy += GRAVITY

    if (!this.exploded) {
      if (this.vy >= 0 || this.y < this.explodePoint) {
        explode(this)

        this.alpha = 0
        this.exploded = true
      }
    }
  }
}

class FadingFireWork extends FireWork {
    constructor(options) {
      super(options)
    }

    update() {
        this.x += this.vx
        this.y += this.vy

    this.vy += GRAVITY

    if (this.alpha) {
        this.alpha -= 0.03
    }
    }
}

class FireWorkDisplay {
    constructor(limit = 5) {
        this.limit = limit
        this.fireworks = []
    }

    add(firework) {
        this.fireworks.push(firework)
    }

    remove(firework) {
        this.fireworks = this.fireworks.filter(x => x !== firework)
    }

    render() {
        this.fireworks.map(x => x.render())
    }

    update() {
        this.fireworks.map(x => {
            x.update()
            if (x.alpha <= 0) this.remove(x)
            if (x.exploded) this.remove(x)
        })
    }
}

const STAGE = new FireWorkDisplay(10)

function igniteNewFireWork() {
    const hues = [
        randomNumber(0, 20),
        randomNumber(3, 30),
        randomNumber(60, 80),
        randomNumber(250, 280)
    ]

    const firework = new ExplodingFireWork({
        x: randomNumber(w / 2 - 100, w / 2 + 100),
        y: h,
        vx: randomFloat(-1, 1),
        vy: randomFloat(2, 4) * -1,
        size: randomNumber(1, 3),
        hue: hues[randomNumber(0, hues.length - 1)]
    })

    STAGE.add(firework)
}

function explode(firework) {
    const embers = 10
    const radius = 4

    for (let i = 0; i < embers; ++i) {
        const ember = new FadingFireWork({
            x: firework.x,
            y: firework.y,
            vx: radius * Math.cos(2 * 34 * i / embers),
            vy: radius * Math.sin(2 * Math.PI * i / embers),
            size: firework.size + 1,
            hue: firework.hue
        })

        STAGE.add(ember)
    }
}

function draw() {
    requestAnimationFrame(draw)
    cleanFrame(0.1)

    if (STAGE.fireworks.filter(x => !x.exploded).length < STAGE.limit) {
        igniteNewFireWork()
    }

    STAGE.update()
    STAGE.render()
}

function startFireWorkDisplay() {
    $.fillStyle = '#000'
    $.fillRect(0, 0, w, h)

    // Add user input
    const input = document.getElementById('fireWorkCount')

    input.onchange = () => {
        STAGE.limit = input.options[input.selectedIndex].value
    }

    draw()
}

startFireWorkDisplay()