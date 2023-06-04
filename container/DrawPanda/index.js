import React from 'react'
import useSocket from '../../hooks/useSocket'
import Messages from './Messages'
import {Row, Col, Divider} from 'antd'

const DrawPandaContainer = ({roomId, user, admin}) => {
  const [socketRef] = useSocket()

  return (
    <div className='draw-panda-wrapper' >
      <Row justify={"center"} gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
      <div>
        Room Id: {roomId} <br/>
        User: {user} <br/>
        Admin: {admin} <br/>
        <Divider/>
        <Messages
          socketRef={socketRef}
          roomId={roomId}
          user={user}
        />
      </div>
      </Col>
        </Row>
    </div>
  )
}

export default DrawPandaContainer
