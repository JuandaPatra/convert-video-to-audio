const express = require('express');
const cors = require('cors');
const converRoute = require('./routes/index');
const app = express();
app.use(cors());
app.use("/api/convert", converRoute)
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});