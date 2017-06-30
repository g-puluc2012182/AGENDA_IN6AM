var database = require('./database');
var contacto = {};
var Autenticacion = require('../helper/autenticacion');
var auth = new Autenticacion();

contacto.selectAll = function(idUsuario, callback) {
  if(database) {
    database.query("SELECT contacto.idContacto, nombre, apellido, direccion, telefono, correo, nombreCategoria FROM contacto INNER JOIN categoria ON contacto.idCategoria = categoria.idCategoria",
    idUsuario,
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


contacto.selectHistorial = function(idUsuario, callback){
  if(database) {
    database.query("SELECT * FROM Historial WHERE idUsuario = ?", idUsuario,
    function(error, resultados) {
      if(error){
        throw error;
      } else{
        callback(null, resultados)
      }
    });
  }
}

contacto.select = function(idContacto, callback) {
  if(database) {
    var sql = "SELECT * FROM Contacto WHERE idContacto = ?";
    database.query(sql, idContacto,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

contacto.insert = function(idUsuario, data, callback) {
  if(database) {
    database.query("CALL INGRESAR_CONTACTO(?, ?, ?, ?, ?, ?, ?)", [data.nombre, data.apellido, data.direccion, data.telefono, data.correo, data.idCategoria, idUsuario],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


contacto.update = function(id2, id, data, callback) {
  if(database) {
    var sql = "CALL SP_ActualizarContacto(?,?,?,?,?,?,?,?)";
    database.query(sql, [data.nombre, data.apellido, data.direccion, data.telefono, data.correo, data.idCategoria, id, id2],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, data);
      }
    });
    console.log("estan llegando los datos")
    //Fin query
  }//Fin IF
}//FIN SelectAll

contacto.delete = function(ids, callback) {
  if(database) {
    database.query("DELETE FROM Contacto WHERE idContacto = ?", [ids.idContacto],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll





module.exports = contacto;
