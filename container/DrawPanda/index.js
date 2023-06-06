import React from 'react'
import useSocket from '../../hooks/useSocket'
import Messages from './Messages'
import Board from './Board'
import {Row, Col, Divider, Button} from 'antd'
import {PlayCircleOutlined} from '@ant-design/icons'

const DrawPandaContainer = ({roomId, user, admin}) => {
  const [socketRef] = useSocket()

  return (
    <div className='draw-panda-wrapper' >
      <Row justify={"center"} gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
      <div className='panda-header' >
        <div>{user}</div>
        <div>Id: {roomId}</div>
        {
          admin === user ? <Button icon={<PlayCircleOutlined />} > Start</Button> : null
        }
      </div>
        <Divider/>
        <Board
          socketRef={socketRef}
          roomId={roomId}
          user={user}
        />
        <Divider/>
      </Col>
        <Messages
          socketRef={socketRef}
          roomId={roomId}
          user={user}
        />
        </Row>
    </div>
  )
}

export default DrawPandaContainer
