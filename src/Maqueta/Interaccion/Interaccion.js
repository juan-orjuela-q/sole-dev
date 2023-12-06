//Librerias
import gsap from "gsap";
//Proyecto
import Maqueta from "../Maqueta.js";
import Cercanias from "./Cercanias.js";

export default class Interaccion {
  constructor() {
    this.maqueta = new Maqueta();
    this.cercanias = new Cercanias();
    this.mundo = this.maqueta.mundo;
    this.materiales = this.maqueta.materiales;
    this.camara = this.maqueta.camara;
    this.modoLocal = true;
    if (this.modoLocal) {
      this.inventario = this.maqueta.recursos.items.inventario_local;
    } else {
      console.log("No se está usando el inventario local en Interaccion.js");
    }

    //Elementos
    this.menuFlotante = document.getElementById("menuflotante");
    this.menuFlotanteBtns = this.menuFlotante.querySelectorAll("a");
    this.btnsCerrar = document.querySelectorAll(".btnCerrar-modal");
    this.btnFiltrar = document.getElementById("filtrar");
    this.btnLimpiarFiltros = document.getElementById("limpiar-filtros");
    this.modalUnidades = document.getElementById("modal-unidades");
    this.btnNuevaBusqueda = document.getElementById("btn-nueva-busqueda");
    this.btnCerrarBusqueda =
      this.modalUnidades.querySelector(".btnCerrar-modal");
    this.tablaResultados = document.querySelector("#resultados tbody");
    this.filasApto = document.querySelectorAll(".listado-resultados tbody tr");
    this.btnMostrarZonas = document.getElementById("btnZonas");
    //Cercanias
    this.cercanias = {};
    this.cercanias.contenedorFiltros =
      document.getElementById("filtros-cercanias");
    this.cercanias.filtros =
      this.cercanias.contenedorFiltros.querySelectorAll("input");

    this.cercanias.filtros.forEach((item) => {
      item.addEventListener("click", (event) => {
        const filtro = event.target.dataset.cercanias;
        if (filtro === "cerc-accesos") {
          if (this.maqueta.mundo.grupoTransito.visible) {
            this.maqueta.mundo.grupoTransito.visible = false;
          } else {
            this.maqueta.mundo.grupoTransito.visible = true;
          }
        }
        const hotspotsCercanias = document.querySelectorAll(
          `.hw-cercanias .${filtro}`
        );

        hotspotsCercanias.forEach((hotspot) =>
          hotspot.classList.toggle("oculto")
        );
      });
    });

    //Modal hotspot zonas
    this.btnCerrarZonas = document.querySelector(
      "#modal-zonas .btnCerrar-modal"
    );
    this.modalHotspot = document.querySelector("#modal-hotspots");
    this.hotImg = this.modalHotspot.querySelector(".hotspot-img");
    this.hotLabel = this.modalHotspot.querySelector(".hotspot-label");
    this.hotspotZonasBtn = document.querySelectorAll(".hw-zonas .hotspot");

    this.hotspotZonasBtn.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        this.modalHotspot.classList.add("activo");
        this.hotImg.innerHTML = `<img src="https://chromastudio.co/sole/sole_zonas/${item.dataset.imagen}" alt="Planta">`;
        this.hotLabel.innerHTML = item.dataset.texto;
      });
    });
    //Temp cerrar modal zonas
    //Boton cerrar
    this.modalHotspot
      .querySelector(".btn-volver-hot")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.modalHotspot.classList.remove("activo");
      });
    //Zonas
    this.infoZonas = [
      // TERRAZA_BBQ*
      // LOBBY*
      // SALON_DE_NIÑOS*
      // SALON_DE_JUEGOS*
      // SOCIAL_KITCHEN*
      // PISCINA*
      // CANCHA_DE_SQUACH*
      // SALON_COMUNAL*
      // SALON_COMUNAL_(1)*
      // ZONA_BBQ*
      // ZONA_PET*
      {
        name: "TERRAZA_BBQ",
        label: "Terraza BBQ",
        imagen: "terraza.jpg",
        posicion: {
          x: 5.282976282038426,
          y: 1.5616166177065853,
          z: 1.417417141768599,
        },
        target: {
          x: 4.5,
          y: 0.75,
          z: 0,
        },
      },
      {
        name: "SOCIAL_KITCHEN",
        label: "Social Kitchen",
        imagen: "social-kitchen.jpg",
        posicion: {
          x: 4.607108741765789,
          y: 0.8092491477097815,
          z: 1.7484681862804465,
        },
        target: {
          x: 4.5,
          y: 0.75,
          z: 0,
        },
      },
      {
        name: "LOBBY",
        label: "Lobby",
        imagen: "lobby.jpg",
        posicion: {
          x: 4.607108741765789,
          y: 0.8092491477097815,
          z: 1.7484681862804465,
        },
        target: {
          x: 4.5,
          y: 0.75,
          z: 0,
        },
      },
      {
        name: "SALON_DE_JUEGOS",
        label: "Salón de juegos",
        imagen: "salon-juegos.jpg",
        posicion: {
          x: 4.607108741765789,
          y: 0.8092491477097815,
          z: 1.7484681862804465,
        },
        target: {
          x: 4.5,
          y: 0.75,
          z: 0,
        },
      },
      {
        name: "PISCINA",
        label: "Piscina",
        imagen: "piscina.jpg",
        posicion: {
          x: 4.607108741765789,
          y: 0.8092491477097815,
          z: 1.7484681862804465,
        },
        target: {
          x: 4.5,
          y: 0.75,
          z: 0,
        },
      },
      //
      {
        name: "SALON_DE_NIÑOS",
        label: "Salón de niños",
        imagen: "salon-ninos.jpg",
        posicion: {
          x: 4.607108741765789,
          y: 0.8092491477097815,
          z: 1.7484681862804465,
        },
        target: {
          x: 4.5,
          y: 0.75,
          z: 0,
        },
      },
      {
        name: "CANCHA_DE_SQUACH",
        label: "Cancha de squach",
        imagen: "cancha-squash.jpg",
        posicion: {
          x: 4.607108741765789,
          y: 0.8092491477097815,
          z: 1.7484681862804465,
        },
        target: {
          x: 4.5,
          y: 0.75,
          z: 0,
        },
      },
      {
        name: "SALON_COMUNAL",
        label: "Salón comunal",
        imagen: "salon-social.jpg",
        posicion: {
          x: 4.607108741765789,
          y: 0.8092491477097815,
          z: 1.7484681862804465,
        },
        target: {
          x: 4.5,
          y: 0.75,
          z: 0,
        },
      },
      {
        name: "SALON_COMUNAL_(1)",
        label: "Salón comunal",
        imagen: "salon-social.jpg",
        posicion: {
          x: 4.607108741765789,
          y: 0.8092491477097815,
          z: 1.7484681862804465,
        },
        target: {
          x: 4.5,
          y: 0.75,
          z: 0,
        },
      },
      {
        name: "ZONA_BBQ",
        label: "Zona BBQ",
        imagen: "bbq.jpg",
        posicion: {
          x: -4.586896482349636,
          y: 0.7748578454695407,
          z: -2.994569944295316,
        },
        target: {
          x: -4.45,
          y: 0,
          z: -1.48,
        },
      },
      {
        name: "ZONA_PET",
        label: "Zona pet",
        imagen: "zona-pet.jpg",
        posicion: {
          x: -4.844925040044158,
          y: 0.7748578454695748,
          z: -0.011430295903954946,
        },
        target: {
          x: -4.45,
          y: 0,
          z: -1.48,
        },
      },
    ];
    this.listadoZonas = document.getElementById("listado-zonas");
    this.infoZonas.forEach((itemZona) => {
      const li = document.createElement("li");
      li.dataset.name = itemZona.name;
      li.innerHTML = itemZona.label;
      this.listadoZonas.append(li);

      li.addEventListener("click", () => {
        this.mostrarZona(itemZona.name);
      });

      /*li.addEventListener("click", () => {
        document
          .querySelector(`.hw-zonas .hotspot[data-texto="${li.dataset.name}"]`)
          .click();
      });
      li.addEventListener("mouseover", () => {
        document
          .querySelector(
            `.hw-zonas .hotspot[data-texto="${li.dataset.name}"] .label`
          )
          .classList.add("hover");
      });
      li.addEventListener("mouseleave", () => {
        document
          .querySelector(
            `.hw-zonas .hotspot[data-texto="${li.dataset.name}"] .label`
          )
          .classList.remove("hover");
      });*/
    });

    //Tooltip y modal aptos
    this.tooltipApto = document.getElementById("tooltip-apto");
    this.tool_torre = this.tooltipApto.querySelector(".torre span");
    this.tool_apto = this.tooltipApto.querySelector(".apto span");
    this.tool_ac = this.tooltipApto.querySelector(".a-c span");
    this.tool_ap = this.tooltipApto.querySelector(".a-p span");
    this.tool_img = this.tooltipApto.querySelector(".tool-img");
    this.btnMostrarApto = document.querySelector("#tooltip-apto .btn-ir");
    this.btnCerrarTooltip = document.querySelector("#tooltip-apto .btn-cerrar");
    this.modalApto = {};
    this.modalApto.contenedor = document.querySelector("#modal-aptos");
    this.modalApto.apto_tit = document.querySelector("#modal-aptos h2");
    this.modalApto.pre_tit = document.querySelector(
      "#modal-aptos .prefijo_tit"
    );
    this.modalApto.suf_tit = document.querySelector("#modal-aptos .sufijo_tit");
    this.modalApto.area_ac = document.querySelector(
      "#modal-aptos .area_ac span"
    );
    this.modalApto.area_ap = document.querySelector(
      "#modal-aptos .area_ap span"
    );
    this.modalApto.area_b = document.querySelector("#modal-aptos .area_b span");
    this.modalApto.atributos = document.querySelector(
      "#modal-aptos .atributos"
    );
    this.modalApto.img_planta = document.querySelector(
      "#modal-aptos .img_planta"
    );
    this.modalApto.btnVolver = document.querySelector(
      "#modal-aptos .btn-volver-apto"
    );
    this.modalApto.btnVolver.addEventListener("click", (event) => {
      event.preventDefault();
      this.modalApto.contenedor.classList.remove("activo");
      this.limpiarInfo();
    });

    //Menu flotante
    this.menuFlotanteBtns.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const destino = document.querySelector(item.dataset.destino);
        if (destino) {
          //Mostrar Pop up
          destino.classList.add("activo");
          //Ocultar menu
          this.menuFlotante.classList.add("ocultar");
        }
      });
    });
    //Cerrar modales
    this.btnsCerrar.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        let modal = item.parentNode;
        modal.classList.remove("activo");
        this.menuFlotante.classList.remove("ocultar");
      });
    });
    //Agregar filtrar
    this.btnFiltrar.addEventListener(
      "click",
      () => {
        this.filtrar(this);
      },
      false
    );
    //Mostrar Apto
    this.btnMostrarApto.addEventListener(
      "click",
      () => {
        this.mostrarApto(this);
      },
      false
    );
    //Mostrar Zonas
    this.btnMostrarZonas.addEventListener(
      "click",
      () => {
        this.mostrarZonas(this);
      },
      false
    );
    //Ver ejemplo de inventario
    console.log("Ejemplo inventario: ", this.inventario[0]);

    this.crearFiltroTipos();
    //Cerrar busqueda
    this.btnCerrarBusqueda.addEventListener(
      "click",
      () => {
        this.cerrarBusqueda(this);
      },
      false
    );
    //Cerrar zonas
    this.btnCerrarZonas.addEventListener(
      "click",
      () => {
        this.ocultarZonas(this);
      },
      false
    );
    //Buscador
    this.buscadorFiltros = document.querySelector("#buscador form");
    this.campo_apto_tit = this.buscadorFiltros.querySelector("#nombre");

    //this.campo_vista = this.buscadorFiltros.querySelector('#vista');
    this.campo_disponibilidad = this.buscadorFiltros.querySelector("#estado");

    this.buscadorFiltros.addEventListener(
      "submit",
      () => {
        event.preventDefault();
        this.filtrar(this);
      },
      false
    );

    this.btnLimpiarFiltros.addEventListener(
      "click",
      () => {
        this.buscadorFiltros.reset();
      },
      false
    );
  }
  //Cerrar busqueda temp
  cerrarBusqueda(interaccion) {
    event.preventDefault();

    interaccion.quitarAislamiento(true);

    interaccion.mundo.mascarasProyecto.traverse((child) => {
      if (child.type === "Mesh") {
        
        if (child.userData.disponibilidad === "VENDIDO") {
          child.material =
            this.maqueta.materiales.materialesProyecto.mascarasVendido;
        } else if (child.userData.disponibilidad === "OPCIONADO") {
          child.material =
            this.maqueta.materiales.materialesProyecto.mascarasOpcionado;
        } else if (
          child.userData.disponibilidad === "BLOQUEADA PARA LA VENTA"
        ) {
          child.material =
            this.maqueta.materiales.materialesProyecto.mascaras;
        } else {
          child.material = this.maqueta.materiales.materialesProyecto.mascaras;
        }

        child.userData.activo = false;
        child.visible = false;
        child.layers.disable(1);
      }
    });

    interaccion.modalUnidades.classList.remove("mostrando-resultados");
  }

  // Depende de inventario
  filtrarInventario(interaccion) {
    const filtrosAplicados = document.querySelector(".filtros-aplicados"),
      crearMarca = (etiqueta, valor) => {
        let li = document.createElement("li");
        filtrosAplicados.appendChild(li);
        li.append(`${etiqueta}: ${valor}`);
      };

    const campos_tipo = document.querySelectorAll(
      '#contenedorFiltrosTipologias input[type="checkbox"]:checked'
    );
    const tiposSeleccionados = [];
    campos_tipo.forEach((checkbox) => {
      tiposSeleccionados.push(parseInt(checkbox.value));
    });

    if (interaccion.campo_apto_tit.value) {
      crearMarca("Nombre", interaccion.campo_apto_tit.value);
    }

    if (tiposSeleccionados.length > 0) {
      tiposSeleccionados.forEach((tipo) => {
        crearMarca(
          "Tipo",
          document.querySelector(
            `#contenedorFiltrosTipologias input[value="${tipo}"] + div h2`
          ).innerText
        );
      });
    }

    /*if(interaccion.campo_vista.value) {
        crearMarca('Vista', interaccion.campo_vista.value)
    }*/

    if (interaccion.campo_disponibilidad.value) {
      crearMarca("Disponibilidad", interaccion.campo_disponibilidad.value);
    }

    const filteredData = [];

    console.log(interaccion.inventario);
    for (let obj of interaccion.inventario) {
      let matches = true;
      // Compara cada atributo del objeto con el valor del filtro correspondiente

      if (interaccion.campo_apto_tit.value) {
        if (!obj.nombre.includes(interaccion.campo_apto_tit.value))
          matches = false;
      }

      /*if(interaccion.campo_tipo_tit.value) {
          if (interaccion.campo_tipo_tit.value && obj.tipo_tit.toString() !== interaccion.campo_tipo_tit.value) matches = false;
      }*/

      /*if(interaccion.campo_vista.value) {
          if (interaccion.campo_vista.value && obj.vista !== interaccion.campo_vista.value) matches = false;
      }*/
      if (tiposSeleccionados.length > 0) {
        if (obj.idTipoInmueble) {
          if (!tiposSeleccionados.includes(obj.idTipoInmueble)) matches = false;
        }
      }

      if (interaccion.campo_disponibilidad.value) {
        if (obj.estado !== interaccion.campo_disponibilidad.value)
          matches = false;
      }

      if (obj.idTipoUnidad != 2) matches = false;
      // Si todos los filtros coinciden, agrega el objeto al arreglo filtrado
      if (matches) filteredData.push(obj);
    }
    // Puedes hacer lo que desees con el arreglo filtrado, por ejemplo, imprimirlo en la consola
    const numResultados = document.getElementById("numResultados");
    numResultados.innerHTML = filteredData.length;
    return filteredData;
  }

  filtrar(interaccion) {
    event.preventDefault();

    document.querySelector(".filtros-aplicados").innerHTML = "";
    const inventarioFiltrado = interaccion.filtrarInventario(interaccion);
    console.log(inventarioFiltrado);

    interaccion.quitarAislamiento();
    //Limpiar máscaras
    interaccion.maqueta.mundo.mascarasProyecto.traverse((child) => {
      if (child.type === "Mesh") {
        child.visible = false;
        child.layers.disable(1);
      }
    });
    interaccion.tablaResultados.innerHTML = "";
    //Consultar json
    for (let i = 0; i < inventarioFiltrado.length; i++) {
      const infoID = inventarioFiltrado[i].nombre;

      //Prender los aptos del JSON
      interaccion.maqueta.mundo.mascarasProyecto.traverse((child) => {
        if (child.type === "Mesh") {
          if (child.userData.id === infoID) {
            child.visible = true;
            child.layers.enable(1);
          }
        }
      });
      //Pintar tabla
      const resultado = `<tr data-apto="${inventarioFiltrado[i].nombre}" data-disponibilidad="${inventarioFiltrado[i].estado}">
          <td>${inventarioFiltrado[i].nombre}</td>                         
          <td>${inventarioFiltrado[i].numeroPiso}</td>
          <td>${inventarioFiltrado[i].areaConstruida}</td>
          <td>${inventarioFiltrado[i].areaPrivada}</td>          
          <td>${inventarioFiltrado[i].estado}</td> 
      </tr>`;

      const tablaResultadosActual = interaccion.tablaResultados.innerHTML;
      interaccion.tablaResultados.innerHTML = tablaResultadosActual + resultado;
      //Actualizar filasApto
      interaccion.filasApto = document.querySelectorAll(
        ".listado-resultados tbody tr"
      );

      interaccion.filasApto.forEach((item) => {
        item.addEventListener(
          "click",
          () => interaccion.activarFila(event, interaccion),
          false
        );
      });
    }
    //Mostrar resultados
    interaccion.modalUnidades.classList.add("mostrando-resultados");

    //Nueva busqueda
    const btnNuevaBusqueda = document.getElementById("btn-nueva-busqueda");
    btnNuevaBusqueda.addEventListener("click", (event) => {
      event.preventDefault();
      //Mostrar filtros
      interaccion.modalUnidades.classList.remove("mostrando-resultados");
      const filtrosAplicados = document.querySelector(".filtros-aplicados");

      filtrosAplicados.innerHTML = "";
    });
  }
  //
  activarFila(e, interaccion) {
    e.preventDefault();
    e.stopPropagation();
    const fila = e.target,
      identificador = fila.dataset.apto;
    if (identificador) {
      interaccion.aislarApto(identificador);
    }
  }
  // Depende de inventario
  aislarApto(identificador) {
    console.log("identificador: ", identificador);
    //this ya se refiere a Interaccion
    const filasResultados = Array.from(
      document.querySelectorAll("#modal-unidades tbody tr")
    );
    const filasFavoritos = Array.from(
      document.querySelectorAll("#modal-favoritos tbody tr")
    );

    if (filasResultados) {
      filasResultados.forEach((fila) => fila.classList.remove("activo"));
      this.quitarAislamiento();
      let fila = filasResultados.find(
        (fila) => fila.dataset.apto === identificador
      );
      fila.classList.add("activo");
    }

    this.mundo.mascarasProyecto.traverse((child) => {
      if (child.type === "Mesh") {
        //Limpiar mascaras
        //child.material = this.materiales.materialesProyecto.mascara
        //Poner mascara
        if (child.userData.id === identificador) {
          child.userData.activo = true;
          child.material = this.materiales.materialesProyecto.mascaraClick;

          this.maqueta.moverCamara(child);
          //Mostrar tooltip

          this.tooltipApto.classList.add("activo");
          this.btnMostrarApto.dataset.destino = identificador;
          //Pintar info

          let obj = this.inventario.find((obj) => obj.nombre === identificador);

          if (obj) {
            //this.tool_torre.innerHTML = obj.torre;
            this.tool_apto.innerHTML = obj.nombre;
            this.tool_ac.innerHTML = obj.areaConstruida;
            this.tool_ap.innerHTML = obj.areaPrivada;

            this.tool_img.innerHTML = `<img src="https://chromastudio.co/sole/sole_plantas/thumbs/${obj.idTipoInmueble}.jpg" alt="Planta de unidad">`;
          }
        }
      }
    });
  }
  //
  quitarAislamiento(animarCamara) {
    this.tooltipApto.classList.remove("activo");
    this.btnMostrarApto.dataset.destino = "";

    const filasResultados = Array.from(
      document.querySelectorAll("#modal-unidades tbody tr")
    );
    const filasFavoritos = Array.from(
      document.querySelectorAll("#modal-favoritos tbody tr")
    );

    if (filasResultados) {
      filasResultados.forEach((fila) => fila.classList.remove("activo"));
    }

    this.mundo.mascarasProyecto.traverse((child) => {
      if (child.type === "Mesh") {
        //child.material = this.materiales.materialesProyecto.mascaras;
        if (child.userData.disponibilidad === "VENDIDO") {
          child.material =
            this.maqueta.materiales.materialesProyecto.mascarasVendido;
        } else if (child.userData.disponibilidad === "OPCIONADO") {
          child.material =
            this.maqueta.materiales.materialesProyecto.mascarasOpcionado;
        } else if (
          child.userData.disponibilidad === "BLOQUEADA PARA LA VENTA"
        ) {
          child.material =
            this.maqueta.materiales.materialesProyecto.mascaras;
        } else {
          child.material = this.maqueta.materiales.materialesProyecto.mascaras;
        }
        child.userData.activo = false;
        //child.visible = false
      }
    });

    if (animarCamara) {
      const controles = this.camara.controles;
      controles.enabled = false;
      gsap.to(controles.target, {
        duration: 1,
        x: 0,
        y: 0.75,
        z: 0,
        onUpdate: function () {
          controles.update();
        },
        onComplete: function () {
          controles.enabled = true;
        },
      });

      /*gsap.to(this.camara.instancia.position, {
                duration: 1,
                x: this.camara.instancia.position.x,
                y: this.camara.instancia.position.y,
                z: this.camara.instancia.position.z * 1.5,
                onUpdate: function () {
                    controles.update()
                },
                onComplete: function () {
                    controles.enabled = true
                }
            })*/
    }
  }
  // Depende de inventario
  mostrarApto(interaccion) {
    // Si es por ID se debe usar el de abajo
    const aptoActivo = interaccion.btnMostrarApto.dataset.destino;
    let obj = interaccion.inventario.find((obj) => obj.nombre === aptoActivo);
    //Pintar info
    interaccion.modalApto.contenedor.classList.add("activo");
    interaccion.modalApto.apto_tit.innerHTML = obj.nombre;
    //interaccion.modalApto.pre_tit.innerHTML = "Torre " + obj.torre;
    interaccion.modalApto.suf_tit.innerHTML = obj.tipoInmueble;
    interaccion.modalApto.area_ac.innerHTML = obj.areaConstruida;
    interaccion.modalApto.area_ap.innerHTML = obj.areaPrivada;
    //interaccion.modalApto.img_planta.innerHTML = `<img src="${obj.img_planta}" alt="Planta de unidad">`
    //interaccion.modalApto.img_planta.innerHTML = `<img src="https://proyectosappicua.com/maqueta/img/syrah-apto-1.jpg" alt="Planta de unidad">`;
    //interaccion.modalApto.img_planta.innerHTML = `<img src="/static/plantas/planta_${obj.idTipoInmueble}.jpg" alt="Planta de unidad">`;
    interaccion.modalApto.img_planta.innerHTML = `<img src="https://chromastudio.co/sole/sole_plantas/plantas/${obj.idTipoInmueble}.jpg" alt="Apto"></img>`;
    //interaccion.modalApto.area_b.innerHTML = obj.areaBalcon;

    console.log(obj.idTipoInmueble);
    let tour_url =
      obj.idTipoInmueble == 901 ||
      obj.idTipoInmueble == 902 ||
      obj.idTipoInmueble == 897
        ? "https://www.constructoracolpatria.com/recorridos/sole/apto2-marzo31/tour.html"
        : obj.idTipoInmueble == 899 || obj.idTipoInmueble == 898
        ? "https://www.constructoracolpatria.com/recorridos/sole/apto3-marzo31/tour.html"
        : null;

    console.log(tour_url);

    //Recorridos 360
    const modalTour = document.querySelector("#modal-tour"),
      btnTour = document.querySelector("#btn-tour-360"),
      btnTourCerrar = modalTour.querySelector(".btn-cerrar-360"),
      tourApto = document.querySelector("#modal-tour iframe");
    //Mostrar recorrido
    btnTour.addEventListener("click", (event) => {
      event.preventDefault();
      modalTour.classList.add("activo");
    });
    btnTourCerrar.addEventListener("click", (event) => {
      event.preventDefault();
      modalTour.classList.remove("activo");
      //tourApto.setAttribute('src', '')
    });
    //Agregar tour

    if (tour_url) {
      btnTour.classList.add("visible");
      tourApto.setAttribute("src", tour_url);
    } else {
      btnTour.classList.remove("visible");
      tourApto.setAttribute("src", "");
    }
  }
  //
  limpiarInfo() {
    this.modalApto.apto_tit.innerHTML = "";
    this.modalApto.area_ac.innerHTML = "";
    this.modalApto.area_ap.innerHTML = "";
    this.modalApto.area_b.innerHTML = "";
    this.modalApto.atributos.innerHTML = "";
    this.modalApto.img_planta.innerHTML = "";
    //this.modalApto.img_piso.innerHTML = ''
  }
  //Nueva
  cargarMascarasZonas() {
    this.mundo.mascarasZonas.traverse((child) => {
      if (child.type === "Mesh") {
        console.log(child.name);
        child.material = this.materiales.materialesProyecto.mascarasZonas;
        child.visible = true;
        child.layers.enable(2);
      }
    });
  }
  //Nueva
  mostrarZona(zona) {
    const zonaSeleccionada = this.infoZonas.find(
      (infoZona) => infoZona.name === zona
    );
    console.log(">>>", zona);

    const mostrarPopUp = () => {
      if (zonaSeleccionada) {
        this.modalHotspot.classList.add("activo");
        this.hotImg.innerHTML = `<img src="https://chromastudio.co/sole/sole_zonas/${zonaSeleccionada.imagen}" alt="Zona Solé">`;
        this.hotLabel.innerHTML = zonaSeleccionada.label;
      } else {
        console.log(
          "Error con la información de las zonas. Es posible que el nombre de la máscaras no se encuentre en infoZonas"
        );
      }
    };

    this.mundo.mascarasZonas.traverse((child) => {
      if (child.type === "Mesh") {
        child.userData.activo = false;
        child.material = this.materiales.materialesProyecto.mascarasZonas;

        if (child.name === zonaSeleccionada.name) {
          child.material = this.materiales.materialesProyecto.mascaraHover;
          child.userData.activo = true;
        }
      }
    });

    this.listadoZonas
      .querySelectorAll("li")
      .forEach((item) => item.classList.remove("activo"));
    this.listadoZonas
      .querySelector(`li[data-name='${zonaSeleccionada.name}']`)
      .classList.add("activo");

    const controles = this.camara.controles;
    //controles.minDistance = 1
    controles.enabled = false;
    //Mover target
    gsap.to(controles.target, {
      duration: 2,
      x: zonaSeleccionada.target.x,
      y: zonaSeleccionada.target.y,
      z: zonaSeleccionada.target.z,
      onUpdate: function () {
        controles.update();
      },
      onComplete: function () {},
    });

    //Mover camara
    gsap.to(this.camara.instancia.position, {
      //gsap.to(controles.target, {
      duration: 1,
      x: zonaSeleccionada.posicion.x,
      y: zonaSeleccionada.posicion.y,
      z: zonaSeleccionada.posicion.z,
      onUpdate: function () {
        controles.update();
      },
      onComplete: function () {
        controles.enabled = true;
        mostrarPopUp();
      },
    });
  }
  mostrarZonasOLD(interaccion) {
    const controles = this.camara.controles;

    controles.enabled = false;

    gsap.to(controles.target, {
      duration: 2,
      x: 4.5,
      y: 0.75,
      z: 0,
      onUpdate: function () {
        controles.update();
      },
      onComplete: function () {
        controles.enabled = true;
      },
    });

    gsap.to(this.camara.instancia.position, {
      duration: 2,
      x: 4.057,
      y: 1.399,
      z: 1.686,
      onUpdate: function () {
        controles.update();
      },
      onComplete: function () {
        controles.enabled = true;
        document.querySelector(".hw-zonas").classList.add("activo");
      },
    });
  }
  ocultarZonasOLD(interaccion) {
    const controles = this.camara.controles;

    controles.enabled = false;
    gsap.to(controles.target, {
      duration: 2,
      x: 0,
      y: 0.75,
      z: 0,
      onUpdate: function () {
        controles.update();
      },
      onComplete: function () {
        controles.enabled = true;
        document.querySelector(".hw-zonas").classList.remove("activo");
      },
    });
  }
  //
  mostrarZonas(interaccion) {
    this.maqueta.mostrarZonas = true;

    this.cargarMascarasZonas();
    //Ocultar modelos
    const ocultarElementos = () => {
      this.elementosOcultosConZonasActivas.forEach((elemento) => {
        if (elemento.modelo) {
          elemento.modelo.position.y = 100;
        } else {
          elemento.position.y = 100;
        }

        //elemento.modelo.visible = false
        //elemento.modelo.traverse(child => child.visible = false)
      });
    };

    const controles = this.camara.controles;
    controles.minDistance = 0.5;
    controles.enabled = false;

    //Ocultar

    /*gsap.to(controles.target, {
      duration: 2,
      x: 4.5,
      y: 0.75,
      z: 0,
      onUpdate: function () {
        controles.update();
      },
      onComplete: function () {},
    });*/

    gsap.to(this.camara.instancia.position, {
      duration: 2,
      //x: 4.057,
      //y: 1.399,
      //z: 1.686,
      x: -3.31884262196832,
      y: 3.4739429984372676,
      z: 4.191111808562339,
      onUpdate: function () {
        controles.update();
      },
      onComplete: function () {
        controles.enabled = true;
      },
    });
  }
  ocultarZonas(interaccion) {
    this.listadoZonas
      .querySelectorAll("li")
      .forEach((item) => item.classList.remove("activo"));
    this.mundo.mascarasZonas.traverse((child) => {
      if (child.type === "Mesh") {
        child.visible = false;
        child.layers.disable(2);
      }
    });

    const mostrarElementos = () => {
      this.elementosOcultosConZonasActivas.forEach((elemento) => {
        if (elemento.modelo) {
          elemento.modelo.position.y = 0;
        } else {
          elemento.position.y = 0;
        }
        //elemento.modelo.material.visible = true
        //elemento.modelo.traverse(child => child.material.visible = true)
      });
    };
    //mostrarElementos()
    //document.querySelector('.hw-zonas').classList.remove('activo')

    const controles = this.camara.controles;

    controles.enabled = false;

    gsap.to(controles.target, {
      duration: 2,
      x: 0,
      y: 0.75,
      z: 0,
      onUpdate: function () {
        controles.update();
      },
      onComplete: function () {},
    });

    gsap.to(this.camara.instancia.position, {
      duration: 2,
      x: -4.0,
      y: 3,
      z: 4.0,
      onUpdate: function () {
        controles.update();
      },
      onComplete: function () {
        controles.enabled = true;
      },
    });
    this.maqueta.mostrarZonas = false;
  }
  //
  filtrarCercanias() {
    const filtro = event.target.dataset.cercanias;
    console.log(filtro);
    const hotspotsCercanias = document.querySelectorAll(
      ".hw-cercanias .hotspot"
    );
  }
  crearFiltroTipos() {
    const identificadorTipoInmueble = "idTipoInmueble";
    const valoresUnicos = new Set();
    const infoInmuebles = [];

    this.inventario.forEach((elemento) => {
      if (elemento[identificadorTipoInmueble]) {
        valoresUnicos.add(elemento[identificadorTipoInmueble]);
      }
    });

    const tiposInmueble = Array.from(valoresUnicos);
    console.log(tiposInmueble);

    tiposInmueble.forEach((valor) => {
      const objeto = this.inventario.find(
        (elemento) => elemento[identificadorTipoInmueble] === valor
      );
      if (objeto) {
        infoInmuebles.push(objeto);
        // Agrega todas las propiedades que quieras guardar en el nuevo arreglo
      }
    });

    //Crear botones por cada tipo de inmueble
    console.log(infoInmuebles);

    const contenedorFiltrosTipo = document.getElementById(
      "contenedorFiltrosTipologias"
    );

    infoInmuebles.forEach((tipo) => {
      const div = document.createElement("div");
      div.classList.add("tipo-inmueble");
      div.innerHTML = `
      
        <label>
          <input type="checkbox" value="${tipo.idTipoInmueble}">
          <div class="menu-item-info">
            <div class="menu-item-col-img">
              <img src="https://chromastudio.co/sole/sole_plantas/thumbs/${tipo.idTipoInmueble}.jpg" alt="Apto">
            </div>
            <div class="menu-item-col-txt">
              <h2>${tipo.tipoInmueble}</h2>
              <p class="menu-item-ac">A.C: <span>${tipo.areaConstruida}</span>m²</p>
              <p class="menu-item-ap">A.P: <span>${tipo.areaPrivada}</span>m²</p>
            </div>
          </div>
        </label>   
      
    `;
      contenedorFiltrosTipo.append(div);
    });
  }
}
