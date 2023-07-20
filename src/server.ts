import mongoose from "mongoose";
import app from "./app";
import { errorLogger, logger } from "./shared/logger";
import config from "./config";

async function bootstrap() {
    try {
        await mongoose.connect('mongodb://localhost:27017/universityManagement')
        logger.info("database connection successful")




    }
    catch (err) {
        errorLogger.error("failed to connect database", err)
    }
}

app.listen(5500, () => {
    logger.info(`Server is running at http://localhost:${config.PORT}`);
    bootstrap();
});