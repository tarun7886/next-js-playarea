import React, { useState } from 'react'
import useSocket from '../../hooks/useSocket'
import { Button } from 'antd'
import {SoundOutlined, AudioOutlined, AudioMutedOutlined} from '@ant-design/icons'

const Audio = (props) => {
    const [speaking, setSpeaking]= useState(false)
    const [socketRef] = useSocket()
    
    const handleLocalInput = (e) => {
        setSpeaking(!speaking)
    }

    return <div className='audio_call_wrapper'>
        <Button icon={<SoundOutlined />} >
        <audio id = "remoteAudio" 
                  controls autoplay></audio> 
        </Button>
        
        <Button icon={speaking ? <AudioOutlined /> : <AudioMutedOutlined />} 
            onClick={handleLocalInput}
        >
            <audio id = "localAudio" 
               controls autoplay></audio>
        </Button>
        
        
    </div>
}

export default Audio