import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), '.env') })


export default {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    DEFAULT_USER_PASSWORD: process.env.DEFAULT_USER_PASSWORD,
    env: process.env.NODE_ENV
}