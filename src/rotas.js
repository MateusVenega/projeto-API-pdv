const express = require("express");
const loginUsuario = require("./controladores/usuarios/efetuarLogin");
const validarUsuarioLogado = require("./intermediarios/autenticacao");
const {
  detalharPerfilUsuario,
} = require("./controladores/usuarios/detalharUsuarioLogado");
const { editar } = require('./controladores/usuarios/editarUsuario');
const listarCategorias = require("./controladores/categorias/listarCategorias");
const cadastrarUsuario = require("./controladores/usuarios/cadastrarUsuario");

const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post("/login", loginUsuario);

rotas.use(validarUsuarioLogado);
rotas.get("/usuario", detalharPerfilUsuario);
rotas.put("/usuario", editar)
rotas.get('/categoria', listarCategorias)

module.exports = rotas;
