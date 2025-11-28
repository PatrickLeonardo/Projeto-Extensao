const express = require('express');
const connection = require('./src/connection.js').default;
const cors = require('cors');

const app = express();

app.use(express.static('./public'));
app.use(express.json());
app.use(cors());

app.post('/novo_evento', async (req, res) =>  {

    const body = req.body;

    const nome = body.nome;
    const local = body.local;
    const data_hora = body.data_hora;

    console.log(body);

    try {
        
        connection.query(`
            INSERT INTO tbEventos (nome, local, data_hora)
            VALUES ('${nome}', '${local}', '${data_hora}');
        `);
        
    } catch(err) {

        console.error(err);
        res.sendStatus(500);
        
    }

    res.sendStatus(201);

});

app.get('/eventos', (_, res) => {

    try {
        
        connection.query(`SELECT nome FROM tbEventos;`, (__, result, _) => {
            res.status(200).json(result);
        });
        

    } catch(err) {
        console.log(err);
    }

});

app.get('/eventos_agendados', (_, res) => {

    try {
        
        connection.query(`SELECT * FROM tbEventos;`, (__, result, _) => {
            res.status(200).json(result);
        });
        

    } catch(err) {
        console.log(err);
    }

});

app.get('/escalas', (_, res) => {

    try {
        
        connection.query(`SELECT * FROM tbEscalas;`, (__, result, _) => {
            res.status(200).json(result);
        });
        

    } catch(err) {
        console.log(err);
    }

})

app.post('/nova_escala', (req, res) =>  {

    const body = req.body;

    const funcionario = body.funcionario;
    const funcao = body.funcao;
    const CPF = body.CPF;
    const RG = body.RG;

    try {

        connection.query(`SELECT id FROM tbEventos WHERE nome = "${body.evento}";`, (__, result, _) => {
            
            const id_evento = result[0].id;
              
            connection.query(`
                INSERT INTO tbEscalas (funcionario, funcao, CPF, RG, id_evento)
                VALUES ('${funcionario}', '${funcao}', '${CPF}', '${RG}', ${id_evento});
            `);

        });
        
    } catch(err) {
        console.error(err);
    }

    res.sendStatus(200);

});

app.listen(3000, () => {

    console.log("\nServidor Rodando!");

});
