console.log("jvhggv");
let currentsong = new Audio();
let songs;
let currfolder;

// NEW FUNCTION: Render playlist to HTML
function updatePlaylistUI(songsList) {
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUL.innerHTML = ""; // Clear old list

    for (const song of songsList) {
        let songName = decodeURI(song.split(/[\\/]/).pop());
        songUL.innerHTML += ` <li data-songurl="${song}"> 
            <img class="invert" src="music.svg">
            <div class="info">
                <div>${songName}</div> 
                <div>Dipanshu</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="play.svg">
            </div>
        </li>`;
    }
    // Re-attach click listeners to ALL li elements
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            let fullUrl = e.dataset.songurl;
            playmusic(fullUrl);
        });
    });
}

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder) {
    currfolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/songs/${currfolder}/`)

    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            // Push the full, decoded URL directly into the array
            songs.push(decodeURI(element.href));

            console.log(songs);
        }

    }
    return songs;
}



const playmusic = (track, pause = false) => {
    currentsong.src = track;

    if (!pause) {
        currentsong.play();
        play.src = "pause.svg";
    }

    // Split by BOTH forward (/) and backward (\) slashes
    let trackName = decodeURI(track.split(/[\\/]/).pop());

    document.querySelector(".songinfo").innerHTML = trackName;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}






async function main() {
    songs = await getsongs("shubh");
    playmusic(songs[0], true);
   
    updatePlaylistUI(songs);
  // Attach an event listener to play, next and previous
    // let playbtn = document.getElementById("#play");

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "pause.svg";
        }
        else {
            currentsong.pause();
            play.src = "play.svg";
        }
    }
    )
    // Listen for timeupdate event
    currentsong.addEventListener("timeupdate", () => {
        // console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}
/${secondsToMinutesSeconds(currentsong.duration)}`;
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration * 100) + "%";
    })


    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = (percent * currentsong.duration) / 100;
    })

    //hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    }
    );
    //closing
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-130%";
    }
    )
    //previous button
    previous.addEventListener("click", () => {

        let track = decodeURI(currentsong.src.split("/").slice(-1)[0]);
        // const index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        const decodedsongs = songs.map((song) => {
            const decoded = decodeURI(song);
            return decoded.split("\\").slice(-1)[0];

        })

        const index = decodedsongs.indexOf(track);
        // console.log(songs,index);
        if ((index - 1) >= 0) {
            playmusic(songs[index - 1]);
        }
    }
    )
    //next button
    next.addEventListener("click", () => {
        let track = decodeURI(currentsong.src.split("/").slice(-1)[0]);
        // const index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        const decodedsongs = songs.map((song) => {
            const decoded = decodeURI(song);
            return decoded.split("\\").slice(-1)[0];

        })

        const index = decodedsongs.indexOf(track);
        // console.log(songs,index);
        if ((index + 1) < songs.length) {
            playmusic(songs[index + 1]);
        }
    })

    //volume button
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        // console.log(e);
        currentsong.volume = parseInt(e.target.value) / 100;

    })


    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {

            songs = await getsongs(`${item.currentTarget.dataset.folder}`);
            updatePlaylistUI(songs);

        })
    })

}

main();
