const pool = require("../../config/conexao");

const detalharPerfilUsuario = async (req, res) => {
  const idUsuario = req.usuarioId;

  try {
    const usuario = await pool.query(
      `SELECT nome, email FROM usuarios WHERE id = $1`,
      [idUsuario]
    );

    if (usuario.rows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const perfilUsuario = usuario.rows[0];
    return res.json(perfilUsuario);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensagem: "Erro ao buscar perfil do usuário" });
  }
};

module.exports = {
  detalharPerfilUsuario,
};
