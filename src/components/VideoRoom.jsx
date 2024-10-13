import React, { useEffect, useState } from 'react'
import { useJoin } from 'agora-rtc-react'
import { useParams } from 'react-router-dom'


export default function VideoRoom({appId, token, username, channel}) {
    useJoin({uid: username, appid: appId, channel: channel, token: token}, true)

    return (
        <div>VideoRoom</div>
    )
}
