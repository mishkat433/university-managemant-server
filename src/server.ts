import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";



async function bootstrap() {
    try {
        await mongoose.connect(config.DATABASE_URL as string)
        console.log("database connection successful")
        app.listen(5000, () => {
            console.log(`Server is running at http://localhost:${config.PORT}`);
        });
    }
    catch (err) {
        console.log("failed to connect database", err)
    }
}

bootstrap();
