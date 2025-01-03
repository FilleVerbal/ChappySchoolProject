import useAuthStore from "../data/store.ts"
import { useState, useEffect, FC } from "react"
import { FetchedUsers, Message } from "../data/datastructures.ts"
import '../styles/maincontent.css'

const MainContent: FC = () => {
    const [input, setInput] = useState('')
    const {selectedChannel, selectedUser, messages, setMessages, userId, users, setUsers, channels, username} = useAuthStore()

    const getMessages = async () => {
        try {
            const response = await fetch('/api/messages')
            if (response.ok) {
                const data: Message[] = await response.json()
                setMessages(data)
            }
        } catch (error) {
            console.error('Failed to get messages', error)
        }
    }
    const getUsers = async () => {
        try {
            const response = await fetch('/api/users')
            if (response.ok) {
                const data: FetchedUsers[] = await response.json()
                setUsers(data)
            }
        } catch (error) {
            console.error('Could not get users', error)
        }
    }
    useEffect(() => {
        getMessages()
        getUsers()
    }, [setMessages, setUsers])

    // Testade att ta bort dependency arrayen ovan men då fick konsolen fnatt och felmeddelandena bara hopade sig snabbare än jag hann kika på de så de får vara där trots att linten säger att de inte ska vara där

    const channelName: string = channels.find(channel => channel._id === selectedChannel)?.name || ''
    const dmUserName: string = users.find(user => user._id === selectedUser)?.username || ''

    const filteredMessages = messages.filter(message => {
        if (selectedChannel) {
            return message.channelId === selectedChannel
        }
        if (selectedUser) {
            return (
                (message.recipientId === selectedUser && message.senderId === userId) || 
                (message.senderId === selectedUser && message.recipientId === userId)
            )
        }
        return false
    })

    const sendMessage = async () => {
        if (!input.trim()) {
            return
        }
        const newMessage: Partial<Message> = {
            content: input,
            senderId: userId,
            createdAt: new Date(),
            likes: 0,
            dislikes: 0,
        }
        if (selectedChannel) {
            newMessage.channelId = selectedChannel
        } else if (selectedUser) {
            newMessage.recipientId = selectedUser
        }
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage)
            })
            if (response.ok) {
                await response.json()
                getMessages()
                setInput('')
            }
        } catch (error) {
            console.error('Failed to send message', error)
        }
    }


    return (
        <>
        <section className="main-content-container">
            <div className="chat-area">
                <section className="heading">
                    {selectedChannel ? (
                        <span>Messages in <span className="chat-name">#{channelName}</span> </span>
                    ) : selectedUser ? (
                        <span>DMs with <span className="chat-name">{dmUserName}</span></span>
                    ) : (
                        <span>Welcome</span>
                    )}
                </section>
                    <section className="history">
                        {filteredMessages.map((m) => {
                            const senderName =
                                m.senderId === userId
                                    ? username || "Guest"
                                    : users.find((user) => user._id === m.senderId)?.username ||
                                      "Guest";

                            return (
                                <section
                                    key={m._id}
                                    className={
                                        m.senderId === userId
                                            ? "my-messages"
                                            : "messages"
                                    }
                                >
                                    <p>
                                        {senderName}: {m.content}
                                    </p>
                                    <p>
                                        {new Date(m.createdAt).toLocaleString()}
                                    </p>
                                </section>
                            );
                        })}
                    </section>
                <section className="message-input">
                    <input
                        type="text"
                        placeholder="Say Something..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                </section>
            </div>
        </section>
        </>

    )
}

export default MainContent