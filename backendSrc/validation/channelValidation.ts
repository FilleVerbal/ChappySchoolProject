import { Channel } from "../data/datastructures.js";
import Joi from 'joi'

export type validationResult = ValidationSuccess | ValidationFailure

interface ValidationSuccess {
    success: true;
    value: Channel[];
}

interface ValidationFailure {
    success: false;
    error: string;
}

const channelSchema = Joi.object<Channel>({
    name: Joi.string().required().trim().min(3).max(40),
    isLocked: Joi.boolean().required(),
    participants: Joi.array().optional(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    createdBy: Joi.string().required().trim().min(24).max(24)
})

export function validateChannel(channel: Channel): validationResult {
    const result = channelSchema.validate(channel, {abortEarly: false})
    if (result.error) {
        return {
            success: false,
            error: result.error.details.map(detail => detail.message).join(', ')
        }
    } else {
        return {
            success: true,
            value: [channel]
        }
    }
}