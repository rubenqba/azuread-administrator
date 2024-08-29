export { default } from "next-auth/middleware"

export const config = { matcher: ["/me", "/plans", "/users", "/teams"] }