import React, {useState, useEffect} from 'react'
import AgoraRTC, {AgoraRTCProvider} from 'agora-rtc-react';
import { useParams } from 'react-router-dom';
import VideoRoom from './components/VideoRoom';

const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'})
const token_generation_url = 'http://127.0.0.1:8000/api/generate_token/'; // 0: username, 1: channel

export default function RecruiterSide() {
    const [appId, setAppId] = useState(null)
    const [token, setToken] = useState(null)
    const [uid, setUid] = useState(null)
    const [connected, setConnected] = useState(false)
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

    if(!connected || appId === null || token === null)
      return <div>Connecting...</div>

    return (
    <AgoraRTCProvider client={client}>
      <VideoRoom appId={appId} token={token} uid={uid} channel={channel} otherUser={'Candidate'} />
    </AgoraRTCProvider>
    )
}
