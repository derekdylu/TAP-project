import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPlayings } from '../Features/PlayingsSlice';
import { selectAllPages } from '../Features/PagesSlice'

import alienForest from '../Images/alien-forest.mp3'

const Music = () => {
  const dispatch = useDispatch()
  const [audio] = useState(new Audio(alienForest))
  const _playing = useSelector(selectAllPlayings)
  const playing = _playing[0].status
  const pages = useSelector(selectAllPages)
  const page = pages[0].pageIndex
  const [forceStop, setForceStop] = useState(false)

  useEffect(() => {
    playing ? audio.play() : audio.pause()
  }, [playing])

  useEffect(() => {
    if (page >= 8) audio.pause()
  }, [page])

  useEffect(() => {
    audio.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false)
  }, []);

  return (
    <></>
  )
}

export default Music