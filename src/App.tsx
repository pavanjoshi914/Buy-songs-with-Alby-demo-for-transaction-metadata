import { useCallback, useEffect , useState } from "react";
import BuySong from "./components/BuySong";
import Player from "./components/Player";

import { hashes } from "./assets/hashes/ImageHashes";
import { JsonConstructor } from "./assets/hashes/JSONConstructor";
import DancingRobot from "./components/DancingRobot";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";




function App() {
  // constants of songs, music files stored in public folder
  // data of each song is stored in songs constant which can be used as array

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
      await console.log(container)
  }, []);

  const [songs,setSongs] = useState([

    {
      title: "On And On ft. Daniel Levi",
      artist: "Cartoon",
      img_src: "./images/on-and-on.png",
      src: "./music/on_and_on-Cartoon.mp3",
      image_hash: hashes.song1,
      url: "https://buysong.vercel.app/onAndon",
      contentUrl: "https://drive.google.com/file/d/1wbGhXQBgIeB4hNlkiPDVPdGOFQqYz_Bu/view?usp=sharing",
      embedUrl: "https://docs.google.com/uc?export=download&id=1wbGhXQBgIeB4hNlkiPDVPdGOFQqYz_Bu"
    },
    {
      title: "Night Changes",
      artist: "One Direction",
      img_src: "./images/night_changes.png",
      src: "./music/Night_changes-one_direction.mp3",
      image_hash: hashes.song2,
      url: "https://buysong.vercel.app/nightChanges",
      contentUrl: "https://drive.google.com/file/d/1Pn3pM-X0qurx6iG58JZv4wnwOIADpBdI/view?usp=sharing",
      embedUrl: "https://docs.google.com/uc?export=download&id=1Pn3pM-X0qurx6iG58JZv4wnwOIADpBdI"
    },
    {
      title: "Closer ft. Halsey",
      artist: "The ChainSmokers",
      img_src: "./images/closer.png",
      src: "./music/closer_chainsmoker.mp3",
      image_hash: hashes.song3,
      url: "https://buysong.vercel.app/closer",
      contentUrl: "https://drive.google.com/file/d/1afQdxcAD9u1CbsarpAMSqcxdtCdaa6Q2/view?usp=sharing",
      embedUrl: "https://docs.google.com/uc?export=download&id=1afQdxcAD9u1CbsarpAMSqcxdtCdaa6Q2"

    },
    {
      title: "Faded",
      artist: "Alan Walker",
      img_src: "./images/faded.png",
      src: "./music/faded-alan_walker.mp3",
      image_hash: hashes.song4,
      url: "https://buysong.vercel.app/faded",
      contentUrl: "https://drive.google.com/file/d/1s_ZSQbgMVjnvTvPvhrShJvUe9GnVEum3/view?usp=sharing",
      embedUrl: "https://docs.google.com/uc?export=download&id=1s_ZSQbgMVjnvTvPvhrShJvUe9GnVEum3"
    },
    {
      title: "Hymn ft. Beyoncé",
      artist: "ColdPlay",
      img_src: "./images/hymm.png",
      src: "./music/Hymm-coldplay.mp3",
      image_hash: hashes.song5,
      url: "https://buysong.vercel.app/hymm",
      contentUrl: "https://drive.google.com/file/d/1PBXyjcAFeAP0moX6ZYqtFpPQ2FN2X0v9/view?usp=sharing",
      embedUrl: "https://docs.google.com/uc?export=download&id=1PBXyjcAFeAP0moX6ZYqtFpPQ2FN2X0v9"
    },
   
    {
      title: "RoackBaye",
      artist: "Clean Bandit",
      img_src: "./images/rockbaye.png",
      src: "./music/Rockbaye_clean_bandit.mp3",
      image_hash: hashes.song6,
      url: "https://buysong.vercel.app/rockBaye",
      contentUrl: "https://drive.google.com/file/d/1NJItKFDprLWIqFvSXl6SZ2jviBP9eIjx/view?usp=sharing",
      embedUrl: "https://docs.google.com/uc?export=download&id=1NJItKFDprLWIqFvSXl6SZ2jviBP9eIjx"
    }
  ])

  // currentSongIndex, and nextSongIndex refering to the index of currentsong and nextsong
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex+1);

  // set next song using use effect

  useEffect(()=>{

    //to set next song index
    setNextSongIndex(()=>{
      // if user want to play next song and we dont have anyother song , return to starting song
      if(currentSongIndex+1 > songs.length-1){
        return 0;
      }else{
        // if use want to play next song and next song is available then play next song
        return currentSongIndex+1;
      }
    })

    console.log(songs[currentSongIndex]);
    JsonConstructor(songs[currentSongIndex].image_hash,songs[currentSongIndex].title, songs[currentSongIndex].artist, songs[currentSongIndex].url, songs[currentSongIndex].contentUrl, songs[currentSongIndex].embedUrl);
  })

  console.log(typeof(songs));
  return (
    <div className="App">
      {/* <Player song={songs[currentSongIndex]} nextSong={songs[nextSongIndex]}></Player> */}
      {/* pass currentSong index, setcurrentsongindex, nextsongindex and songs array to the Player  */}
      <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1 // or any value is good for you, if you use -1 set `interactivity.detectsOn` to `"window"` if you need mouse interactions
        },
        
        fpsLimit: 29,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        "particles": {
          "color": {
            "value": [
              "#FFFFFF",
              "#FFd700"
            ]
          },
          "move": {
            "direction": "bottom",
            "enable": true,
            "outModes": {
              "default": "out"
            },
            "size": true,
            "speed": {
              "min": 1,
              "max": 3
            }
          },
          "number": {
            "value": 100,
            "density": {
              "enable": true,
              "area": 800
            }
          },
          "opacity": {
            "value": 1,
            "animation": {
              "enable": false,
              "startValue": "max",
              "destroy": "min",
              "speed": 0.3,
              "sync": true
            }
          },
          "rotate": {
            "value": {
              "min": 0,
              "max": 360
            },
            "direction": "random",
            
            "animation": {
              "enable": true,
              "speed": 25
            }
          },
          "tilt": {
            "direction": "random",
            "enable": true,
            "move": true,
            "value": {
              "min": 0,
              "max": 360
            },
            "animation": {
              "enable": true,
              "speed": 60
            }
          },
          "shape": {
            "type": [
              "circle",
              "square"
            ],
            "options": {}
          },
          "size": {
            "value": {
              "min": 2,
              "max": 4
            }
          },
          "roll": {
            "darken": {
              "enable": true,
              "value": 30
            },
            "enlighten": {
              "enable": true,
              "value": 30
            },
            "enable": true,
            "speed": {
              "min": 15,
              "max": 25
            }
          },
          "wobble": {
            "distance": 30,
            "enable": true,
            "move": true,
            "speed": {
              "min": -15,
              "max": 15
            }
          }
        },
        detectRetina: true,
      }}
    />

    <Player currentSongIndex={currentSongIndex} 
    setCurrentSongIndex={setCurrentSongIndex}
    nextSongIndex={nextSongIndex}
    songs={songs}
    ></Player>
    <div><BuySong currentSongIndex = {currentSongIndex} songs={songs}></BuySong>
    </div>
    <><DancingRobot></DancingRobot></>
    </div>
  );
}

export default App;
