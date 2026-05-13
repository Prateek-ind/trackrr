require("dotenv").config()

const app = require("./app/app");
const connectDb = require("./db/connectDb");



app.listen(process.env.PORT, async() => {
  try {
    await connectDb();
    console.log("server started");
  } catch (error) {
    console.log(error.message);
  }
});
