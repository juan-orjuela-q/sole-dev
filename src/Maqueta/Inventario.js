//Librerias
import * as THREE from 'three'
//Proyecto
import Maqueta from "./Maqueta"

export default class Inventario {
    constructor() {
        this.maqueta = new Maqueta()
        this.escena = this.maqueta.escena
        this.recursos = this.maqueta.recursos
        
        this.mascarasProyecto = this.maqueta.mundo.mascarasProyecto
        //this.btnFiltrar = document.getElementById('filtrar')
        
        
        //this.tablaResultados = document.querySelector('#resultados tbody')
        //this.formatoNumero = Intl.NumberFormat('de-DE')

        this.recursos.on('cargado', () => {
            this.inventario = this.recursos.items.inventario
            this.cargarMascaras()
            //this.cargarMascaras()
        })
    }
    cargarMascarasTest(){
        for (const mascara of this.recursos.items.mascarasInventario.scene.children) {
            const name = mascara.name
            //torre_1_904_tipo_4
            console.log(name)
        }
    }


    cargarMascaras() {

        for (const mascara of this.recursos.items.mascarasInventario.scene.children) {
            //Ejemplo name: "torre1_apto102_tipo1_cam1"
            const name = mascara.name,
                id = name.substring(0, name.match("_tipo").index),
                torre = name.substring(name.match("torre").index + 5, name.match("_apto").index),
                num = name.substring(name.match("apto").index + 4, name.match("_tipo").index)
            //tipo = name.substring(name.match("tipo").index + 4, name.match("_cam").index),
            //cam = name.substring(name.match("cam").index + 3, name.length)

            //Agregar atributos
            mascara.userData.id = id
            mascara.userData.torre = torre
            mascara.userData.numero = num
            mascara.userData.activo = false
            //mascara.userData.tipo = tipo
            //mascara.userData.camara = cam
            mascara.visible = false

            //Definir material
            mascara.material = this.maqueta.materiales.materialesProyecto.mascaras
            //Agregar lineas
            let geo = new THREE.EdgesGeometry(mascara.geometry)
            let mat = new THREE.LineBasicMaterial({
                color: this.maqueta.colores.mascaras.mascaraLinea,
                linewidth: 1,
            })
            let wireframe = new THREE.LineSegments(geo, mat)
            mascara.add(wireframe)

        }
        this.mascarasProyecto.add(this.recursos.items.mascarasInventario.scene)
        //this.btnFiltrar.addEventListener('click', ()=> {this.consultar(event, this.inventario)}, false)
    }
   
    consultar(e, inventario) {
        e.preventDefault()
        e.stopPropagation()
        
        //Consultar json
        for (const unidad of inventario) {
            //Prender los aptos del JSON
            this.mascarasProyecto.traverse(child => {
                if (child.type === "Mesh") {
                    if (child.userData.id === unidad.id) {
                        child.visible = true
                        child.layers.enable(1)
                    }
                }
            })
            //Pintar tabla
            const resultado =
                `<tr data-apto="${unidad.id}">
                <td>${unidad.torre}</td>
                <td>${unidad.apto_tit}</td>
                <td>${unidad.tipo_tit}</td>
                <td>${unidad.habitaciones}</td>
                <td>${unidad.piso}</td>
                <td>${unidad.area_ac}</td>
                <td>$${this.formatoNumero.format(unidad.valor)}</td>
                <td>
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.625 1.18751C11.2782 1.17842 12.6875 2.00754 12.6875 4.68751C12.6875 7.36748 6.99995 11.25 6.99995 11.25C6.99995 11.25 1.3125 7.36748 1.3125 4.68751C1.3125 2.00754 2.72178 1.1892 4.375 1.18751C5.25 1.18662 6.45391 1.7364 7.00005 2.50001C7.54609 1.7364 8.74018 1.19238 9.625 1.18751Z" stroke="#70676F" stroke-linejoin="round" />
                    </svg>
                </td>
            </tr>`

            const tablaResultadosActual = this.tablaResultados.innerHTML
            this.tablaResultados.innerHTML = tablaResultadosActual + resultado

            //Actualizar filasApto
            const filasApto = document.querySelectorAll('.listado-resultados tbody tr')

            filasApto.forEach(item => {
                //item.addEventListener('click', hoverFilaApto, false)
            })
        }
    }
}