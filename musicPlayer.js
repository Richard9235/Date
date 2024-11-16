const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

// Song details array with titles, file paths, and cover images
const songs = [
  {
    title: 'Best Friend',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] Best Friend.mp3',
    cover: 'Media-Songs-Cover/Best Friend.jpg'
  },

  {
    title: 'Best Part',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] Best Part.mp3',
    cover: 'Media-Songs-Cover/Best Part.jpg'
  },

  { 
    title: 'Build Me Up Buttercup',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] Build Me Up Buttercup.mp3',
    cover: 'Media-Songs-Cover/Build Me Up Buttercup.jpg'
  },

  {
    title: 'Coffee Breath',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] Coffee Breath.mp3',
    cover: 'Media-Songs-Cover/Coffee Breath.jpg'
  },

  {
    title: 'Corduroy Dreams',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] Corduroy Dreams.mp3',
    cover: 'Media-Songs-Cover/Corduroy Dreams.jpg'
  },

  {
    title: 'Dandelions',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] Dandelions.mp3',
    cover: 'Media-Songs-Cover/Dandelions.jpg'
  },
  {
    title: "I Can't Leave My Room",
    audio: "Media-Songs/[SPOTDOWNLOADER.COM] I Can't Leave My Room.mp3",
    cover: "Media-Songs-Cover/I Can't Leave My Room.jpg"
  },
  {
    title: 'I Know a Place',
    audio: 'Media-Songs/[SPOTDOWNLOADER.COM] I Know a Place.mp3',
    cover: 'Media-Songs-Cover/I Know a Place.jpg'
  },

  {
    title: 'I Like U',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] I Like U.mp3',
    cover: 'Media-Songs-Cover/I Like U.jpg'
  },

  {
    title: 'If I Could Ride a Bike',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] If I Could Ride a Bike.mp3',
    cover: 'Media-Songs-Cover/If I Could Ride a Bike.jpg'
  },
  {
    title: 'La Vie en Rose',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] La Vie en Rose (French Version.).mp3',
    cover: 'Media-Songs-Cover/La Vie en Rose (French Version.).jpg'
  },
  {
    title: 'Last Cup of Coffee',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] Last Cup of Coffee Cover.mp3',
    cover: 'Media-Songs-Cover/Last Cup of Coffee Cover.jpg'
  },

  {
    title: 'Like the Movies',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] Like the Movies.mp3',
    cover: 'Media-Songs-Cover/Like the Movies.jpg'
  },

  {
    title: 'Love Like You',
    audio: 'Media-Songs/[SPOTDOWNLOADER.COM] Love Like You.mp3',
    cover: 'Media-Songs-Cover/Love Like You(feat. Rebecca Sugar).jpg'
  },

  {
    title: 'Love Me Like That',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] Love Me Like That.mp3',
    cover: 'Media-Songs-Cover/Love Me Like That.jpg'
  },

  {
    title: 'Morning Coffee',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] Morning Coffee.mp3',
    cover: 'Media-Songs-Cover/Morning Coffee.jpg'
  },

  {
    title: 'Silly Girl',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] Silly Girl.mp3',
    cover: 'Media-Songs-Cover/Silly Girl.jpg'
  },
  {
    title: 'Sinatra',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] Sinatra.mp3',
    cover: 'Media-Songs-Cover/Sinatra.jpg'
  },

  {
    title: 'Sorry I Like You Too',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] Sorry, I Like You Too.mp3', 
    cover: 'Media-Songs-Cover/Sorry, I Like You Too.jpg'
  },

  {
    title: 'UWU',
    audio:' Media-Songs/[SPOTDOWNLOADER.COM] UWU.mp3',
    cover: 'Media-Songs-Cover/UWU.jpg'
  }
];

let songIndex = 0;

