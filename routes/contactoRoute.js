var express = require('express');
var contacto = require('../model/contacto');
var Autenticacion = require('../helper/autenticacion');
var router = express.Router();
var auth = new Autenticacion();

router.get('/api/contacto/', function(req, res) {
  auth.autorizar(req);
  if(auth.getAcceso()) {
    contacto.selectAll(auth.getIdUsuario(), function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay contactos"});
      }
    });
  } else {
    res.redirect('/autenticar');
  }
});


router.get('/api/historial/', function(req, res) {
  auth.autorizar(req);
  if(auth.getAcceso()) {
    contacto.selectHistorial(auth.getIdUsuario(), function(error, resultados){
      if(typeof resultados !== undefined) {
        res.render('dashboard/historial', {resultados});
      } else {
        res.json({"Mensaje": "No hay Historial"});
      }
    });
  } else {
    res.redirect('/autenticar');
  }
});


router.get('/api/contacto/:idContacto',
  function(req, res) {
    var idContacto = req.params.idContacto;
    contacto.select(idContacto, function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay contactos"});
      }
  });
});

router.post('/api/contacto', function(req, res) {
  var data = {
    idContacto : null,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    idCategoria: req.body.idCategoria
  }
  contacto.insert(auth.getIdUsuario(), data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.redirect('/');
    } else {
      res.json({"Mensaje": "No se ingreso la contacto"});
    }
  });
});


router.put('/api/contacto/:idContacto', function(req, res) {
  var idContacto = req.params.idContacto;
  var data = {
    idContacto : req.body.idContacto,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    idCategoria: req.body.idCategoria
  }
    contacto.update(auth.getIdUsuario(), idContacto, data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la contacto"});
      }
    });
});

router.delete('/api/contacto/:idContacto', function(req, res) {
    var idContacto = req.params.idContacto;
    var ids = {
      idUsuario : auth.getIdUsuario(),
      idContacto: idContacto
    }
    contacto.delete(ids, function(error, resultado){
      if(resultado) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});



module.exports = router;
