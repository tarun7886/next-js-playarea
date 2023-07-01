import React, { useEffect, useState } from 'react'

const HideShowImage = (props) => {
  const [position, setPosition] = useState(100)
  const handleScroll = (e) => {
    let element = document.getElementById("imageContainer")
    let top = element.getBoundingClientRect().top
    let viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    if (top > viewHeight && position !== 100) {
     return setPosition(100)
    }
    if (top <= 0) {
      return setPosition(0)
    }
    setPosition(Math.max(0, top - 120) / (viewHeight - 120) * 100)
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [position])
  return <div className='hide-show-container'>
      <h1>You shouldn’t be the only one eating healthy.</h1>
      <p>Like you, we love our pets and care about their health. That’s why we created The Farmer’s Dog — a service that delivers balanced, freshly made pet food with simple recipes, guided by science, and driven by love</p>
      <div className='image-container' id="imageContainer" >
        <div className='image-block-1'>
          <img
            className='hide-show-images'
            src={'/shimla.jpg'}
          />
        </div>
         <div className='image-block-2' style={{width: `${position}%`}}>
          <img
            className='hide-show-images'
            src={'/shimla_grayscale.png'}
          />
        </div>
        <div className='vertical-bar' style={{left: `${position}%`}} >
        </div>
      </div>
  </div>
}

export default HideShowImage