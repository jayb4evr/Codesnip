# API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-backend-url.com/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### Authentication

#### `GET /auth/google`
Initiate Google OAuth flow.

**Response:**
Redirects to Google OAuth consent screen.

---

#### `GET /auth/google/callback`
Google OAuth callback endpoint.

**Query Parameters:**
- Handled automatically by Google OAuth

**Response:**
Redirects to frontend with JWT token:
```
{frontend_url}/auth/callback?token={jwt_token}
```

---

#### `GET /auth/me`
Get current authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "googleId": "1234567890",
  "email": "user@example.com",
  "name": "John Doe",
  "picture": "https://...",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Errors:**
- `401 Unauthorized` - No token or invalid token
- `404 Not Found` - User not found

---

#### `POST /auth/logout`
Logout user (client should remove token).

**Response:** `200 OK`
```json
{
  "message": "Logged out successfully"
}
```

---

### Code Explanation

#### `POST /explain`
Explain code using Google Gemini AI.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "code": "function example() { return 42; }",
  "language": "javascript",
  "mode": "explain"
}
```

**Parameters:**
- `code` (string, required) - The code to explain (max 10,000 characters)
- `language` (string, required) - One of: `javascript`, `python`, `cpp`, `java`, `sql`, `other`
- `mode` (string, optional) - Either `explain` (default) or `cp`

**Response:** `200 OK`
```json
{
  "explanation": "# Overview\n\nThis JavaScript function...",
  "historyId": "507f1f77bcf86cd799439011",
  "code": "function example() { return 42; }",
  "language": "javascript",
  "mode": "explain"
}
```

**Errors:**
- `400 Bad Request` - Invalid input (missing code, invalid language)
- `401 Unauthorized` - Not authenticated
- `429 Too Many Requests` - Rate limit exceeded (10 requests/minute)
- `500 Internal Server Error` - Gemini API error

**Rate Limiting:**
- 10 requests per minute per user

---

### History

#### `GET /history`
Get user's saved code explanations.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `language` (string, optional) - Filter by language
- `mode` (string, optional) - Filter by mode (`explain` or `cp`)
- `search` (string, optional) - Search in code and explanation
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 20, max: 100)

**Response:** `200 OK`
```json
{
  "histories": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439012",
      "code": "function example() { return 42; }",
      "explanation": "# Overview...",
      "language": "javascript",
      "mode": "explain",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "pages": 3
  }
}
```

**Errors:**
- `401 Unauthorized` - Not authenticated
- `500 Internal Server Error` - Database error

---

#### `GET /history/:id`
Get a specific history item.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` - History item ID

**Response:** `200 OK`
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "code": "function example() { return 42; }",
  "explanation": "# Overview...",
  "language": "javascript",
  "mode": "explain",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Errors:**
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - History item not found or doesn't belong to user
- `500 Internal Server Error` - Database error

---

#### `DELETE /history/:id`
Delete a specific history item.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` - History item ID

**Response:** `200 OK`
```json
{
  "message": "History deleted successfully"
}
```

**Errors:**
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - History item not found
- `500 Internal Server Error` - Database error

---

#### `DELETE /history`
Delete all history items for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "message": "All history deleted successfully"
}
```

**Errors:**
- `401 Unauthorized` - Not authenticated
- `500 Internal Server Error` - Database error

---

### Health Check

#### `GET /health`
Check server health status.

**Response:** `200 OK`
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "mongodb": "connected"
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message description"
}
```

Or for validation errors:

```json
{
  "errors": [
    {
      "msg": "Code is required",
      "param": "code",
      "location": "body"
    }
  ]
}
```

## Status Codes

- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `404` - Not Found
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

## WebSocket Events

### Socket.io Events

**Client → Server:**
- `typing` - User is typing/analyzing code
- `stop-typing` - User stopped typing

**Server → Client:**
- `user-typing` - Another user is typing
- `user-stop-typing` - User stopped typing
