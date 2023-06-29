require('dotenv').config();

const express = require('express');
const server = express();
const bodyParser = require('body-parser');

const service = require('./src/services/service');

server.listen(process.env.PORT), () => {
    console.log(`Servidor rodando na porta de conexão ${process.env.PORT}.`)
};

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes

server.get('/', (_, res) => { 
    res.send('Servidor projeto A ok!')
});


server.post('/folha/cadastrar', async (req, res) => {
    try {
        const response = await service.create(req)
        res.status(200).send({
            message: 'Criado!',
            data: response
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

server.get('/folha/calcular', async (_, res) => {
    try {
        response = await service.calcFolhas()
        res.status(200).send({
            data: response
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});