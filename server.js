const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3001;

require("./routes/api-routes")(app);

// app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// })

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established!");
})

// Connect to the Mongo DB
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactDishApp");
//mLab discontinued as of 9/1/20 -- mongoose.connect(process.env.MONGODB_URI || "mongodb://gina:NamJee1@ds141043.mlab.com:41043/heroku_zzcz8hmq");
mongoose.connect(process.env.ATLAS_URI || "mongodb+srv://gina2521:NamJee2521@cluster0.yw95s.gcp.mongodb.net/topYori?retryWrites=true&w=majority");

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
