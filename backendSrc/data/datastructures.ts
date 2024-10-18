import { ObjectId } from 'mongodb'
interface UserProfile {
    password: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    status: string
}

interface Message {
    senderId: ObjectId;
    content: string;
    channelId?: ObjectId;
    recipientId?: ObjectId;
    createdAt: Date;
    likes: number;
}

interface Channels {
    name: string;
    isLocked: boolean;
    participants: ObjectId[];
    createdAt: Date;
}

