import React, { useRef, useEffect, useState } from 'react';
import { io } from "socket.io-client";

function Canvas() {
  const [input, setInput] = useState('')
  const [room, setRoom] = useState('')

  const canvasRef = useRef(null);
  const socketRef = useRef();
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  useEffect(() => {
    if (room) {
      socketRef.current.emit('join',{name: "Tarun" + Date.now(), room}, (error) => {
        if(error) {
          console.log(error);
            // alert(error);
        }
    })
  }
  // return () => {
  //     // socketRef.current.emit('disconnected');
  //     // socketRef.current.off();
  // }
  }, [room])

  useEffect(() => socketInitializer(), [])
  const socketInitializer = async () => {
    await fetch('/api/socket');
    socketRef.current = io()
  
    socketRef.current.on('connect', () => {
      console.log('connected')
    })
    socketRef.current.on("message", (mes)=> {
      console.log(mes)
    })
  
    socketRef.current.on('update-input', msg => {
      setInput(msg)
    })
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    socketRef.current = io();

    function handlePointerDown(e) {
      isDrawing = true;
      console.log(canvas.offsetLeft, canvas.offsetTop);
      lastX = e.clientX - canvas.offsetLeft;
      lastY = e.clientY - canvas.offsetTop;
    }
    function handleTouchStart(e) {
      const touch = e.touches[0];
      isDrawing = true;
      lastX = touch.clientX - canvas.offsetLeft;
      lastY = touch.clientY - canvas.offsetTop;
    }
    function handleTouchMove(e) {
      e.preventDefault();
      const touch = e.touches[0];
      const x = touch.clientX - canvas.offsetLeft;
      const y = touch.clientY - canvas.offsetTop;

      drawLine(ctx, lastX, lastY, x, y);
      sendDrawingData(lastX, lastY, x, y);

      lastX = x;
      lastY = y;
    }
    function handleTouchEnd() {
      isDrawing = false;
    }
    function drawLine(context, x1, y1, x2, y2) {
      context.strokeStyle = 'black';
      context.lineWidth = 5;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    }


    function handlePointerMove(e) {
      if (isDrawing) {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        drawLine(ctx, lastX, lastY, x, y);
        sendDrawingData(lastX, lastY, x, y);

        lastX = x;
        lastY = y;
      }
    }
    function handleDrawingData(data) {
      const { startX, startY, endX, endY } = data;
      drawLine(ctx, startX, startY, endX, endY);
    }

    function sendDrawingData(startX, startY, endX, endY) {
      socketRef.current.emit('drawingData', {
        startX,
        startY,
        endX,
        endY,
      });
    }

    function handlePointerUp() {
      isDrawing = false;
    }

    canvas.addEventListener("pointerdown" , handlePointerDown, false);
    canvas.addEventListener('pointermove', handlePointerMove, false);
    canvas.addEventListener('pointerup', handlePointerUp, false);

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
    socketRef.current.on('drawingData', handleDrawingData);


    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);

      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      socketRef.current.off('drawingData', handleDrawingData);
    };
  }, []);
  const onChangeHandler = (e) => {
    setInput(e.target.value)
    socketRef.current.emit('input-change', e.target.value)
  }


  return <div className='draw-panda-wrapper '>
      <canvas ref={canvasRef} width={200} height={200} />
      <input onBlur={e => setRoom(e.target.value)} />
      <input
      placeholder="Type something"
      value={input}
      onChange={onChangeHandler}
    />
  </div> 
}

export default Canvas;
