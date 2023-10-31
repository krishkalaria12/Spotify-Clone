// Get references to elements
let playSongButton = document.getElementById("playSongButton");
let mainSongSingers = document.querySelector(".mainSongSingers");
let mainSongTitle = document.querySelector(".mainSongTitle");
let mainSongBannerDiv = document.querySelector(".mainSongBannerDiv");
let mainSongBanner = document.querySelector(".mainSongBanner")
let songContainers = document.querySelectorAll(".hoverPlay");
let progressBar = document.getElementById("ProgressBar");
let songDurationTime = document.getElementById("songDurationTime");
let songTime = document.getElementById("songTime");
let volumeSlider = document.getElementById("volumeSlider");
let nextVideo = document.getElementById("nextVideo")
let previousVideo = document.getElementById("previousVideo")

let isPaused = false; // Add a variable to track the pause state
let pausedTime = 0; // Variable to store the paused time

let songAudio = new Audio("./assets/Audio/Dil Diyan Gallan.mp3");
let songIndex = 0;

let songs = [
    {songName:"Dil Diyaan Gallan" , audio: "./assets/Audio/Dil Diyan Gallan.mp3", banner: "./assets/ab67616d00001e02576521b1bf3ec2fd7fdfcbd5.jpeg"},
    {songName:"Apna Bana Le" , audio: "./assets/Audio/Apna-Bana-Le.mp3", banner: "./assets/ab67616d00001e02c7b32b2ebd1ed948c9e7e5c5.jpeg"},
    {songName:'Dholna' , audio: "./assets/Audio/Dholna Pyar Ke Geet.mp3", banner: "./assets/ab67616d00001e02d4a76235197643b7d252dd5d.jpeg"},
    {songName:"Dheere Dheere" , audio: "./assets/Audio/Dheere Dheere.mp3", banner: "./assets/ab67616d00001e02707ea5b8023ac77d31756ed4.jpeg"},
    {songName:"Nachde Se Saare" , audio: "./assets/Audio/Nachde-Ne-Sare.mp3", banner: "./assets/ab67706c0000da84a3ff8736ea5b316a90408a50.jpeg"},
    {songName:"Ainvayi Ainvayi" , audio: "./assets/Audio/Ainvayi Ainvayi.mp3", banner: "./assets/ab67616d00001e02d49b0b7c02f3e61babef11b7.jpeg"},
    {songName:"Kaun Tujhe" , audio: "./assets/Audio/Kaun Tujhe.mp3", banner: "./assets/ab6761610000517411d0343dc3387fc183dab2e0.jpeg"},
    {songName:"Khalasi" , audio: "./assets/Audio/Khalasi.mp3", banner: "./assets/ab67616d00001e02ac515af787eb2080c7a0b129.jpeg"},
    {songName:"Mann Mohi Gayu" , audio: "./assets/Audio/Maru-Man-Mohi-Gayu.mp3", banner: "./assets/ab67616d00001e02bf35774f0ca5e1c3cfb4c222.jpeg"},
    {songName:"Ek Pal Ka Jeena" , audio: "./assets/Audio/Ek Pal Ka Jeena.mp3", banner: "./assets/ab67616d00001e023f3d35703bdcd917dad51c4f.jpeg"},
]

let MainSongDetails;

// Function to update the main song details
function updateMainSongDetails(songDetails) {
    const { title, singer, banner } = songDetails;
    mainSongTitle.textContent = title;
    mainSongSingers.textContent = singer;
    mainSongBannerDiv.innerHTML = `<img id="mainSongBanner" class="h-16 w-16" src="${banner}" alt="">`;
    document.title = `${title} - ${singer}`;
    songs.forEach(element => {
        if (element.songName == title) {
            songAudio.src = element.audio
        }
    })
}

// Function to handle song container click
function handleSongContainerClick(event) {
    const container = event.currentTarget;
    const playButton = container.querySelector(".play");

    if (playButton.classList.contains("fa-pause")) {
        playButton.classList.remove("fa-pause");
        playButton.classList.add("fa-play");
        playSongButton.classList.remove("fa-pause");
        playSongButton.classList.add("fa-play");
        pausedTime = songAudio.currentTime;
        songAudio.pause();
        isPaused = true; // Update the pause state
    } else {
        // Reset all play buttons
        songContainers.forEach((otherContainer) => {
            const otherPlayButton = otherContainer.querySelector(".play");
            if (otherPlayButton.classList.contains("fa-pause")) {
                otherPlayButton.classList.remove("fa-pause");
                otherPlayButton.classList.add("fa-play");
            }
        });

        // Toggle the clicked play button
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-pause");

        const children = Array.from(container.children).filter((child) => child.nodeType === 1);
        const songBanner = children[0].querySelector("img").getAttribute("src");
        const songDetails = Array.from(children[1].children).filter((child) => child.nodeType === 1);
        const songDetailsSong = songDetails[0].textContent;
        const songDetailsSinger = songDetails[1].textContent;

        // Update main song details
        MainSongDetails = {
            title: songDetailsSong,
            singer: songDetailsSinger,
            banner: songBanner,
        };
        updateMainSongDetails(MainSongDetails);

        // Store song details in local storage
        localStorage.setItem("mainSongDetails", JSON.stringify(MainSongDetails));

        // Set the main play button to "fa-pause"
        playSongButton.classList.remove("fa-play");
        playSongButton.classList.add("fa-pause");
        progressBar.value = 0
        songIndex = (playButton.id)-1
        songAudio.src = songs[songIndex].audio
        // If paused, set the playback position to the paused time
        if (isPaused) {
            songAudio.currentTime = pausedTime;
        }
        songAudio.play();
        isPaused = false; // Update the pause state
        
    }
}

