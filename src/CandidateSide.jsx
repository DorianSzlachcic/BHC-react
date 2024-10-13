import React, {useState, useEffect} from 'react'
import AgoraRTC, {AgoraRTCProvider} from 'agora-rtc-react'
import VideoRoom from './components/VideoRoom'
import WaitingRoom from './components/WaitingRoom'
import { useParams } from 'react-router-dom'

const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'})
const token_generation_url = 'http://127.0.0.1:8000/api/generate_token/'; // 0: username, 1: channel
const queue_url = 'http://127.0.0.1:8000/api/place_in_queue/'; // 0: username, 1: channel

export default function CandidateSide() {
    const [queue, SetQueue] = useState(10)
    const [appId, setAppId] = useState(null)
    const [token, setToken] = useState(null)
    const [uid, setUid] = useState(null)
    const [connected, setConnected] = useState(false)
    const [updateQueue, setUpdateQueue] = useState(false)
    const {username, channel} = useParams()

    useEffect(() => {
        fetch(token_generation_url + `${username}/${channel}`)
            .then(res => res.json())
            .then(json => {
                setAppId(json['app_id'])
                setToken(json['token'])
                setUid(json['uid'])
            })
            setConnected(true)
    }, [])

    useEffect(() => {
      fetch(queue_url + `${username}/${channel}`)
      .then(res => res.json())
      .then(json => {
          SetQueue(json['place'])
      })
    }, [updateQueue])

    if(queue != 0)
      setTimeout(() => {
        setUpdateQueue(!updateQueue)
      }, 5000)

    if(!connected)
      return <div>Connecting...</div>

    return (
    <AgoraRTCProvider client={client}>
      {queue != 0 ?
      <WaitingRoom queue={queue} /> :
      <VideoRoom appId={appId} token={token} uid={uid} channel={channel} otherUser={'Recruiter'} />}
    </AgoraRTCProvider>
    )
}
