import { app, logger } from "@/server";

const server = app.listen(8080, () => {
  const { NODE_ENV, HOST, PORT } = process.env;
  logger.info(`Server (development) running on port http://localhost:8080`);
});

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