playSongButton.addEventListener("click", () => {
    if (playSongButton.classList.contains("fa-pause")) {
        playSongButton.classList.remove("fa-pause");
        playSongButton.classList.add("fa-play");
        const titleSong = mainSongTitle.textContent
        songContainers.forEach(element => {
            const player = element.querySelector(".play");
            const songName = element.querySelectorAll(".songName");
            songName.forEach(e => {
                if (player.classList.contains("fa-pause") && (e.textContent == titleSong == true)) {
                    const ParticularDiv = Array.from((Array.from(element.children))[2].children)[0]
                    ParticularDiv.classList.remove("fa-pause");
                    ParticularDiv.classList.add("fa-play");
                }
            });
        });
        songAudio.pause();
    } else {
        playSongButton.classList.remove("fa-play");
        playSongButton.classList.add("fa-pause");
        const songContainers = Array.from(document.querySelectorAll(".hoverPlay"));
        const titleSong = mainSongTitle.textContent
        songContainers.forEach(element => {
            const player = element.querySelector(".play");
            const songName = element.querySelectorAll(".songName");
            songName.forEach(e => {
                if (player.classList.contains("fa-play") && (e.textContent == titleSong == true)) {
                    const ParticularDiv = Array.from((Array.from(element.children))[2].children)[0]
                    ParticularDiv.classList.remove("fa-play");
                    ParticularDiv.classList.add("fa-pause");
                }
            });
        });
        songAudio.play();
    }
});



// Add click event listener to each song container
songContainers.forEach((container) => {
    container.addEventListener("click", handleSongContainerClick);
});

// Next Video and Preivous Video 

nextVideo.addEventListener("click" , ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    songAudio.src = songs[songIndex].audio;
    mainSongTitle.innerText = songs[songIndex].songName;
    mainSongBannerDiv.innerHTML = ``
    mainSongBannerDiv.innerHTML = `<img class="mainSongBanner h-16 w-16" src="${songs[songIndex].banner}" alt="">`;
    songAudio.currentTime = 0;
    songAudio.play();
    playSongButton.classList.remove('fa-play');
    playSongButton.classList.add('fa-pause');

})


previousVideo.addEventListener("click", ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    songAudio.src = songs[songIndex].audio;
    mainSongTitle.innerText = songs[songIndex].songName;
    mainSongBannerDiv.innerHTML = ``
    mainSongBannerDiv.innerHTML = `<img class="mainSongBanner h-16 w-16" src="${songs[songIndex].banner}" alt="">`;
    songAudio.currentTime = 0;
    songAudio.play();
    playSongButton.classList.remove('fa-play');
    playSongButton.classList.add('fa-pause');
})

// Check if there are stored song details in local storage
const storedSongDetails = localStorage.getItem("mainSongDetails");
if (storedSongDetails) {
    const { title, singer, banner } = JSON.parse(storedSongDetails);
    updateMainSongDetails({ title, singer, banner });
}

songAudio.addEventListener("timeupdate", () => {
    const progress = (songAudio.currentTime / songAudio.duration) * 100;
    progressBar.value = progress;
    if (!isNaN(songAudio.duration)) {
        const songDuration = songAudio.duration;
        const minutes = Math.floor(songDuration / 60);
        const remainingSeconds = Math.round(songDuration % 60);
        if (remainingSeconds <= 9) {
            songDurationTime.textContent = `${minutes}:0${remainingSeconds}`;
        } else {
            songDurationTime.textContent = `${minutes}:${remainingSeconds}`;
        }
    }
    updateSongTime(songAudio.currentTime);
});

progressBar.addEventListener("change", () => {
    songAudio.currentTime = (progressBar.value * songAudio.duration) / 100;
});

function updateSongTime(currentTime) {
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    if (!isNaN(currentTime)) {
        if (seconds <= 9) {
            songTime.textContent = `${minutes}:0${seconds}`;
        } else {
            songTime.textContent = `${minutes}:${seconds}`;
        }
    }
}


volumeSlider.addEventListener("input", function () {
    const volumeBtn = document.getElementById("volumeBtn");

    // Remove all volume-related classes
    volumeBtn.classList.remove("fa-volume-high", "fa-volume-low", "fa-volume-xmark");

    if (volumeSlider.value === "0") {
        volumeBtn.classList.add("fa-volume-xmark");
    } else if (volumeSlider.value < 0.4) {
        volumeBtn.classList.add("fa-volume-low");
    } else {
        volumeBtn.classList.add("fa-volume-high");
    }

    songAudio.volume = parseFloat(volumeSlider.value);
});

songAudio.volume = 1;



