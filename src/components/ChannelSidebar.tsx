import { useEffect, FC } from 'react'
import useAuthStore from '../data/store.ts'
import '../styles/channelsidebar.css'

const ChannelSidebar: FC = () => {
    const { isLoggedIn, channels, setChannels, setSelectedChannel, selectedChannel } = useAuthStore()
    // TODO: also implement logic for active channel
    const getChannels = async () => {
        try {
            const response = await fetch('/api/channels')
            if (response.ok) {
                const data = await response.json()
                setChannels(data)
            }
        } catch (error) {
            console.error('Failed channel fetch', error)
        }
    }
    useEffect(() => {
        getChannels()
    }, [setChannels])
    useEffect(() => {
        if (channels.length > 0) {
            if (isLoggedIn) {
                setSelectedChannel(channels[0]._id)
            } else {
                const firstUnlockedChannel = channels.find((channel) => !channel.isLocked)
                if (firstUnlockedChannel) {
                    setSelectedChannel(firstUnlockedChannel._id)
                }
            }
        }
    }, [channels, isLoggedIn, setSelectedChannel])
    // 🔒
    // 🔑
    return (
        <nav>
		<ul>
			<li> [Channels] </li>
			{channels.map(c => (
                <li key={c._id} className={`${c._id === selectedChannel ? "selected-channel channel-sidebar" : "channel-sidebar"} ${c.isLocked && !isLoggedIn ? "locked-channel" : ""}`} onClick={() => !c.isLocked || isLoggedIn ? setSelectedChannel(c._id) : null}>
                    <a href="#"> {c.name} </a>
                    {c.isLocked && !isLoggedIn && <span> 🔒 </span>}
                </li>
            ))}
		</ul>
	</nav>
    )
}

export default ChannelSidebar