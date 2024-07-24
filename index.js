const songList = [
  {
    id: 1,
    name: "Shape Of You",
    artist: "Ed Sheeran",
    image: "./images/Shape-Of-You.jpg",
    genre: "Romantic",
    source: "./songs/Shape-of-You.mp3",
  },
  {
    id: 2,
    name: "Maan Meri Jaan",
    artist: "King",
    image: "./images/Maan-Meri-Jaan.jpg",
    genre: "Romantic",
    source: "./songs/Maan-Meri-Jaan.mp3",
  },
  {
    id: 3,
    name: "Tum Hi Ho",
    artist: "Arjit Singh",
    image: "./images/Tum-Hi-Ho.jpg",
    genre: "Romantic",
    source: "./songs/Tum-Hi-Ho.mp3",
  },
  {
    id: 4,
    name: "Rom Rom",
    artist: "MC Square",
    image: "./images/Rom-Rom.jpg",
    genre: "Hip Hop",
    source: "./songs/Rom-Rom.mp3",
  },
  {
    id: 5,
    name: "Kar Har Maidan",
    artist: "Vishal",
    image: "./images/Kar-Har-Maidan.jpg",
    genre: "Motivation",
    source: "./songs/Kar-Har-Maidaan-Fateh.mp3",
  },
  {
    id: 6,
    name: "Jaadugar",
    artist: "Paradox",
    image: "./images/Jaadugar.jpg",
    genre: "Hip Hop",
    source: "./songs/Jaadugar.mp3",
  },
  {
    id: 7,
    name: "Zinda",
    artist: "Siddharth",
    image: "./images/Zinda.jpg",
    genre: "Motivation",
    source: "./songs/Zinda.mp3",
  },
];

let currentIndex = 0;

const selectElement = document.getElementById("genreFilter");
const songListElement = document.getElementById("songList");
const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");
const songTitle = document.querySelector(".song-title");
const artistNameElement = document.querySelector(".artist-name");
const coverImage = document.querySelector(".song-image");
const nextButton = document.querySelector(".next-button");
const previousButton = document.querySelector(".prev-button");

const createPlaylistButton = document.getElementById("createPlaylist");
const playlistNameInput = document.getElementById("playlistName");
const addToPlaylist = document.querySelector(".add-to-playlist");

const currentPlaylist = document.querySelector(".current-playlist-songs");
const allPlaylist = document.querySelector(".all-playlist");
let currentPlaylistName = null;

const category = ["All", "Romantic", "Hip Hop", "Motivation"];

category.forEach((item) => {
  const option = document.createElement("option");
  option.value = item;
  option.textContent = item;
  selectElement.appendChild(option);
});

selectElement.addEventListener("change", (event) => {
  console.log(event.target.value);
  const songCategory = event.target.value;
  showSong(songCategory);
});

function showSong(songCategory) {
  songListElement.innerHTML = "";
  songList.forEach((song) => {
    if (songCategory === song.genre) {
      createSpecificSong(song);
    } else if (songCategory === "All") {
      createSpecificSong(song);
    }
  });
}

function updateSingleSong(song) {
  const list = document.createElement("li");
  list.classList.add("song-item");
  list.setAttribute("data-id", song.id);
  list.setAttribute("data-artist", song.artist);
  list.setAttribute("data-source", song.source);
  list.setAttribute("data-image", song.image);
  list.textContent = song.name;
  list.addEventListener("click", (event) => {
    console.log(event.target);
    renderCurrentSong(event.target);
  });
  return list;
}

function createSpecificSong(song) {
  const list = updateSingleSong(song);
  console.log(list);
  songListElement.appendChild(list);
}

function renderCurrentSong(selectedSong) {
  const songName = selectedSong.innerText;
  const artistName = selectedSong.getAttribute("data-artist");
  const source = selectedSong.getAttribute("data-source");
  const songImage = selectedSong.getAttribute("data-image");

  currentIndex = selectedSong.getAttribute("data-id") - 1;
  coverImage.setAttribute("src", songImage);
  songTitle.textContent = songName;
  artistNameElement.textContent = artistName;

  audioSource.setAttribute("src", source);
  audioPlayer.load();
  audioPlayer.play();
}

function loadNextSong() {
  currentIndex = currentIndex + 1;
  // console.log(currentIndex, "currentIndex");

  if (currentIndex === songList.length) {
    currentIndex = 0;
  }
  let song = songList[currentIndex];
  // console.log(song);
  coverImage.src = song.image;
  songTitle.textContent = song.name;
  artistNameElement.textContent = song.artist;
  audioSource.src = song.source;
  audioPlayer.load();
  audioPlayer.play();
}

function previousSong() {
  currentIndex = currentIndex - 1;
  if (currentIndex === -1) {
    currentIndex = songList.length - 1;
  }
  // current index song
  let song = songList[currentIndex];
  coverImage.src = song.image;
  songTitle.textContent = song.name;
  artistNameElement.textContent = song.artist;
  audioSource.src = song.source;
  audioPlayer.load();
  audioPlayer.play();
}

