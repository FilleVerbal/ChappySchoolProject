import { UserProfile } from "../data/datastructures.js";
import Joi from 'joi'

export type validationResult = ValidationSuccess | ValidationFailure

interface ValidationSuccess {
    success: true;
    value: UserProfile[];
}

interface ValidationFailure {
    success: false;
    error: string;
}

const userCreationSchema = Joi.object<UserProfile>({
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).trim().min(8).max(30),
    username: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).trim().min(4).max(24),
    email: Joi.string().required().email(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    status: Joi.string().optional()
})

export function validateNewUser(newUser: UserProfile): validationResult {
    const result = userCreationSchema.validate(newUser, {abortEarly: false})
    if (result.error) {
        return {
            success: false,
            error: result.error.details.map(detail => detail.message).join(', ')
        }
    } else {
        return {
            success: true,
            value: [newUser]
        }
    }
}