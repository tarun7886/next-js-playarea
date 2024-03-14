import PageTitle from "../components/PageTitle"
import Header from '../components/Header'
import HideShowImage from '../components/HideShowImage'
import FixedTopBottom from '../components/FixedTopBottom'
import styled from "styled-components"

const BackgroundBanner = styled.div`
  height: 70vh;
  background-image: url('https://i.postimg.cc/mDdBjRLf/IMG-20230820-170858.jpg');
  background-size: 100% 100%;
  background-position: center;
`

export default function Home() {
  return (
    <div className="container">
      <PageTitle title="Home" />
      <Header/>
      <div className="landing-page-banner">
        <BackgroundBanner/>
        <HideShowImage/>
        <FixedTopBottom/>
      </div>
      <div className="footer" >
      </div>
    </div>
  )
}
