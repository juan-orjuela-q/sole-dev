//Librerias
import * as THREE from 'three'
//Proyecto
import Maqueta from '../Maqueta.js'

export default class Modelo {
    constructor(recurso, material, grupo, lineas, env, posicion) {
        this.maqueta = new Maqueta()
        this.escena = this.maqueta.escena
        this.colores = this.maqueta.colores
        this.grupo = grupo
        this.recurso = recurso
        this.material = material
        this.lineas = lineas
        this.env = env
        this.posicion = posicion
        this.crearModelo()

    }
    crearModelo() {

        this.modelo = this.recurso.scene
        // //this.modelo.scale.set(escala.x, escala.y, escala.z)

        this.modelo.traverse((child) => {
            
            child.material = this.material
            //child.castShadow = true
            //child.receiveShadow = true
            //if (child instanceof THREE.Mesh) {
            //    child.castShadow = true
            //}
            if(this.env) {
                child.userData.env = true
            } else {
                child.userData.env = false
            }
        })
        if(this.posicion) {
            this.modelo.position.x = this.posicion.x
            this.modelo.position.y = this.posicion.y
            this.modelo.position.z = this.posicion.z
        }
        this.grupo.add(this.modelo)
        if(this.lineas) {
            
            for (let i = 0; i < this.modelo.children.length; i++) {

                var geo = new THREE.EdgesGeometry(this.modelo.children[i].geometry)
                
                var mat = new THREE.LineBasicMaterial({
                    color: this.colores.coloresMundo.colorEdificiosLinea,
                    linewidth: 1,
                    transparent: true,
                    opacity: .35
                })

                var wireframe = new THREE.LineSegments(geo, mat )
                
                this.modelo.children[i].add(wireframe)
            }
        }
        
    }

} 