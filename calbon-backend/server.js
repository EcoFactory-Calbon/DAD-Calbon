const express = require('express');
const cors = require('cors');
const app = express(); 

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: 17807,
    ssl: {
    rejectUnauthorized: false,
    },
});

app.use(cors());
app.use(express.json());

app.get("/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao conectar com o banco" });
  }
});

// Inicia o servidor na porta 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


app.post('/login', async (req, res) => {
    const { cnpj, senha } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE cnpj = $1 AND senha = $2',
            [cnpj, senha]);
            console.log(result.rows);

        if (result.rows.length == 0) {
            return res.status(401).json({ sucesso:false,message: 'CNPJ ou senha inválidos' });
        }

        const usuario = result.rows[0];
        const senhaTrimmed = senha.trim();
        console.log('Senha fornecida:', senhaTrimmed);
        console.log('Senha armazenada no banco:', usuario.senha);

        if(usuario.senha !==senha){
            return res.status(401).json({ sucesso:false,message: 'Senha incorreta' });
        }

        res.status(200).json({ sucesso:true, message: 'Login bem-sucedido', usuario });

    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).json({ sucesso:false,message: 'Erro no servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});