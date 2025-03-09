const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
const drops = []
const text = []
const fontSize = 30
const spacer = -10
const speed = 32

canvas.width = window.innerWidth -10
canvas.height = window.innerHeight -10
columns = canvas.width / (fontSize + spacer)

context.translate(canvas.width, 0)
context.scale(-1, 1)
context.font = "normal " + fontSize + "px Courier" 
context.textAlign = "center"

for(let i = 0; i < columns; i++) {
    drops[i] = 0

}

const chars = "｢｣ ｦ ｧ ｨ ｩ ｪ ｫ ｬ ｭ ｮ ｯ ｱ ｲ ｳ ｴ ｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ｢｣ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ｢｣ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"

for(let i = 0; i < columns; i++) {
    drops[i] = Math.random()*50 - 50

}

const draw = () => {

    context.fillStyle = "rgba(0,0,0,0.1)"
    context.fillRect(0,0,canvas.width, canvas.height)
    context.fillStyle = "#0f0"

    for (let i = 0; i < columns; i++) {
        context.fillText(text[i], i*(fontSize + spacer), drops[i]*(fontSize + spacer))

    }

    for (let i = 0; i < columns; i++) {
        context.fillStyle = "#fff"
        drops[i]++
        text[i] = chars.charAt(Math.floor(Math.random() * Math.random() * chars.length))
        context.fillText(text[i], i*(fontSize + spacer), drops[i]*(fontSize + spacer))

        if(drops[i]*(fontSize+spacer) > canvas.height) {
            drops[i] = Math.random()*50 - 50
        }}}
setInterval(draw, speed)