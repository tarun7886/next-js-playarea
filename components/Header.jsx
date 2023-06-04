import React, { useEffect, useState } from 'react'
let call = 0
const Header = (props) => {
  const [addShadow, setAddShadow] = useState(false)
  const handleScroll = (e) => {
    if (window.scrollY > 0 && !addShadow) {
      setAddShadow(true)
    }
    if (window.scrollY === 0 && addShadow) {
      setAddShadow(false)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", (e) => handleScroll(e))
    return () => window.removeEventListener("scroll", (e) => handleScroll(e))
  }, [addShadow])
  return <div className={`main-header ${addShadow ? "add-shadow" : ""}`}>
    <div className='logo-title'>Vrooom</div>
    <div className="navbar-btn-grp">
      <div className="navbar-login">
        <a className="navbar-login-btn" href="/login">Login</a>
      </div>
      <div className="navbar-touch">
        <button className="navbar-touch-btn">Get in touch</button>
      </div>
    </div>
  </div>
}

export default Header