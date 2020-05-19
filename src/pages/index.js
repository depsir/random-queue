import React, { useEffect, useState } from "react"
import "../../static/style.css"
import {shuffle} from 'lodash';

export default () => {

  const [queue, setQueue] = useState([])
  const [index, setIndex] = useState(null)
  const [rawData, setRawData] = useState("")

  const initialize = (rawData) => {
    const nextQueue = rawData.split(/[,\n]/).map(e=>e.trim())
    setQueue([...shuffle(nextQueue), "The End"])

  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('data');
    if (myParam)
      initialize(myParam)
  }, [])

  const startButton = <div><button onClick={() => {setIndex(0)}}>Start</button></div>

  const input = <div>
    <div><textarea onChange={(e) => setRawData(e.target.value)}>{rawData}</textarea></div>
    <div><button onClick={() => {initialize(rawData); setIndex(0)}}>Start</button></div>
  </div>

  const current = <div style={{padding: "30px", border: "1px solid black"}} onClick={() => setIndex(index + 1)}>
    <div>{queue[index]}</div>
  </div>

  return <div style={{height: "100vh", width: "100vw", display: "flex", justifyContent: "space-around", alignItems: "center"}}>
    <div>{index !== null ? current : queue.length === 0 ? input : startButton}</div>
  </div>
}
