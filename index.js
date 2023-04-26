

const express = require("express");
const app = express();
const PORT = 8080;
const { dbConnection } = require("./config/config")

app.use(express.json())

dbConnection()


app.use('/post', require('./routes/posts'));

app.use('user', require('./routes/users'))



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));//Comprobando
