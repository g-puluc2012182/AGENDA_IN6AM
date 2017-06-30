var ContactoCliente = function() {
  var main = this;
  var contactoUri = "http://localhost:3000/api/contacto/";
  var contactoUri1 = "http://localhost:3000/api/contacto";
  var categoriaUri = "http://localhost:3000/api/categoria/";
  var categoriaUri1 = "http://localhost:3000/api/categoria";

  main.contactos = ko.observableArray([]);
  main.categoria = ko.observableArray([]);
  main.error = ko.observable();
  main.contactoCargado = ko.observable();
  main.categoriaCargada = ko.observable();


  function ajaxHelper(uri, method, data) {
    return $.ajax({
      url : uri,
      type: method,
      dataType: 'json',
      contentType: 'application/json',
      data: data ? JSON.stringify(data) : null
    }).fail(function(jqXHR, textStatus, errorThrown){
      main.error(errorThrown);
    })
  }
  main.cargar = function (item) {
          console.log(JSON.stringify(item));
          main.contactoCargado(item);
  }


  main.editar = function (formElement) {
          var contactoEditado = {
              idContacto: main.contactoCargado().idContacto,
              nombre: main.contactoCargado().nombre,
              apellido: main.contactoCargado().apellido,
              direccion: main.contactoCargado().direccion,
              telefono: main.contactoCargado().telefono,
              correo: main.contactoCargado().correo,
              idCategoria: main.contactoCargado().idCategoria,
          }
          console.log(contactoEditado);
          ajaxHelper(contactoUri +  contactoEditado.idContacto, 'PUT', contactoEditado)
              .done(function (item) {
                  main.obtenerContactos();
              });
          console.log(contactoUri +  contactoEditado.idContacto);
      }


  main.categoriaNueva = {
    nombreCategoria: ko.observable()
  }


  main.contactoNuevo = {
      nombre: ko.observable(),
      apellido: ko.observable(),
      direccion: ko.observable(),
      telefono: ko.observable(),
      correo: ko.observable(),
      idCategoria: ko.observable()
  }

  main.agregar = function (formElement) {
      var nueva = {
          nombre: main.contactoNuevo.nombre(),
          apellido: main.contactoNuevo.apellido(),
          direccion: main.contactoNuevo.direccion(),
          telefono: main.contactoNuevo.telefono(),
          correo: main.contactoNuevo.correo(),
          idCategoria: main.contactoNuevo.idCategoria(),
      }

      ajaxHelper(contactoUri, 'POST', nueva)
          .done(function (data) {
            main.obtenerContactos();
          });
  }

  main.agregarCategoria = function (formElement) {
      var nuevaCategoria = {
          nombreCategoria: main.categoriaNueva.nombreCategoria()
      }
      console.log(JSON.stringify(nuevaCategoria));
      ajaxHelper(categoriaUri, 'POST', nuevaCategoria)
          .done(function (data) {
            main.obtenerCategoria();
          });
  }


  main.eliminar = function (item) {
      var idContacto = item.idContacto;
      var data = {
        nombre: item.nombre,
        idContacto: item.idContacto
      }
      console.log(JSON.stringify(data));
      ajaxHelper(contactoUri1 +"/" + idContacto, 'DELETE').done(function (data) {
        main.obtenerContactos();
      });

  }

  main.obtenerContactos = function() {
      ajaxHelper(contactoUri, 'GET').done(function(data) {
        main.contactos(data);
      });
    }

  main.obtenerCategoria = function() {
          ajaxHelper(categoriaUri, 'GET').done(function(data) {
            main.categoria(data);
          });
        }

  main.obtenerContactos();
  main.obtenerCategoria();
}

$(document).ready(function() {
  var contacto = new ContactoCliente();
  ko.applyBindings(contacto);
});
