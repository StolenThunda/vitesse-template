<template>
  <section class="relative flex w-full h-auto  ">
    <video
      muted
      autoplay
      crossorigin
      @click=" play "
      :poster="props.poster"
      :src="props.srcURL"
      id="video"
      :type="getType()"
    />
    <!-- class="mx-auto min-w-fit min-h-fit rounded-2xl" -->

    <div
      class="controls "
      hideOnMouseLeave
      :activeDuration="2000"
    >
      <div class="timeline ">
        <div
          class="mx-auto text-sm max-w-fit"
          v-show=" state.video !== null && state.video.playing "
        >{{ videoTime  }}</div>
        <div class="timeline-bar">

          <div class="inner bg-white w-none h-full">


          </div>
        </div>
      </div>
      <div>
        <button
          class="player-btn"
          @click=" play "
        >
          <div
            class="i-mdi-play"
            title="Play"
          ></div>
          <div
            class="i-mdi-pause"
            title="Pause"
          ></div>
        </button>
        <button
          class="player-btn"
          @click=" rewind( 0 ) "
        >
          <div
            class="i-mdi-skip-backward"
            title="Back to the beginning"
          ></div>
        </button>
        <button
          @click=" scan5( -5 ) "
          class="player-btn "
        >
          <div
            class="i-mdi-rewind-5"
            title="Rewind 5 sec"
          ></div>
        </button>
        <button
          @click=" scan5() "
          class="player-btn "
        >
          <div
            class="i-mdi-fast-forward-5"
            title="Forward 5 sec"
          ></div>
        </button>
        <button
          @click=" setLoopTime "
          class="player-btn"
          data-loop="A"
        >
          <div
            class="i-mdi-movie-open-edit"
            title="Set Loop Start"
          ></div>
        </button>
        <button
          @click=" setLoopTime "
          class="player-btn "
          data-loop="B"
        >
          <div
            class="i-mdi-movie-edit"
            title="Set Loop Stop"
          ></div>
        </button>
        <button
          @click=" loop "
          class="player-btn looper"
          :disabled=" !loopSet "
        >
          <div class="i-mdi-autorenew"></div>
        </button>
        <button
          @click=" settings "
          class="player-btn "
        >
          <div class="i-mdi-cog"></div>
        </button>
        <button
          @click=" test "
          class="player-btn "
        >
          <div class="i-mdi-tune"></div>
        </button>
        <button
          class="bg-transparent bg-white font-black btn"
          @click="fullScreen"
        >
          <div class="i-mdi-fullscreen"></div>
        </button>
        <button @click="download">
          <div class="i-mdi-cloud-download"></div>
        </button>
      </div>
    </div>
  </section>
</template>
<script setup >
import { onMounted, computed, } from "vue";

const props = defineProps( {
  srcURL: {
    type: [String],
    required: true
  },
  poster: {
    type:String,
    required: true,
    default:'https://media.vimejs.com/poster.png' 
  }
})

const state = reactive( {
  root: null,
  btnPause: null,
  btnPlay: null,
  btnLooper: null,
  timelineInnerBar: null,
  video: null,
  loop: {
    A: null,
    B: null,
  },
  current: null,
  elapsed: 0,
} )


onMounted( () => {
  // Select the HTML5 video
  state.video = document.querySelector( "#video" )
  state.btnPause = document.querySelector( ".i-mdi-pause" )
  state.btnPlay = document.querySelector( ".i-mdi-play" )
  state.btnLoopStart = document.querySelector( "[data-loop=A]" )
  state.btnLoopEnd = document.querySelector( "[data-loop=B]" )
  state.btnLooper = document.querySelector( ".looper" )
  state.icoLooper = document.querySelector( ".looper > div" )
  state.timelineInnerBar = document.querySelector( '.inner' )

  // set the pause button to display:none by default
  if (state.btnPause) state.btnPause.style.display = "none"
  // update the progress bar
  state.video.addEventListener( "timeupdate", () => {
    state.elapsed = state.video.currentTime
    let curr = ( state.video.currentTime / state.video.duration ) * 100
    if ( state.video.ended ) __resetPlayButton()
    __updateProgress(curr)
  } )
} )

/*
* computed functions
*/
watch(
  () => state.looping,
  ( looping ) => {
    if ( !looping ) {
      __activateLoopButton()
    } else {
      __deactivateLoopButton()
    }
  },
  { deep: true }
)

