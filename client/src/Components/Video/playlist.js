export const playlist=(videos,video)=>{
    const related =videos?(
        videos.filter(r=>{
         return (
          r.video_type==='spritual'?(
            r.spritualfor===video.spritualfor && r._id!==video._id
          ):(r.video_type===video.video_type&&
            r._id!==video._id)
           )
        })):([])
    const vid=videos?(
        videos.filter(r=>{
          return (r.video_type===video.video_type)
        })):([])
      const index=vid.indexOf(video)
      const length=related.length
      const relatedvideos=related.slice(index,length)
      const nextvideo=relatedvideos[0]
      /**
       * nextvideo -return an object of info which next video is played
       * relatedvideos-return an array of videos which played next starting from current video
       * related -return an array of videos which is related to the current video(video)
       */
      return {nextvideo,relatedvideos,related}
}