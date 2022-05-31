const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth1');
const userRoute = require('./routes/users');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => console.log("DB connection established"))
    .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/auth1", authRoute);
app.use("/api/users", userRoute);

app.listen(8800, () => {
    console.log("Backend server is running");
});