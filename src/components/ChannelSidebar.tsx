import { useEffect } from 'react'
import useAuthStore from '../data/store.ts'

const ChannelSidebar: React.FC = () => {
    const { isLoggedIn, channels, setChannels } = useAuthStore()
    // TODO: implement logic for channelfetching
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
    }, [])
    // 🔒
    // 🔑
    return (
        <nav>
		<ul>
			<li> [Channels] </li>
			{channels.map(c => (
                <li key={c._id} className={c.isLocked && !isLoggedIn ? 'locked-channel' : 'not-locked-channel'}>
                    <a href="#"> {c.name} </a>
                    {c.isLocked && !isLoggedIn && <span> 🔒 </span>}
                </li>
            ))}
		</ul>
	</nav>
    )
}

export default ChannelSidebar