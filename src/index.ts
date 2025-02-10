import bodyParser from "body-parser";
import express from "express";

import { Pool } from "pg";
import errorHandler from "./middleware/error";
import logger from "./middleware/logger";
import notFound from "./middleware/notFound";
import meetingRoutes from "./routes/meetingRoute";

export const app = express();
const port = process.env.DATABASE_PORT || 9000;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "richard123",
  port: 8000,
});
// export const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE_NAME,
//   password: process.env.DATABASE_PASSWORD,
//   port: process.env.DATABASE_PORT
//     ? Number.parseInt(process.env.DATABASE_PORT)
//     : undefined,
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the logger middleware
app.use(logger);

// Define your routes here
app.use("/api/meetings", meetingRoutes);

// Use the not found middleware
app.use(notFound);

// Use the global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
  // await seedDatabase();
});
