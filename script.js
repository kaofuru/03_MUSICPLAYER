console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
const slider_volume = document.getElementById("volume");


let songs = [
    {songName: "PIKACHU", filePath: "songs/1.mp3", coverPath: "covers/1.PNG"},
    {songName: "YETI", filePath: "songs/2.mp3", coverPath: "covers/2.PNG"},
    {songName: "CARROT", filePath: "songs/3.mp3", coverPath: "covers/10.PNG"},
    {songName: "BADMAN", filePath: "songs/4.mp3", coverPath: "covers/8.PNG"},
    {songName: "ALIEN", filePath: "songs/5.mp3", coverPath: "covers/7.PNG"},
    {songName: "HAPPY SONG", filePath: "songs/2.mp3", coverPath: "covers/6.PNG"},

]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        audioElement.volume = slider_volume.value;
        slider_volume.addEventListener("input", e => {
            audioElement.volume = slider_volume.value;
        });
        masterPlay.classList.remove('fa--play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        audioElement.volume = slider_volume.value;
        slider_volume.addEventListener("input", e => {
            audioElement.volume = slider_volume.value;
        });
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    audioElement.volume = slider_volume.value;
    slider_volume.addEventListener("input", e => {
        audioElement.volume = slider_volume.value;
    });
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    audioElement.volume = slider_volume.value;
    slider_volume.addEventListener("input", e => {
        audioElement.volume = slider_volume.value;
    });
    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-circle-pause');
})

audioElement.volume = slider_volume.value;
slider_volume.addEventListener("input", e => {
audioElement.volume = slider_volume.value;
});