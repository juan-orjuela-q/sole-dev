//Librerias
import gsap from 'gsap'
//Proyecto
import Maqueta from '../Maqueta'
import Hotspots from './Hotspots'
import Interaccion from "./Interaccion"

export default class Cercanias {
    constructor() {
        this.maqueta = new Maqueta()
        this.camara = this.maqueta.camara.instancia
        this.controles = this.maqueta.camara.controles
        this.hotspots = new Hotspots()
        this.crearSelectores()
        this.mostrarCercanias()
    }
    crearSelectores() {
        this.btnCercanias = document.getElementById('btnCercanias')
        this.modalCercanias = document.getElementById('modal-cercanias')
        this.modalCercanias.querySelectorAll('input').forEach(input => {
            input.checked = true
            if( input.dataset.cercanias === 'cerc-accesos') {
                input.checked = false
            }
        })
        this.hwCercanias = document.querySelector('.hw-cercanias')

        this.btnCercanias.addEventListener('click', this.mostrarInfo)
        this.modalCercanias.querySelector('.btnCerrar-modal').addEventListener('click', this.ocultarInfo)
    }
    mostrarCercanias() {

    }

    mostrarInfo = () => {
        this.maqueta.mostrarCercanias = true
        this.hwCercanias.classList.add('activo')
        const controles = this.controles
        controles.enabled = false
        gsap.to(this.camara.position, {
            duration: 2.5,
            x: -8.5,
            y: 4.01,
            z: 4.2,
            onUpdate: function () {
                controles.update()
            },
            onComplete: function () {
                controles.enabled = true
            }
        })
    }
    ocultarInfo = () => {
        this.hwCercanias.classList.remove('activo')
        this.hwVias.classList.remove('activo')
        this.maqueta.mundo.vias.modelo.visible = false
        this.inputsCercanias.forEach(input => { input.checked = false })
        this.hwCercanias.querySelectorAll('.hotspot').forEach(hotspot => { hotspot.classList.add('oculto') })
        this.hwVias.querySelectorAll('.hotspot').forEach(hotspot => { hotspot.classList.add('oculto') }) 
        
        this.maqueta.mostrarCercanias = false
        
    }
}