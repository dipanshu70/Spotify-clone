// console.log("jvhggv");
// let currentsong = new Audio();
// let songs;
// let currfolder;



// function secondsToMinutesSeconds(seconds) {
//     if (isNaN(seconds) || seconds < 0) {
//         return "00:00";
//     }
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);

//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(remainingSeconds).padStart(2, '0');

//     return `${formattedMinutes}:${formattedSeconds}`;
// }

// async function getsongs(folder) {
//     currfolder = folder;
//    let a = await fetch(`https://api.github.com/repos/dipanshu70/Spotify-clone/contents/songs/${currfolder}`);

//     let response = await a.text();
//     // console.log(response);
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a");
//     let songs = [];
//     for (let i = 0; i < as.length; i++) {
//         const element = as[i];
//         if (element.href.endsWith(".mp3")) {
//             // Push the full, decoded URL directly into the array
//             songs.push(decodeURI(element.href));

//             // console.log(songs);
//         }

//     }
//     return songs;
// }



// const playmusic = (track, pause = false) => {
//     currentsong.src = track;

//     if (!pause) {
//         currentsong.play();
//         play.src = "pause.svg";
//     }

//     // Split by BOTH forward (/) and backward (\) slashes
//     let trackName = decodeURI(track.split(/[\\/]/).pop());

//     document.querySelector(".songinfo").innerHTML = trackName;
//     document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
// }


// // NEW FUNCTION: Render playlist to HTML

// function updatePlaylistUI(songsList) {
//     let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
//     songUL.innerHTML = ""; // Clear old list

//     for (const song of songsList) {
//         let songName = decodeURI(song.split(/[\\/]/).pop());
//         songUL.innerHTML += ` <li data-songurl="${song}"> 
//             <img class="invert" src="music.svg">
//             <div class="info">
//                 <div>${songName}</div> 
//                 <div>Dipanshu</div>
//             </div>
//             <div class="playnow">
//                 <span>Play Now</span>
//                 <img class="invert" src="play.svg">
//             </div>
//         </li>`;
//     }
//     // Re-attach click listeners to ALL li elements
//     Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
//         e.addEventListener("click", () => {
//             let fullUrl = e.dataset.songurl;
//             playmusic(fullUrl);
//         });
//     });
// }

// async function displayAlbums() {
//    let a = await fetch(`https://api.github.com/repos/dipanshu70/Spotify-clone/contents/songs`);
//     let response = await a.text();
//     let div = document.createElement("div")
//     div.innerHTML = response;
//     console.log(response);
//     let anchors = div.getElementsByTagName("a")
//     let cardContainer = document.querySelector(".cardContainer");
//     let array = Array.from(anchors);
//     for (let index = 0; index < array.length; index++) {
//         const e = array[index];

//         // console.log(e.href);
//         if (e.href.includes("%5Csongs")) {
//             let folder = e.href.replaceAll("%5C", "/").split("/").slice(-2)[0];
//             console.log(folder);
//             //            //get metadata of the folder
//            let infoFetch = await fetch(`https://raw.githubusercontent.com/dipanshu70/Spotify-clone/main/songs/${folder}/info.json`);
           
//             let response = await a.json();
//             console.log(response);
//             cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card ">
//                         <div class="play">
                      
//                          <svg width="16" height="12" viewBox="0 0 24 24" fill="none" xmlns="http:// www.w3.org/2000/svg">
//                          <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" stroke-width="1.5" fill="#000" stroke-linejoin="round" />
//                          </svg>
//                         </div>
//                             <img src="/songs/${folder}/cover.jpg"
//                                 alt="playlist cover">
//                             <h2>${response.title}</h2>
//                             <p>${response.description}</p>
//                         </div>`





//         }
//     }


// }







// async function main() {
//     songs = await getsongs("shubh");
//     playmusic(songs[0], true);

//     await displayAlbums();
//     updatePlaylistUI(songs);

