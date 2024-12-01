# Chappy API Documentation

This is the API for a chat app with Node.ts, Express, and MongoDB Atlas. The API provides functionality for users, channels, and messages. Below is the detailed information on how to interact with the API. 

## Base URL
/api


## Endpoints

### Channels

1. **Get All Channels**
   - **URL**: `/channels`
   - **Method**: `GET`
   - **Description**: Fetch all channels.
   - **Response**:
     ```json
        {
            _id: ObjectId;
            name: string;
            isLocked: boolean;
            participants?: string[];
            createdAt: Date;
            updatedAt: Date;
            createdBy: ObjectId;
        }
     ```

2. **Add a New Channel**
   - **URL**: `/channels`
   - **Method**: `POST`
   - **Body**:
     ```json
        {
            name: string;
            isLocked: boolean;
            participants?: string[];
            createdAt: Date;
            updatedAt: Date;
            createdBy: ObjectId;
        }
     ```
   - **Description**: Add a new channel to the database.

### Messages

1. **Get All Messages**
   - **URL**: `/messages`
   - **Method**: `GET`
   - **Description**: Fetch all messages.
   - **Response**:
     ```json
        {
            _id: ObjectId;
            senderId?: string;
            content: string;
            channelId?: string;
            recipientId?: string;
            createdAt: Date;
            updatedAt: Date;
            likes: number;
            dislikes: number;
        }
     ```

2. **Send message**
   - **URL**: `/message`
   - **Method**: `POST`
   - **Body**:
     ```json
        {
            senderId?: string;
            content: string;
            channelId?: string;
            recipientId?: string;
            createdAt: Date;
            updatedAt: Date;
            likes: number;
            dislikes: number;
        }
     ```
   - **Description**: Send message in channel or dm.

### Users

1. **Get All Users**
   - **URL**: `/users`
   - **Method**: `GET`
   - **Description**: Fetch all users.
   - **Response**:
     ```json
        {
            _id: string;
            username: string;
        }
     ```

2. **Login user**
   - **URL**: `/users/login`
   - **Method**: `POST`
   - **Body**:
     ```json
        {
           email: string;
           password: string;
        }
     ```
   - **Response on success**:
     ```json
        {
              token: string;        // JWT to authenticate future requests
              username: string;     // The username of the logged-in user
              userId: string;       // The unique ID of the user
        }
     ```
   - **Description**: Login and get a jwt.


## Validation

All incoming requests are validated using Joi to ensure the correct data structure and will respond with the appropriate status codes.

## Frontend Integration

For frontend developers, use fetch or any other HTTP client to interact with these endpoints. Ensure that your requests include the appropriate headers and body (for POST/PUT requests).