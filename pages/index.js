import PageTitle from "../components/PageTitle"
import Header from '../components/Header'
import HideShowImage from '../components/HideShowImage'
import FixedTopBottom from '../components/FixedTopBottom'

export default function Home() {
  return (
    <div className="container">
      <PageTitle title="Home" />
      <Header/>
      <div className="landing-page-banner">
        <div style={{height: "70vh", background: "#ddd"}} ></div>
        <HideShowImage/>
        <FixedTopBottom/>
      </div>
      <div className="footer" >

      </div>
    </div>
  )
}