//     // Attach an event listener to play, next and previous
//     // let playbtn = document.getElementById("#play");
//     play.addEventListener("click", () => {
//         if (currentsong.paused) {
//             currentsong.play();
//             play.src = "pause.svg";
//         }
//         else {
//             currentsong.pause();
//             play.src = "play.svg";
//         }
//     }
//     )
//     // Listen for timeupdate event
//     currentsong.addEventListener("timeupdate", () => {
//         // console.log(currentsong.currentTime, currentsong.duration);
//         document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}
// /${secondsToMinutesSeconds(currentsong.duration)}`;
//         document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration * 100) + "%";
//     })


//     // Add an event listener to seekbar
//     document.querySelector(".seekbar").addEventListener("click", e => {
//         let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
//         document.querySelector(".circle").style.left = percent + "%";
//         currentsong.currentTime = (percent * currentsong.duration) / 100;
//     })

//     //hamburger
//     document.querySelector(".hamburger").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "0";
//     }
//     );
//     //closing
//     document.querySelector(".close").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "-130%";
//     }
//     )
//     //previous button
//     previous.addEventListener("click", () => {

//         let track = decodeURI(currentsong.src.split("/").slice(-1)[0]);
//         // const index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
//         const decodedsongs = songs.map((song) => {
//             const decoded = decodeURI(song);
//             return decoded.split("\\").slice(-1)[0];

//         })

//         const index = decodedsongs.indexOf(track);
//         // console.log(songs,index);
//         if ((index - 1) >= 0) {
//             playmusic(songs[index - 1]);
//         }
//     }
//     )
//     //next button
//     next.addEventListener("click", () => {
//         let track = decodeURI(currentsong.src.split("/").slice(-1)[0]);
//         // const index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
//         const decodedsongs = songs.map((song) => {
//             const decoded = decodeURI(song);
//             return decoded.split("\\").slice(-1)[0];

//         })

//         const index = decodedsongs.indexOf(track);
//         // console.log(songs,index);
//         if ((index + 1) < songs.length) {
//             playmusic(songs[index + 1]);
//         }
//     })

//     //volume button
//     document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
//         // console.log(e);
//         currentsong.volume = parseInt(e.target.value) / 100;

//     })


//     // Load the playlist whenever card is clicked
//     Array.from(document.getElementsByClassName("card")).forEach(e => {
//         e.addEventListener("click", async item => {

//             songs = await getsongs(`${item.currentTarget.dataset.folder}`);
//             updatePlaylistUI(songs);
//             playmusic(songs[0]);  

//         })
//     })
//     // Add event listener to mute the track
//     document.querySelector(".volume>img").addEventListener("click", e => {
//         if (e.target.src.includes("volume.svg")) {
//             e.target.src=e.target.src.replace("volume.svg","mute.svg");
//             currentsong.volume = 0;
//             document.querySelector(".range").getElementsByTagName("input")[0].value=0;
//         }
//         else {
//             e.target.src=e.target.src.replace("mute.svg","volume.svg");
//             document.querySelector(".range").getElementsByTagName("input")[0].value=10;

//                 currentsong.volume = .10;
//             }
//         })

//     }


// main();













// thissssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
console.log("jvhggv");
let currentsong = new Audio();
let songs;
let currfolder;



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
    let a = await fetch(`https://api.github.com/repos/dipanshu70/Spotify-clone/contents/songs/${currfolder}`);

    let response = await a.json();
    let songs = [];
    for (let i = 0; i < response.length; i++) {
        const element = response[i];
        if (element.name.endsWith(".mp3")) {
            // Use raw.githubusercontent.com for direct playable URL
            let songUrl = `https://raw.githubusercontent.com/dipanshu70/Spotify-clone/main/songs/${currfolder}/${element.name}`;
            songs.push(songUrl);
        }
    }
    console.log("Songs loaded:", songs);
    return songs;
}



