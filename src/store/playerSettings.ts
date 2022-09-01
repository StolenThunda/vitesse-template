interface Loop {
  start: number,
  end: number
}

import { acceptHMRUpdate, defineStore } from 'pinia'
export const useSettingsStore = defineStore('settings', () => {
  /**
   * Default settings of player.
   */
  const loopStart = ref(0)
  const loopEnd = ref( 0 )
  const isLooping = ref(false)
  const loopList = ref( new Set<Loop>() )
  let currentLoop:Loop

  const loopReady = computed( () => {
    return  loopEnd.value > loopStart.value
  } )

  // getters
  // const getEnd = computed(() => loopEnd.value)
  const getCurrentLoop = computed(() => currentLoop)
  const get_start = computed(() => Number(loopStart.value.toFixed(2)))
  const get_end = computed( () => Number(loopEnd.value.toFixed(2) ))
  const looping = computed(() => isLooping.value)
  // const usedNames = computed(() => Array.from(previousNames.value))
  // const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))
  /**
   * Sets looping status
   *
   *
   */
  function toggleLooping (  ) {
    isLooping.value = !isLooping.value
  }
  /**
   * Sets start of the loop
   *
   * @param time - currentTime to set
   */
  function setLoopPart ( type: string, time: number ) {
    if ( !['start', 'end'].includes( type ) ) return false
    if ( type === 'start' ) {
      loopStart.value = time
      if (loopStart.value >= loopEnd.value) loopEnd.value = 0
    } else {
      loopEnd.value = time
      if (loopEnd.value <= loopStart.value) loopStart.value = 0
    }
    return true
  }

  const getLoopPart = (part: string) => {
    let retVal = null
    switch ( part ) {
      case 'start':
        retVal = loopStart.value
      case 'end':
        retVal= loopEnd.value
      default:
        break;
    }
    return retVal
  }
  /**
   * Clears loop
   *
   */
  function clearLoop() {
    loopStart.value = 0;
    loopEnd.value = 0
  }

  return {
    loopList,
    looping,
    toggleLooping,
    loopReady,
    setLoopPart,
    clearLoop,
    getLoopPart,
    get_end,
    get_start,
    getCurrentLoop
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
