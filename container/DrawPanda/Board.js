import { Button, Space } from "antd"
import React, { useRef, useEffect, useState } from "react";
import { isMobileBrowser } from "../../services/utils";
import DownloadCanvas from "./DownloadCanvas";

const debouceSendData = (fxn, delay, limit) => {
  let data = []
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    data.push(args)
    if (limit && data.length > limit) {
      fxn.call(this, data)
      data = []
    }
    timer = setTimeout(() => {
      fxn.call(this, data)
      data = []
    }, delay);
  }
}

const Board = ({roomId, drawing, socketRef}) => {
    const canvasRef = useRef(null);
    const [isMobile, setIsMobile] = useState(true)
    const [dimensions, setDimensions] = useState({
      height: 100,
      width: 100
    })

    useEffect(() => {
      let board = document.getElementById("panda_board")
      board.addEventListener("scroll", (e) => {
        e.stopPropagation()
      })
    }, [])

    useEffect(() => {
      function calculateDim(){
        let el = document.getElementById("panda_board")
        const width = el.clientWidth
        const height = el.clientHeight
        // let temp = {width: Math.min(width, height), height: Math.min(width, height)}
        // if (dimensions.height !== temp.height || dimensions.width !== temp.width) {
        //   canvasRef.current.style.height = `${temp.height}px`
        //   canvasRef.current.style.width = `${temp.width}px`
        //   setDimensions(temp)
        // }
        canvasRef.current.style.height = `${height}px`
        canvasRef.current.style.width = `${width}px`
        setDimensions({height, width})
      }
      setIsMobile(isMobileBrowser())
      calculateDim()
      window.addEventListener("resize", calculateDim)
      return () => window.removeEventListener("resize", calculateDim)
    }, [])

    let isDrawing =false;
    let lastX =0;
    let lastY =0;

    const getPointOnCanvas = (e) => {
      if (e instanceof PointerEvent || e instanceof MouseEvent) {
        return {x: e.offsetX, y: e.offsetY}
      } else if (e instanceof TouchEvent) {
        const touch = e.touches[0];
        const canvasRect = canvasRef.current.getBoundingClientRect()
        let offsetLeft = canvasRect.left + window.scrollX
        let offsetTop = canvasRect.top + window.scrollY
        return {x: touch.clientX - offsetLeft, y: touch.clientY - offsetTop}
      }
    }

    const clearCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    }

    const figureOutOffset = (orgHeight, orgWidth) => {
      const {width, height} = dimensions
      let offsetWidth = 0
      let offsetHeight = 0
      if (orgWidth / orgHeight < width / height) {
        offsetWidth = (width - (orgWidth / orgHeight * height)) / 2
      } else {
        offsetHeight = (height - (orgHeight / orgWidth * width)) / 2
      }
      return {
        offX: offsetWidth,
        offY: offsetHeight,
      }
    }

    useEffect(() => {
      if (!socketRef.current) {
        return () => {}
      }
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const {height, width} = dimensions

      function drawLine(context, x1, y1, x2, y2, orgHeight, orgWidth) {
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        context.beginPath();
        const {offX, offY} = figureOutOffset(orgHeight, orgWidth)
        context.moveTo(offX + (x1 * (width - 2 * offX)) , offY + (y1 * (height - 2 * offY)));
        context.lineTo(offX + (x2  * (width - 2 * offX)), offY + (y2 * (height - 2 * offY)));

        context.stroke();
      }

      function handleDrawingData(data) {
        data.map(el => {
          const { lastX, lastY, endX, endY, height: orgHeight, width: orgWidth } = el[0];
          drawLine(ctx, lastX, lastY, endX, endY, orgHeight, orgWidth);
        })
      }
      function sendDrawingData(data) {
        socketRef.current.emit('drawingData', {roomId, data});
      }

      const debouceSend = debouceSendData(sendDrawingData, 1000, 100)

      function handleStart(e) {
        isDrawing = true
        lastX = getPointOnCanvas(e).x
        lastY = getPointOnCanvas(e).y
      }
      function handleMove(e){
        if (!isDrawing) return
        const x = getPointOnCanvas(e).x
        const y = getPointOnCanvas(e).y

        drawLine(ctx, lastX / width, lastY / height, x / width, y / height, height, width);
        debouceSend({lastX: lastX / width, lastY: lastY / height, endX: x / width, endY:y/ height, height, width});
        lastX = x
        lastY = y
      }
      function handleEnd(e){
        isDrawing = false
      }
      console.log({isMobile})
      if (!isMobile) {
        canvas.addEventListener("mousedown" , handleStart, false);
        canvas.addEventListener('mousemove', handleMove, false);
        canvas.addEventListener('mouseup', handleEnd, false);
        canvas.addEventListener("mouseout", handleEnd, false);
        canvas.addEventListener("mouseleave", handleEnd, false);
        canvas.addEventListener("mousecancel", handleEnd, false);
      } else {
        canvas.addEventListener('touchstart', handleStart, false);
        canvas.addEventListener('touchmove', handleMove, false);
        canvas.addEventListener('touchend', handleEnd, false);
        canvas.addEventListener('touchcancel', handleEnd, false);
      }
  
      socketRef.current.on('drawingData', handleDrawingData);
      socketRef.current.on('clearCanvas', clearCanvas);

      return () => {
        if (!isMobile) {
          canvas.removeEventListener('pointerdown', handleStart);
          canvas.removeEventListener('pointermove', handleMove);
          canvas.removeEventListener('pointerup', handleEnd);
        } else {
          canvas.removeEventListener('touchstart', handleStart);
          canvas.removeEventListener('touchmove', handleMove);
          canvas.removeEventListener('touchend', handleEnd);
        }
          
          socketRef.current.off('drawingData', handleDrawingData);
          socketRef.current.off('clearCanvas', clearCanvas);
        };

    }, [isMobile, dimensions, socketRef.current])

    return <div id="panda_board" className="draw-panda-board">
        <canvas id="my_canvas" ref={canvasRef} width={dimensions.width} height={dimensions.height} />
        <Space className="canvas_actions" >
          <Button onClick={() => {
            socketRef.current.emit("clearCanvas", {roomId})
            clearCanvas()
          }}>Clear Canvas</Button>
          <DownloadCanvas
            canvas={canvasRef.current}
          />
        </Space>
    </div>
}

export default Board