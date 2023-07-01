import { DownloadOutlined } from '@ant-design/icons'
import {Button} from 'antd'

const DownloadCanvas = (props) => {
    const downloadCanvas = () => {
        const {canvas} = props
        const href = canvas.toDataURL('image/jpeg')
        var link = document.createElement('a')
        link.href = href
        link.download = "draw-panda"
        link.click()
        setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(href)
        }, 100)
    }
    return <Button className='download-canvas' onClick={downloadCanvas} type="primary" shape="circle" icon={<DownloadOutlined/>} />

}

export default DownloadCanvas