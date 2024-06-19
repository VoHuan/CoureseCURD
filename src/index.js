const express = require('express');
const path = require('path');
const morgan = require('morgan');
const engine = require('express-handlebars');
const methodOverride = require('method-override')
const sortMiddleware = require('./app/middlewares/sortMiddleware');

const app = express();
const port = 9000;

const route = require('./routes');
const db = require('./config/db');


//middleware
app.use(sortMiddleware);

// connect database
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(methodOverride('_method'))

app.engine(
    'hbs',
    engine.engine({
        extname: '.hbs',
        helpers: require ('./helpers/handlebars'),
    }),
); // template engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(morgan('combined')); // http logger

//Routes init
route(app);

app.listen(port, () => console.log(`server start at port ${port}`));
