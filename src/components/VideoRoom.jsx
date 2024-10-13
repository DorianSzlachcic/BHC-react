import React, { useState } from 'react'
import { LocalUser, useJoin, useLocalCameraTrack, useLocalMicrophoneTrack, usePublish, useRemoteUsers, RemoteUser} from 'agora-rtc-react'
import '../assets/video_room.css'

const leave_url = "http://127.0.0.1:8000/api/leave_queue/"

export default function VideoRoom({appId, token, uid, channel, otherUser}) {
    const [calling, setCalling] = useState(true)
    useJoin({uid: uid, appid: appId, channel: channel, token: token}, calling)

    const [micOn, setMicOn] = useState(true)
    const [camOn, setCamOn] = useState(true)
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn)
    const { localCameraTrack } = useLocalCameraTrack(camOn)
    usePublish([localMicrophoneTrack, localCameraTrack])

    const remoteUsers = useRemoteUsers()

    return (
        <div className='room'>
            <div className="user-list">
                <div className='local-user'>
                    <LocalUser
                        videoTrack={localCameraTrack}
                        micOn={micOn}
                        cameraOn={camOn}>
                            <samp className="user-name">You</samp>
                    </LocalUser>
                </div>
                {remoteUsers.map((user) => (
                <div className="user" key={user.uid}>
                    <RemoteUser user={user}>
                        <samp className="user-name">{otherUser}</samp>
                    </RemoteUser>
                </div>
                ))}
            </div>
            <div className=''>
                {otherUser == 'Candidate' ?
                <div className="control">
                    <div className="left-control">
                    <button className="btn" onClick={() => setMicOn(a => !a)}>
                        <i className={`i-microphone ${!micOn ? "off" : ""}`} />
                    </button>
                    <button className="btn" onClick={() => setCamOn(a => !a)}>
                        <i className={`i-camera ${!camOn ? "off" : ""}`} />
                    </button>
                    <button className="btn" onClick={() => setCamOn(a => !a)}>
                        Następna osoba
                    </button>
                    </div>
                </div>:
                <div className="control">
                <div className="left-control">
                <button className="btn" onClick={() => setMicOn(a => !a)}>
                    <i className={`i-microphone ${!micOn ? "off" : ""}`} />
                </button>
                <button className="btn" onClick={() => setCamOn(a => !a)}>
                    <i className={`i-camera ${!camOn ? "off" : ""}`} />
                </button>
                <button className={`btn btn-phone`} onClick={() => {
                    fetch(`${leave_url}${uid}/${channel}`).then(res => console.log(res));
                    setCalling(a => !a)
                    }}>
                    <i className="i-phone-hangup" />
                </button>
                </div>
            </div>}
            </div>
        </div>
    )
}
