//Librerias
import * as THREE from 'three'
//Proyecto
import Maqueta from "./Maqueta"
import {obtenerUnidadesPorProyecto, obtenerProyectoPorMegaproyecto} from './ConsultarERP'

export default class Inventario {
    constructor() {
        this.maqueta = new Maqueta()
        this.escena = this.maqueta.escena
        this.recursos = this.maqueta.recursos

        this.mascarasProyecto = this.maqueta.mundo.mascarasProyecto
        //this.btnFiltrar = document.getElementById('filtrar')


        //this.tablaResultados = document.querySelector('#resultados tbody')
        //this.formatoNumero = Intl.NumberFormat('de-DE')

        // this.recursos.on('cargado', () => {
        //     this.inventario = this.recursos.items.inventario
        //     //this.cargarMascarasTest()
        //     this.cargarMascaras()
        // })
        this.recursos.on('cargado', () => {
                        
            async function consumo(interaccion) {
                const idProyecto = 512;
                const unidades = await obtenerUnidadesPorProyecto(idProyecto);
                //console.log('unidades:', unidades);
                if(unidades) {
                    interaccion.crearInventario(unidades)
                    interaccion.cargarMascarasTest()
                } else {
                    console.log('Me estoy enloqueciendo')
                }
                
                
            }
            consumo(this);
        })
    }
    crearInventario(data) {
        this.inventario = data
        console.log('Mi inventario: ', this.inventario)
     }
    cargarMascarasTest() {
        for (const mascara of this.recursos.items.mascarasInventario.scene.children) {
            const name = mascara.name
            //torre_1_904_tipo_4
            console.log(name)
        }
    }

    //COGNIS
    cargarMascaras() {

        for (const mascara of this.recursos.items.mascarasInventario.scene.children) {

            //Ejemplo nombre de máscara: TORRE1-APT-0705-TIPO3
            //Ejemplo inventario ITEM.nombre: "APT-0705"
            //Colpatria
            const name = mascara.name,
                id = name.substring(7, name.match("-TIPO").index),
                torre = name.substring(name.match("TORRE").index + 5, name.match("-APT").index),
                num = name.substring(name.match("APT").index + 4, name.match("-TIPO").index),
                cam = num.charAt(num.length - 1);

            //Agregar atributos
            mascara.userData.id = id
            mascara.userData.torre = torre
            mascara.userData.numero = num
            mascara.userData.activo = false
            //mascara.userData.tipo = tipo
            mascara.userData.camara = cam
            mascara.visible = false

            console.log(mascara.userData)

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
    //COGNIS ignorar por ahora
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