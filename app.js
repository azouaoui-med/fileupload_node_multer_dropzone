const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

//set up view engine 
app.set('view engine', 'pug');

app.use('/css', express.static(path.join(__dirname, './node_modules/bootstrap/dist/css/')));
app.use('/css', express.static(path.join(__dirname, './node_modules/dropzone/dist/min/')));
app.use('/js', express.static(path.join(__dirname, './node_modules/dropzone/dist/min/')));

// disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// set up upload method
const upload = multer({
    storage
}).any();

// set up the route for the upload
app.post('/upload', (req, res) => {

    // call upload method
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log(err);
        } else if (err) {
            console.log(err);
        }
        res.status(200).send('files uploaded');
    });
});

// set up route for index page
app.get('/', (req, res) => {
    res.render('index');
});

// start server 
app.listen(port, () => {
    console.log(`Listening on port : ${port}`);
})