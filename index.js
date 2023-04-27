const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const { dbConnection } = require("./config/config")
const { handleTypeError } = require("./middleware/errors");
const { authentication } = require("./middleware/authentication")

app.use(express.json())

dbConnection()

app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'))

app.use(handleTypeError);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));//Comprobando

