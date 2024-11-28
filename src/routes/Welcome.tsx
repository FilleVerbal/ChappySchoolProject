import { FC } from "react"
import Header from "../components/Header"
import ChannelSidebar from "../components/ChannelSidebar"
import MainContent from "../components/MainContent"
import '../styles/welcome.css'


const Welcome: FC = () => {

    return (
		<div className="app-container">
			<Header />
			<div className="content-wrapper">
				<ChannelSidebar />
				<MainContent />

			</div>

		</div>

    )
}

export default Welcome