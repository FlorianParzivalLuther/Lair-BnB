const mongoose = require("mongoose");
require("dotenv").config();
// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI || process.env.DATABASE;

const connectDB = async () => {
  try {
    const response = await mongoose.connect(MONGO_URI);
    console.log("Atlas connected to db:", response.connections[0].name);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
connectDB().then(runServer);

const app = require("./app");

function runServer() {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}