const playmusic = (track, pause = false) => {
    console.log("Playing track:", track);
    currentsong.src = track;
    console.log("Audio src set to:", currentsong.src);

    if (!pause) {
        currentsong.play().catch(error => {
            console.error("Audio play error:", error);
        });
        play.src = "pause.svg";
    }

    // Split by BOTH forward (/) and backward (\) slashes
    let trackName = decodeURI(track.split(/[\\/]/).pop());

    document.querySelector(".songinfo").innerHTML = trackName;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}


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

async function displayAlbums() {
    let a = await fetch(`https://api.github.com/repos/dipanshu70/Spotify-clone/contents/songs`);
    let response = await a.json();
    let cardContainer = document.querySelector(".cardContainer");
    
    for (let index = 0; index < response.length; index++) {
        const e = response[index];

        if (e.type === "dir") {
            let folder = e.name;
            
            let infoFetch = await fetch(`https://raw.githubusercontent.com/dipanshu70/Spotify-clone/main/songs/${folder}/info.json`);
            let info = await infoFetch.json();
            
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card ">
                        <div class="play">
                      
                         <svg width="16" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" stroke-width="1.5" fill="#000" stroke-linejoin="round" />
                         </svg>
                        </div>
                            <img src="https://raw.githubusercontent.com/dipanshu70/Spotify-clone/main/songs/${folder}/cover.jpg"
                                alt="playlist cover">
                            <h2>${info.title}</h2>
                            <p>${info.description}</p>
                        </div>`
        }
    }
}




async function main() {
    songs = await getsongs("shubh");
    
    if (songs.length > 0) {
        playmusic(songs[0], true);
    }

    await displayAlbums();
    updatePlaylistUI(songs);

    // Attach an event listener to play, next and previous
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "pause.svg";
        }
        else {
            currentsong.pause();
            play.src = "play.svg";
        }
    })

    // Listen for timeupdate event
    currentsong.addEventListener("timeupdate", () => {
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
    });

    //closing
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-130%";
    })

    //previous button
    previous.addEventListener("click", () => {
        console.log("=== PREVIOUS CLICKED ===");
        console.log("Current song src:", currentsong.src);
        console.log("Songs array:", songs);
        
        // Extract filename and DECODE it (handle %20 for spaces, etc)
        let currentFilename = decodeURIComponent(currentsong.src.split("/").pop());
        console.log("Current filename (decoded):", currentFilename);
        
        // Find the index by comparing filenames
        const index = songs.findIndex(song => {
            let songFilename = decodeURIComponent(song.split("/").pop());
            console.log("Comparing:", currentFilename, "===", songFilename, "?", currentFilename === songFilename);
            return songFilename === currentFilename;
        });
        
        console.log("Found index:", index);
        
        if (index > 0) {
            console.log("Playing previous song at index:", index - 1);
            playmusic(songs[index - 1]);
        } else {
            console.log("Already at first song or song not found");
        }
    })

    //next button
    next.addEventListener("click", () => {
        console.log("=== NEXT CLICKED ===");
        console.log("Current song src:", currentsong.src);
        console.log("Songs array:", songs);
        
        // Extract filename and DECODE it (handle %20 for spaces, etc)
        let currentFilename = decodeURIComponent(currentsong.src.split("/").pop());
        console.log("Current filename (decoded):", currentFilename);
        
        // Find the index by comparing filenames
        const index = songs.findIndex(song => {
            let songFilename = decodeURIComponent(song.split("/").pop());
            console.log("Comparing:", currentFilename, "===", songFilename, "?", currentFilename === songFilename);
            return songFilename === currentFilename;
        });
        
        console.log("Found index:", index);
        
        if (index < songs.length - 1) {
            console.log("Playing next song at index:", index + 1);
            playmusic(songs[index + 1]);
        } else {
            console.log("Already at last song or song not found");
        }
    })

    //volume button
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentsong.volume = parseInt(e.target.value) / 100;
    })

    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {

            songs = await getsongs(`${item.currentTarget.dataset.folder}`);
            updatePlaylistUI(songs);
            playmusic(songs[0]);  

        })
    })

    // Add event listener to mute the track
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentsong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
            currentsong.volume = .10;
        }
    })
}

main();