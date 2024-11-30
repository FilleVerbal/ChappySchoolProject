import { ObjectId } from 'mongodb'

export interface UserProfile {
    password: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    status: string
}

export interface Message {
    senderId?: string;
    content: string;
    channelId?: string;
    recipientId?: string;
    createdAt: Date;
    updatedAt: Date;
    likes: number;
    dislikes: number;
}

export interface Channel {
    name: string;
    isLocked: boolean;
    participants?: ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: ObjectId;
}

// export { UserProfile, Message, Channel }