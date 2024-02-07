/**
 * An Array of public routes
 * These routes don't require authentication
 * @type {string[]}
 */

export const publicRoutes =[
    "/"
]

/**
 * An Array of routes used for authentication
 * These routes will redirect the user to settings page
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
]

/**
 * The prefix for API authentication route
 * Routes that start with this prefix are used for API authentication processes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
