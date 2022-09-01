import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMediaStore = defineStore('media', () => {
  /**
   * Current name of the user.
   */
  const media: {[key:string]:string | object} = {
    youtube: [{ videoId: 'LBV1Oi0Ktqk' }, { videoId: 'ui717bVHS4I&t' }, { videoId: 'BVZun7h8UsU' }],
    vimeo: [{videoId: "485661867"}, {videoId: '537687842'}, {videoId: '541874754'}],
    video: [{
      poster: "https://media.vimejs.com/poster.png",
      srcURL: "https://media.vimejs.com/720p.mp4",
      type: 'video/mp4',
      subtitles: {
        src: "https://media.vimejs.com/subs/english.vtt",
        lang: 'en',
        label: 'English'
      }
    }]
  }
  const currentMedia: object | any  = ref({})
  const getItem = ( items: any ) => items[Math.floor( Math.random() * items.length )];

  // testing random input
  const randomMediaProp = () => {
    var keys = Object.keys( media );
    var idx = keys.length * Math.random() << 0
    return media[keys[ idx]];
};
 const randomMediaKey = () => Object.keys(media).map((e, i, a) => {

    // Getting a random value between [i, a.length]
    // Math.floor can be translated as ~~
    let j = Math.floor(Math.random() * (a.length - i) + i);

    // Switching the elements of positions i & j
    [a[i], a[j]] = [a[j], a[i]];

    // Returning current value
    return a[i];

}).slice(0,1);
  // const usedNames = computed(() => Array.from(previousNames.value))
  // const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
  //  * @param media - object - type=media type, data=data object
  //  */
  function setCurrentMedia(media: object) {
    currentMedia.value = media
  }

  // getters
  const types = computed(() => Object.keys(media))
  const getCurrent = computed(() => currentMedia.value)

  return {
    setCurrentMedia,
    getCurrent,
    types,
    media,
    getItem,
    randomMediaProp,
    randomMediaKey,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
