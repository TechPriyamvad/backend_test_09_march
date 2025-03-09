const express = require('express');
const bodyParser = require('body-parser');
const githubRoutes = require('./routes/githubRoutes');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(rateLimiter);
app.use('/github', githubRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});