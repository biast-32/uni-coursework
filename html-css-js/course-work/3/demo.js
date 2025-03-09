
const samples = []
samples.push({src:"audio/check.mp3", name: "Check"})
samples.push({src:"audio/end.mp3", name: "End"})
samples.push({src:"audio/hehehe.mp3", name: "Hehehe"})
samples.push({src:"audio/drum.mp3", name: "Drum"})
samples.push({src:"audio/araara.mp3", name: "Araara"})
samples.push({src:"audio/wow.mp3", name: "Wow"})
samples.push({src:"audio/wii rock.mp3", name:"Wii"})

let tracks= []
tracks.push([])
tracks.push([])
tracks.push([])
tracks.push([])

tracksDiv = document.getElementById("tracks")

for (let i=0; i< tracks.length;i++){
    let trackDiv = document.createElement("div")
    trackDiv.setAttribute("id", "trackDiv" + i)
    let trackDivHeader = document.createElement("h2")
    trackDivHeader.innerText = "Track " + (i + 1)
    trackDiv.appendChild(trackDivHeader)
    tracksDiv.appendChild(trackDiv)
}

const addButtons = document.getElementById("addButtons")
let id = 0

samples.forEach((sample) => {
    console.log(sample.name)

    let newButton = document.createElement("button")
    newButton.setAttribute("data-id", id++)
    newButton.addEventListener("click", () => addSample (newButton))
    newButton.innerText = sample.name
    addButtons.appendChild(newButton)
})

function addSample(addButton) {
    const sampleNumber = addButton.dataset.id
    const trackNumber = document.querySelector("input[name ='track']:checked").value

    console.log("Sample number: " + sampleNumber)
    console.log("Track number: " + trackNumber)

    tracks[trackNumber].push(samples[sampleNumber])

    let trackDiv = document.getElementById("trackDiv" + trackNumber)
    let newItem = document.createElement("div")
    newItem.innerText = samples[sampleNumber].name
    trackDiv.appendChild(newItem)
}

const playButton = document.getElementById("play")
playButton.addEventListener("click", () => playSound())

function playSound(){
    let i = 0;
    tracks.forEach((track) => {
        if(track.length>0){
            playTrack(track, i)
        }
        i++
    })
}

function playTrack(track, trackNumber){
    let audio = new Audio()
    let i = 0
    audio.addEventListener("ended", () => {
        i = ++i < track.length ? i:0
        audio.src = track[i].src
        audio.play()
        console.log("Starting track" + trackNumber + ", instrument " +track[i].name)
    }, true)
    audio.volume = 1.0
    audio.loop = false
    audio.src = track[0].src
    audio.play()
    console.log("Starting track" + trackNumber + ", instrument " +track[i].name)
}

const  uploadButton = document.getElementById("upload")
uploadButton.addEventListener("click", () => {
    const file = document.getElementById("input-sample").files[0]
    let audioSrc = ""
    if(!file)return
    
    audioSrc = URL.createObjectURL(file)
    let sample = {src: audioSrc, name:"New Sample"}
    samples.push(sample)
    id = samples.length - 1

    let newButton = document.createElement("button")
    newButton.setAttribute("data-id", id)
    newButton.addEventListener("click", () => addSample(newButton))
    newButton.innerText = sample.name

    addButtons.appendChild(newButton)
} )
