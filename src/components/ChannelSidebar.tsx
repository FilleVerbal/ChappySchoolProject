import { useEffect, FC } from 'react'
import useAuthStore from '../data/store.ts'
import '../styles/channelsidebar.css'

const ChannelSidebar: FC = () => {
    const { isLoggedIn, channels, setChannels, setSelectedChannel, selectedChannel, users, selectedUser, setSelectedUser } = useAuthStore()
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
        <nav className='channel-sidebar-nav'>
		<ul className='channel-list'>
			<li className='sidebar-header'> [Channels] </li>
			{channels.map(c => (
                <li key={c._id} className={`${c._id === selectedChannel ? "selected-channel channel-sidebar" : "channel-sidebar"} ${c.isLocked && !isLoggedIn ? "locked-channel" : ""}`} onClick={() => !c.isLocked || isLoggedIn ? setSelectedChannel(c._id) : null}>
                    <span># {c.name} </span>
                    {c.isLocked && !isLoggedIn && <span> 🔒 </span>}
                </li>
            ))}
		</ul>
        <ul className="dm-list">
        <li className="sidebar-header"> [DM´s] </li>
        {users.map((user) => (
            <li
                key={user._id}
                className={`${user._id === selectedUser ? "selected-user user-sidebar" : "user-sidebar"} ${
                    !isLoggedIn ? "locked-user" : ""
                }`}
                onClick={() => isLoggedIn ? setSelectedUser(user._id) : null}
            >
                <span>{user.username}</span>
                {!isLoggedIn && <span> 🔒 </span>}
            </li>
        ))}
    </ul>
        {/* old code that i like better but goes against the assignment */}
        {/* {isLoggedIn && (
        <ul className='dm-list'>
            <li className='sidebar-header'> [DM´s] </li>
            {users.map((user) => (
                <li key={user._id} className={`${user._id === selectedUser ? "selected-user user-sidebar" : "user-sidebar"}`} onClick={() => setSelectedUser(user._id)}>
                    <span> {user.username} </span>
                </li>
            ))}
        </ul>

        )} */}
	</nav>
    )
}

export default ChannelSidebar