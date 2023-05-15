const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const port = process.env.PORT || 5000;
const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello World!',
    });
    }
);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

