import React from 'react'
import useSocket from '../../hooks/useSocket'
import Messages from './Messages'

const DrawPandaContainer = ({roomId, user, admin}) => {
  const [socketRef] = useSocket()

  return (
    <div>
      roomId: {roomId} <br/>
      user: {user} <br/>
      admin: {admin} <br/>
      <Messages
        socketRef={socketRef}
        roomId={roomId}
        user={user}
      />
    </div>
  )
}

export default DrawPandaContainer