// Load song initially
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song.title;
  audio.src = song.audio;
  cover.src = song.cover;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fa-solid').classList.remove('fa-play');
  playBtn.querySelector('i.fa-solid').classList.add('fa-pause');
  cover.classList.add('rotate');
  audio.play();
  savePlayerState();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fa-solid').classList.add('fa-play');
  playBtn.querySelector('i.fa-solid').classList.remove('fa-pause');
  cover.classList.remove('rotate');
  audio.pause();
  savePlayerState();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// New implementation
progressContainer.addEventListener('mousedown', function(e) {
    // Pause audio updates temporarily
    audio.removeEventListener('timeupdate', updateProgress);
    
    const updateTime = function(e) {
        const bounds = progressContainer.getBoundingClientRect();
        const clickPosition = Math.min(Math.max(0, e.clientX - bounds.left), bounds.width);
        const percentage = clickPosition / bounds.width;
        
        if (audio.duration && isFinite(audio.duration)) {
            audio.currentTime = percentage * audio.duration;
            progress.style.width = `${percentage * 100}%`;
        }
    };
    
    // Update on initial click
    updateTime(e);
    
    // Allow dragging
    const mouseMoveHandler = function(e) {
        updateTime(e);
    };
    
    const mouseUpHandler = function() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        // Restore audio updates
        audio.addEventListener('timeupdate', updateProgress);
    };
    
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
});

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', (e) => {
  updateProgress(e);
  savePlayerState();
});
audio.addEventListener('ended', nextSong);

// Add these functions to handle state persistence
function savePlayerState() {
    const state = {
        currentSong: songIndex,
        currentTime: audio.currentTime,
        isPlaying: !audio.paused
    };
    localStorage.setItem('musicPlayerState', JSON.stringify(state));
}

function loadPlayerState() {
    const state = JSON.parse(localStorage.getItem('musicPlayerState'));
    if (state) {
        songIndex = state.currentSong;
        loadSong(songs[songIndex]);
        audio.currentTime = state.currentTime;
        if (state.isPlaying) {
            playSong();
        }
    }
}

// Add these event listeners
window.addEventListener('load', loadPlayerState);
window.addEventListener('beforeunload', savePlayerState);

// Add this to your "Continue" button click handler
document.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();
    const href = e.target.closest('button').getAttribute('onclick').match(/'([^']+)'/)[1];
    
    // Fade out current page
    document.body.style.opacity = 0;
    
    setTimeout(() => {
        window.location.href = href;
    }, 500);
});

function setProgress(e) {
    // First pause the audio
    const wasPlaying = !audio.paused;
    if (wasPlaying) {
        audio.pause();
    }
    
    const bounds = progressContainer.getBoundingClientRect();
    const clickPosition = e.clientX - bounds.left;
    const percentage = Math.min(Math.max(0, clickPosition / bounds.width), 1);
    
    if (audio.duration && isFinite(audio.duration)) {
        // Remove timeupdate temporarily
        audio.removeEventListener('timeupdate', updateProgress);
        
        // Update the time
        const newTime = Math.min(audio.duration * percentage, audio.duration);
        audio.currentTime = newTime;
        
        // Update progress bar
        progress.style.width = `${percentage * 100}%`;
        
        // Wait for the time to be set before playing
        audio.addEventListener('seeked', function onSeeked() {
            if (wasPlaying) {
                audio.play();
            }
            // Re-add timeupdate listener
            audio.addEventListener('timeupdate', updateProgress);
            // Remove this one-time seeked listener
            audio.removeEventListener('seeked', onSeeked);
        });
    }
}

// Update event listeners
progressContainer.removeEventListener('click', setProgress);
progressContainer.removeEventListener('mousedown', setProgress);
progressContainer.addEventListener('click', setProgress);

// Add this to your existing JavaScript file or create a new one
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.album');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'modal';
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.className = 'modal-content';
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            modal.style.display = 'flex';
            
            modal.onclick = function() {
                modal.style.display = 'none';
                modal.remove();
            }
        });
    });
});