watch(
  () => state.loop.A,
  ( A ) => {
    console.log({A})
    if ( A ) {
      __activateLoopStart();
    } else {
      __deactivateLoopStart()
    }
  },
  { deep: true }
)
watch(
  () => state.loop.B,
  ( B ) => {
    console.log({B})
    if ( B ) {
      __activateLoopEnd();
    } else {
      __deactivateLoopEnd()
    }
  }
)
const getType = () => {
  if ( props.srcURL ) {
    const file = props.srcURL.split( '.' )
    const ext = file[file.length - 1]
    console.log( { ext } )
    switch ( ext ) {
      case 'ogg':
      case 'mp3':
        return `audio/${ext}`
        break;

      default:
        break;
    }
  }
    return 'video/mp4'
}
const elapsedTime = computed( () => {
  return MHSTime( state.elapsed )
} )
const videoTime = computed( () => {
  let duration = state.video?.duration ?? 0
  return `${MHSTime( state.elapsed )} / ${MHSTime( duration )}`
} )
const loopSet = computed( () => {
  let objLoop = state.loop
  console.log({objLoop})
  const isSet = ((state.loop.A !== null) && (state.loop.B !== null))
  console.log({isSet})
  if (isSet) __readyLoopButton()
} )
const __loopReady = () => {
  //TODO: validate readiness
}
const __readyLoopButton = () => {
  if ( __loopReady ) {
    state.btnLooper.setAttribute('loopReady','')
  }
}
const __activateLoopStart = () => {
  state.btnLoopStart.setAttribute( 'active', '' )
  state.btnLoopStart.classList.add('opacity-100')
}
const __deactivateLoopStart = () => {
  state.btnLoopStart.removeAttribute('active')
  state.btnLoopStart.classList.remove('opacity-100')
}
const __activateLoopEnd = () => {
  state.btnLoopEnd.setAttribute('active', '')
  state.btnLoopEnd.classList.add('opacity-100')
}
const __deactivateLoopEnd = () => {
  state.btnLoopEnd.removeAttribute('active')
  state.btnLoopEnd.classList.remove('opacity-100')
}
const __activateLoopButton = () => {
  state.btnLooper.removeAttribute('loopReady')
  state.btnLooper.setAttribute( 'loopPlaying', '' )
  state.icoLooper.classList.add( 'animate-spin' )
}
const __deactivateLoopButton = () => {
  state.btnLooper.removeAttribute( 'loopPlaying' )
  state.icoLooper.classList.remove( 'animate-spin' )
}
const __resetPlayButton = () => {
  if ( !state.btnPlay ) return;
   state.btnPlay.style.display = "block"
  state.btnPause.style.display = "none"
}

const __updateProgress = ( width ) => {
  if ( !state.timelineInnerBar ) return;
  state.timelineInnerBar.style.width = `${width}`
}

// pause or play the video
const play = ( e ) => {
  // Condition when to play a video
  if ( state.video.paused ) {
    state.btnPlay.style.display = "none"
    state.btnPause.style.display = "block"
    state.video.play()
  }
  else {
    state.btnPlay.style.display = "block"
    state.btnPause.style.display = "none"
    state.video.pause()
  }
}

// rewind the current time
const rewind = () => {
  state.video.currentTime = 0
}
const scan5 = ( val ) => {
  val = ( typeof val === 'number' ) ? val : 5
  state.video.currentTime = state.video.currentTime + val
}

const setTime = ( val ) => {
  state.video.currentTime = val
}

const setLoopTime = ( e ) => {
  const val = e.currentTarget.__vnode.props['data-loop']

  if ( !['A', 'B'].includes( val ) ) return;
  // switch ( val ) {
  //   case 'A':
  //     if ( state.loop.B < val ) state.loop.B = null
  //     break;

  //   default:
  //     break;
  // }
  state.loop[val] = state.video.currentTime
  console.log(`Loop ${val}: ${state.loop[val]}`)
}

const loop = () => {
  debugger
  console.log(state.looping)
  if ( !loopSet.value ) return;
  state.looping = !state.looping

  console.log( 'looping', loopSet.value )
}



/*
* interface functions
*
*/


// trigger fullscreen
const fullScreen = ( e ) => {
  e.preventDefault()
  video.requestFullscreen()
}
// download the video
const download = ( e ) => {
  e.preventDefault()
  let a = document.createElement( 'a' )
  a.href = video.src
  a.target = "_blank"
  a.download = ""
  document.body.appendChild( a )
  a.click()
  document.body.removeChild( a )
}


/*
* utility functions
*/

const test = ( e ) => {
  console.dir( state.video )
}
const MHSTime = ( seconds ) => {
  let strMMHHSS = '00:00:00'
  if ( !seconds ) seconds = 0;
  var measuredTime = new Date( null );
  measuredTime.setSeconds( seconds ); // specify value of SECONDS
  strMMHHSS = measuredTime.toISOString().substr( 11, 8 );
  return strMMHHSS
}
</script>

<style>
[active] {
  /* background-color: white; */
  border: 5px groove green;
  color: black;
}
[loopReady] {
  background-color: green;
}
[loopPlaying] {
  background-color: red;
}

</style>