(function init() {
  showSong("All");
})();

// control button
nextButton.addEventListener("click", loadNextSong);
previousButton.addEventListener("click", previousSong);

// const allPlayList = {
//       favouritePlayList : ['Tum Hi Ho','Maan Meri Jaan'],
//       regularPlaylist   : ['Rom Rom','Shape Of You','Zinda','Jadugar'],
//       exercisePlaylist  : ['Kar Har Maidan Fateh','Zinda']
// }

let playLists = {};

function createPlaylist(playlistName) {
  console.log(playlistName);
  // Check all valid names
  if (!playlistName) {
    alert("Please enter a playlist name.");
    return;
  }
  if (playLists[playlistName]) {
    alert("A playlist with this name already exists.");
    return;
  }
  // adding playlist to the all playlist
  playLists[playlistName] = [];

  const playlistTitle = document.createElement("li");
  playlistTitle.textContent = playlistName;

  // every playlist will have click event
  playlistTitle.addEventListener("click", (event) => {
    console.log(event.target);
    currentPlaylistName = event.target.innerText;
    if (playLists[currentPlaylistName].length == 0) {
      currentPlaylist.innerHTML = "";
    } else {
      console.log(playLists[currentPlaylistName]);
      renderPlaylistSong(currentPlaylistName);
    }
  });

  allPlaylist.appendChild(playlistTitle);
}

// render current playlist song when I click on current playlist
function renderPlaylistSong(currentPlaylistName) {
  // playLists[currentPlaylistName];
  currentPlaylist.innerHTML = "";
  console.log(playLists[currentPlaylistName]);

  playLists[currentPlaylistName].forEach((item) => {
    // find that songName which is equal to the item
    console.log(item);
    const mySong = findSongWithParticularName(item);
    console.log(mySong);
    const list = updateSingleSong(mySong);
    console.log(list);
    currentPlaylist.appendChild(list);
  });
}

function findSongWithParticularName(songName) {
  for (let i = 0; i < songList.length; i++) {
    let song = songList[i];
    if (song.name === songName) {
      return song;
    }
  }
}

function addSongToPlaylist(song, playlistName) {
  const songName = song.name;
  if (!playLists[playlistName]) {
    alert("Playlist does not exist.");
    return;
  }

  if (playLists[playlistName].includes(songName)) {
    alert("This song is already in the playlist.");
    return;
  }

  playLists[playlistName].push(songName);
  const list = updateSingleSong(song);
  currentPlaylist.appendChild(list);
}

// Handle creating a new playlist
createPlaylistButton.addEventListener("click", () => {
  const playlistName = playlistNameInput.value.trim();
  createPlaylist(playlistName);
  playlistNameInput.value = "";
});

addToPlaylist.addEventListener("click", () => {
  console.log("Add to playlist");
  addSongToPlaylist(songList[currentIndex], currentPlaylistName);
});

// Dark Mode
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
const modeLabel = document.getElementById("modeLabel");
const allSongDiv = document.querySelector(".all-song-div");
const playlistsElement = document.querySelector(".playlists");
const cardDiv = document.querySelector(".card-div");
const headerElement = document.querySelector("header");
const songInfo = document.querySelector(".song-info");

// Check for saved user preference for dark mode
const savedMode = localStorage.getItem("darkMode");
if (savedMode === "enabled") {
  body.classList.add("dark-mode");
  allSongDiv.classList.add("dark-mode");
  playlistsElement.classList.add("dark-mode");
  cardDiv.classList.add("dark-mode");
  headerElement.classList.add("dark-mode");
  songInfo.classList.add("dark-mode");
  songListElement.classList.add("dark-mode");
  darkModeToggle.checked = true;
  modeLabel.textContent = "Dark Mode";
}

function toggleTheme() {
  if (darkModeToggle.checked) {
    body.classList.add("dark-mode");
    allSongDiv.classList.add("dark-mode");
    playlistsElement.classList.add("dark-mode");
    cardDiv.classList.add("dark-mode");
    headerElement.classList.add("dark-mode");
    songInfo.classList.add("dark-mode");
    songListElement.classList.add("dark-mode");

    localStorage.setItem("darkMode", "enabled");
    modeLabel.textContent = "Dark Mode";
  } else {
    body.classList.remove("dark-mode");
    allSongDiv.classList.remove("dark-mode");
    playlistsElement.classList.remove("dark-mode");
    cardDiv.classList.remove("dark-mode");
    headerElement.classList.remove("dark-mode");
    songInfo.classList.remove("dark-mode");
    songListElement.classList.remove("dark-mode");

    localStorage.setItem("darkMode", "disabled");
    modeLabel.textContent = "Light Mode";
  }
}

darkModeToggle.addEventListener("change", toggleTheme);
