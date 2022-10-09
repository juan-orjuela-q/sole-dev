//Menu maqueta
const btnsFlotantes = document.querySelectorAll('#menuflotante a'),
    btnCerrar = document.querySelectorAll('.btnCerrar-modal'),
    btnsTipologia = document.querySelectorAll('.tipo-enlace'),
    hotspotsBtn = document.querySelectorAll('.hw-zonas .hotspot'),
    hotspotsBtnInfo = document.querySelectorAll('.hw-info .hotspot'),
    hwInfo = document.querySelector('.hw-info'),
    cargando = document.getElementById('pantalla-carga'),
    barraCarga = cargando.querySelector('.loading-barra')

let filasApto = document.querySelectorAll('.listado-resultados tbody tr'),
    anchoModal = 0

//Recorridos 360
const modalTour = document.querySelector('#modal-tour'),
    tourApto = modalTour.querySelector('.appicua-tour'),
    btnTour = document.querySelector('#btn-tour-360'),
    btnTourCerrar = modalTour.querySelector('.btn-cerrar-360')

console.log(THREE)