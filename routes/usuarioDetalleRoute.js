var express = require('express');
var detalle = require('../model/usuarioDetalle');
var router = express.Router();

router.get('/api/usuarioDetalle', function(req, res) {
  detalle.selectAll(function(error, resultados){
    if (typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay detalles"});
    }
  });
});

router.get('/api/usuarioDetalle/:idUsuarioDetalle', function(req, res) {
  var idUsuarioDetalle = req.params.idUsuarioDetalle;

  detalle.select(idUsuarioDetalle, function(error, resultado){
    if (typeof resultado !== undefined) {
      res.json(resultado);
    } else {
      res.json({"Mensaje": "No hay detalles"});
    }
  });
});

router.post('/api/usuarioDetalle', function(req, res) {
  var data = {
    idUsuarioDetalle : null,
    idUsuario : req.body.idUsuario,
    idContacto : req.body.idContacto
  }
  detalle.insert(data, function(error, resultado){
    if (resultado && resultado.insertId > 0) {
      var idUsuarioDetalle = resultado.insertId;
      res.redirect("api/usuarioDetalle/" + idUsuarioDetalle);
    } else {
      res.json({"Mensaje": "No se inserto ningun detalle"});
    }
  });
});

router.delete('/api/usuarioDetalle/:idUsuarioDetalle', function(req, res) {
  var idUsuarioDetalle = req.params.idUsuarioDetalle;

  detalle.select(idUsuarioDetalle, function(error, resultado){
    if (typeof resultado !== undefined) {
      res.json(resultado);
    } else {
      res.json({"Mensaje": "No se elimino el detalle"});
    }
  });
});

module.exports = router;
