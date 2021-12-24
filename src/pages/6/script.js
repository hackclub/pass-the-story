const musicContainer = document.querySelector('.music_container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Song IDs
const songs = ['Beyonce', 'Joker', 'Queens', 'Latte']

// Song titles
const titles = [
    'Beyonce - Who Run The World (Boys)',
    'Feel Evil - Joker Background Music Boosted',
    'Queens - We Will Rock You',
    'Journal Entry #69 - "Plan, Prepare, Execute"'
]

// Keep track of songs
let songIndex = 0

// Initially load song info DOM
loadSong(songs[songIndex], titles[songIndex])

// Update song details
function loadSong(song, songTitle) {
    title.innerText = songTitle
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')

    audio.pause()
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex], titles[songIndex])

    playSong()
}

function nextSong() {
    songIndex++
    if (songIndex >= songs.length) {
        songIndex = 0
    }

    loadSong(songs[songIndex], titles[songIndex])

    playSong()
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// Event listeners

playBtn.addEventListener('click', () =>  {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

prevBtn.addEventListener('click', () => {
    prevSong()
})

nextBtn.addEventListener('click', () => {
    nextSong()
})

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)