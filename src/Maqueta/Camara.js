//Librerias
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//Proyecto
import Maqueta from './Maqueta.js'

export default class Camara {
    constructor() {
        this.maqueta = new Maqueta()
        this.tamanos = this.maqueta.tamanos
        this.escena = this.maqueta.escena
        this.canvas = this.maqueta.canvas

        this.crearInstanciaCamara()
        this.crearOrbitControls()
    }

    crearInstanciaCamara() {
        this.instancia = new THREE.PerspectiveCamera(75, this.tamanos.ancho / this.tamanos.alto, 0.01, 250)
        //this.instancia.position.set(-4.655, 1.649, 5.146)
        this.instancia.position.set(-0.247, 0.750, 2.989)
        this.escena.add(this.instancia)
    }

    crearOrbitControls() {
        this.controles = new OrbitControls(this.instancia, this.canvas)
        this.controles.enableDamping = true
        this.controles.target.set(0, 0.75, 0)
        this.controles.minPolarAngle = Math.PI * 0.35;
        this.controles.maxPolarAngle = Math.PI * 0.5;
        this.controles.minDistance = 3
        this.controles.maxDistance = 35
    }

    redimensionar() {
        this.instancia.aspect = this.tamanos.ancho / this.tamanos.alto
        this.instancia.updateProjectionMatrix()
        
    }

    actualizar() {
        this.controles.update()
    }
}