import React, {useState, useEffect} from 'react'
import AgoraRTC, {AgoraRTCProvider} from 'agora-rtc-react'
import VideoRoom from './components/VideoRoom'
import WaitingRoom from './components/WaitingRoom'
import { useParams } from 'react-router-dom'

const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'})
const token_generation_url = 'http://127.0.0.1:8000/api/generate_token/'; // 0: username, 1: channel

export default function CandidateSide() {
    const [queue, SetQueue] = useState(5)
    const [appId, setAppId] = useState(null)
    const [token, setToken] = useState(null)
    const [connected, setConnected] = useState(false)
    const {username, channel} = useParams()
    console.log("abc")

    useEffect(() => {
        fetch(token_generation_url + `${username}/${channel}`)
            .then(res => res.json())
            .then(json => {
                setAppId(json['app_id'])
                setToken(json['token'])
            })
            setConnected(true)
    }, [])

    if(queue != 0)
      setTimeout(() => {
        SetQueue(queue - 1)
      }, 1000)

    if(!connected)
      return <div>Connecting...</div>

    return (
    <AgoraRTCProvider client={client}>
      {queue != 0 ?
      <WaitingRoom queue={queue} /> :
      <VideoRoom appId={appId} token={token} username={username} channel={channel} />}
    </AgoraRTCProvider>
    )
}
