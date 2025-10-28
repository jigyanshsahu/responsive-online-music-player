// Select all HTML elements
const c1 = document.getElementById('c1')
const c2 = document.getElementById('c2')
const c3 = document.getElementById('c3')
const c4 = document.getElementById('c4')
const c5 = document.getElementById('c5')
const c6 = document.getElementById('c6')
const c7 = document.getElementById('c7')
const c8 = document.getElementById('c8')
const ham = document.getElementById('ham')
const cross = document.getElementById('cross')
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const songName = document.getElementById('song-name');
 const volumeControl = document.getElementById('volume');
 const currentTimeDisplay = document.getElementById('current-time');





ham.addEventListener('click', () =>{
  document.querySelector('.left').style.left="0px"; 
  
  document.querySelector('.left').style.background ="black";
  document.querySelector('.left').style.diplay ="inline";
})
cross.addEventListener('click', () =>{
 document.querySelector('.left').style.left="-360px"; 
})
// Songs array (from local folder "songs")
const songs = [
  { name: "Aayi Nai Stree 2 Shraddha ", src: "songs/Aayi Nai  Stree 2  Shraddha Kapoor  Rajkummar Rao  Sachin-Jigar  Pawan  Simran  DivyaAmitabh.mp3" },
  { name: "Danger - Sidharth M", src: "songs/Danger - Param Sundari  Sidharth M, Janhvi K.mp3" },

  { name: "GURU RANDHAWA - AZUL", src: "songs/GURU RANDHAWA - _AZUL_.mp3" },
  { name: "SAJDA- NAVAAN SANDHU", src: "songs/Sajda - NAVAAN SANDHU SUKHA.mp3" },
  
  {  name: "For A Reason", src: "songs/For A Reason  Karan Aujla.mp3" },
  {  name: "HASEEN - TALWIINDER", src: "songs/HASEEN - TALWIINDER, NDS, RIPPY (Official Visualizer).mp3" },
  {  name: "Naam Chale Vikram", src: "songs/naam chale.mp3" },

];

let songIndex = 0;
let isPlaying = false;

// Load the selected song
function loadSong(index) {
  audio.src = songs[index].src;
  songName.innerText = songs[index].name;
}

// Play song
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.innerText = '⏸️';
  songName.innerText = songs[songIndex].name;
}

// Pause song
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.innerText = '▶️';
}
const playMusic = (track)=> {
  let audio = new Audio(track)

}

// Toggle play/pause
playBtn.addEventListener('click', () => {
  if (!isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
});

// Next song
nextBtn.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
});

// Previous song
prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
});

// Update progress bar as song plays
audio.addEventListener('timeupdate', () => {
  const progressValue = (audio.currentTime / audio.duration) * 100;
  progress.value = progressValue;
});

// Seek song using slider
progress.addEventListener('input', () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});


// Auto-play next song when current song ends
audio.addEventListener('ended', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
});
let songUl = document.querySelector(".songlist ul");
songUl.innerHTML = ""; // clear old list if any
songs.forEach((song, index) => {
  songUl.innerHTML += `
    <li data-index="${index}">
      <img class="invert" src="music.svg" alt="">
      <div class="info">
        <div class="song-name">${song.name}</div>
        <div class="artist-name">Unknown Artist</div>
      </div>
      <div class="playnow">
        <span>Play Now</span>
        <img src="play.svg" alt="" class="invert">
      </div>
    </li>
  `;
});

Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
  const infoDiv = e.querySelector(".info");
e.addEventListener("click", () => {
  const index = e.getAttribute("data-index");
  songIndex = parseInt(index);     // ✅ Update global songIndex
  loadSong(songIndex);             // ✅ Load correct song
  if (!isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
});                     // ✅ Always play it



});
  volumeControl.addEventListener('input', () => {
      audio.volume = volumeControl.value; // 0 to 1
    });
    audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime; // time in seconds
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
  currentTimeDisplay.textContent = formattedTime;
});


// Load first song by default
loadSong(songIndex);
const cardButtons = [c1, c2, c3, c4, c5, c6, c7, c8];
const songIndexes = [0, 2, 6, 5, 1, 3, 4, 7];

cardButtons.forEach((card, i) => {
  card.addEventListener('click', () => {
    const newIndex = songIndexes[i];

    // If same song is clicked again → toggle play/pause
    if (songIndex === newIndex && isPlaying) {
      pauseSong();
      return;
    }

    songIndex = newIndex;
    loadSong(songIndex);
    playSong();
  });
});