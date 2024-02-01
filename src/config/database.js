const mongoose = require("mongoose");

function Database() {
  const mongoURI = process.env.MONGO_URI;
  mongoose.set("strictQuery", true);

  const config = mongoose
    .connect(mongoURI, { 
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });

  return config;
}

module.exports = Database;
