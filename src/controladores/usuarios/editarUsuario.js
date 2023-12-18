const pool = require("../../config/conexao");
const bcrypt = require('bcrypt')

const editar = async (req, res) => {
  const { id } = req.usuario
  const { nome, email, senha } = req.body
  if (!email || !senha || !nome) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." })
  }
  const dados = await pool.query('SELECT * FROM usuarios WHERE email=$1 AND id <> $2', [email, id])
  if (dados.length > 0) {
    return res.status(400).json({
      mensagem: "O e-mail informado já está sendo utilizado por outro usuário."
    })
  }
  const sql = 'update usuarios set nome=$1,email=$2,senha=$3 where id=$4 returning *'
  const senhaValida = await bcrypt.hash(senha, 10)
  const params = [nome, email, senhaValida, id]
  const result = await pool.query(sql, params)
  const { senha: _, ...info } = result.rows[0]
  const atualizado = {
    info
  }
  return res.status(200).json(atualizado.info)
}

module.exports = { editar }

// // ** MINHA SUGESTÃO** :

// const pool = require("../../config/conexao");
// const bcrypt = require('bcrypt');

// const editar = async (req, res) => {
//   const { id } = req.usuario
//   const { nome, email, senha } = req.body
//   const dados = await pool.query('SELECT * FROM usuarios WHERE email=$1 AND id <> $2', [email, id])
//   if (dados.length > 0) {
//     return res.status(404).json({
//       mensagem: "O e-mail informado já está sendo utilizado por outro usuário."
//     })
//   }
//   let sql = 'UPDATE usuarios SET'
//   let params = []
//   if (nome) {
//     sql += ' nome=$1'
//     params.push(nome)
//   }
//   if (email) {
//     if (params.length > 0) {
//       sql += ','
//     }
//     sql += ' email=$' + (params.length + 1)
//     params.push(email)
//   }
//   if (senha) {
//     if (params.length > 0) {
//       sql += ','
//     }
//     const senhaValida = await bcrypt.hash(senha, 10)
//     sql += ' senha=$' + (params.length + 1)
//     params.push(senhaValida)
//   }
//   sql += ' WHERE id=$' + (params.length + 1)
//   params.push(id)
//   sql += ' RETURNING*'
//   const result = await pool.query(sql, params)
//   const { senha: _, ...info } = result.rows[0]
//   const atualizado = {
//     info
//   }
//   return res.status(200).json(atualizado.info)
// }

// module.exports = { editar }