const express = require('express');
const mongoose = require ('mongoose');
const path = require("path");
const cors = require("cors");


const app = express();

app.use (cors());

const server = require ('http').Server(app);
const io = require('socket.io')(server);

//socket da aplicação
io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
})

//conexao com o banco
mongoose.connect('mongodb+srv://omnistack:bwb2ir1hJKQDvymP@cluster0-jps6v.mongodb.net/omnistack?retryWrites=true', 
    {useNewUrlParser: true

    }
);

//middlewares

app.use((req,res, next) => {
    req.io = io;
    return next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(3333);
