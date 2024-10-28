import { Message } from "../data/datastructures.js";
import Joi from 'joi'

export type validationResult = ValidationSuccess | ValidationFailure

interface ValidationSuccess {
    success: true;
    value: Message[];
}

interface ValidationFailure {
    success: false;
    error: string;
}

const messageSchema = Joi.object<Message>({
    senderId: Joi.string().optional().trim().min(24).max(24),
    content: Joi.string().required().trim().min(1),
    channelId: Joi.string().optional().trim().min(24).max(24),
    recipientId: Joi.string().optional().trim().min(24).max(24),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    likes: Joi.number().required().positive().precision(0).strict(),
    dislikes: Joi.number().required().positive().precision(0).strict()
}).with("recipientId", "senderId")

export function validateMessage(message: Message): validationResult {
    const result = messageSchema.validate(message, {abortEarly: false})
    if (result.error) {
        return {
            success: false,
            error: result.error.details.map(detail => detail.message).join(', ')
        }
    } else {
        return {
            success: true,
            value: [message]
        }
    }
}