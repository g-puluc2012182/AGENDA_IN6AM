var database = require('./database');
var usuarioDetalle = {};
usuarioDetalle.selectAll = function(callback) {
  if(database) {
    database.query("SELECT * FROM UsuarioDetalle",
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });
  }
}

usuarioDetalle.select = function(idUsuarioDetalle, callback) {
  if(database) {
    var consulta = "SELECT * FROM UsuarioDetalle WHERE idUsuarioDetalle = ?";
    database.query(consulta,idUsuarioDetalle, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });
  }
}

usuarioDetalle.insert = function(data, callback) {
    if (database) {
      database.query("INSERT INTO UsuarioDetalle SET ?", data, function(error, resultado) {
        if (error) {
          throw error;
        } else {
          callback(null, {"insertId": resultado.insertId});
        }
      });
    }
}

usuarioDetalle.delete = function(idUsuarioDetalle, callback) {
  if(database) {
    var consulta = "DELETE FROM UsuarioDetalle WHERE idUsuarioDetalle = ?";
    database.query(consulta,idUsuarioDetalle, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        var notificacion = {"Mensaje" : ""};

        if (resultado.affectedRows > 0) {
          notificacion.Mensaje = "Se elimino el detalle";
        } else {
          notificacion.Mensaje = "No se elimino el detalle";
        }
        callback(null, notificacion);
      }
    });
  }
}

module.exports = usuarioDetalle;
