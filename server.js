const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const dotEnv = require('dotenv');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
dotEnv.config();

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/user', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));
app.use('/user', require('./routes/user'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(process.env.PORT, (err) => {
    if(err) {
        console.log(`Server getting error : ${err}`);
    }
    console.log(`Server running the port http://localhost:${process.env.PORT}`);
});