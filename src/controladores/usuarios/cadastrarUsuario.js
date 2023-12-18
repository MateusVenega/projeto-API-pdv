const pool = require("../../config/conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {

        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." })
        };

        const verificaEmail = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (verificaEmail.rowCount > 0) {
            return res.status(400).json({ mensagem: "Já existe usuário cadastrado com o e-mail informado." });
        };

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, senhaCriptografada]
        );

        return res.status(201).json(novoUsuario.rows[0]);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    };
};

module.exports = cadastrarUsuario;