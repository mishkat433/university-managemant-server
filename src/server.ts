import mongoose from "mongoose";
import app from "./app";
import { errorLogger, logger } from "./shared/logger";
import config from "./config";
import { Server } from 'http';

process.on('uncaughtException', error => {
    errorLogger.error(error);
    process.exit(1);
});

// eslint-disable-next-line prefer-const
let server: Server;

async function bootstrap() {

    try {
        await mongoose.connect('mongodb://localhost:27017/universityManagement')
        logger.info("database connection successful")
    }
    catch (err) {
        errorLogger.error("failed to connect database", err)
    }

    process.on('unhandledRejection', (err) => {
        if (server) {
            server.close(() => {
                errorLogger.error(err)
            })
        }
        else {
            process.exit(1)
        }
    })
}


server = app.listen(5500, () => {
    logger.info(`Server is running at http://localhost:${config.PORT}`);
    bootstrap();
});


process.on('SIGTERM', () => {
    logger.info('SIGTERM is detect, we are closing our server');
    if (server) {
        server.close();
    }
});