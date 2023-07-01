import React, { useEffect, useReducer, useRef, useState } from 'react'
import useSocket from '../../hooks/useSocket'
import { Button } from 'antd'
import {SoundOutlined, AudioOutlined, AudioMutedOutlined} from '@ant-design/icons'

const Audio = (props) => {
    const [speaking, setSpeaking]= useState(false)
    const [socketRef] = useSocket()
    const [localRef] = useRef(null) 
    const [remoteRef] = useRef(null) 
    const [yourConn] = useRef(null)
    const [stream] = useRef(null)
    
    const handleLocalInput = (e) => {
        setSpeaking(!speaking)
        makeCallOffer()
    }
    useEffect(() => {
        if (!socketRef.current)  {
            return () => {}
        }
        //getting local audio stream 
      navigator.webkitGetUserMedia({ video: false, audio: true }, function (myStream) { 
        stream.current = myStream; 
           
        //displaying local audio stream on the page 
        localAudio.src = window.URL.createObjectURL(stream.current);
           
        //using Google public stun server 
        var configuration = { 
           "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }] 
        }; 
           
        yourConn.current = new webkitRTCPeerConnection(configuration); 
           
        // setup stream listening 
        yourConn.current.addStream(stream.current); 
           
        //when a remote user adds stream to the peer connection, we display it 
        yourConn.current.onaddstream = function (e) { 
           remoteAudio.src = window.URL.createObjectURL(e.stream); 
        }; 
           
        // Setup ice handling 
        yourConn.current.onicecandidate = function (event) { 
           if (event.candidate) { 
              send({ 
                 type: "candidate", 
                 candidate: event.candidate 
              }); 
           } 
        }; 
           
     }, function (error) { 
        console.log(error); 
        });
    }, [socketRef])

    const makeCallOffer = () => {
         // create an offer 
         yourConn.current.createOffer(function (offer) { 
            socketRef.current.emit("createOffer", {offer})
            
            yourConn.setLocalDescription(offer); 
        }, function (error) { 
            alert("Error when creating an offer"); 
        }); 
    }

    return <div className='audio_call_wrapper'>
        <Button icon={<SoundOutlined />} >
        <audio ref={remoteRef} id = "remoteAudio" 
                  controls autoplay></audio> 
        </Button>
        
        <Button icon={speaking ? <AudioOutlined /> : <AudioMutedOutlined />} 
            onClick={handleLocalInput}
        >
            <audio ref={localRef} id = "localAudio" 
               controls autoplay></audio>
        </Button>
        
        
    </div>
}

export default Audio