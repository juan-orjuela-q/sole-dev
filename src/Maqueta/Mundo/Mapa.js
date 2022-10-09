//Librerias
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
//Proyecto
import Maqueta from '../Maqueta.js'

export default class Mapa {
    constructor(recurso, material, grupo, extrusion, extrusionDepth, materialLinea) {
        this.maqueta = new Maqueta()
        this.escena = this.maqueta.escena
        this.colores = this.maqueta.colores
        //this.svgLoader = this.maqueta.recursos.loaders.svgLoader
        this.recurso = recurso
        this.material = material
        this.grupo = grupo
        this.extrusion = extrusion
        this.extrusionDepth = extrusionDepth
        this.materialLinea = materialLinea
        //Test Mesh
        this.crearCapa()
    }
    crearCapa() {
        const pathsSVG = this.recurso.paths

        for (let i = 0; i < pathsSVG.length; i++) {
            const path = pathsSVG[i]
            const shapes = SVGLoader.createShapes(path)

            for (let j = 0; j < shapes.length; j++) {
                const shape = shapes[j]

                if (this.extrusion) {
                    const meshGeometry = new THREE.ExtrudeBufferGeometry(shape, {
                        depth: this.extrusionDepth,
                        bevelEnabled: false
                    })
                    
                    if(this.materialLinea) {
                        const linesGeometry = new THREE.EdgesGeometry(meshGeometry)
                        const mesh = new THREE.Mesh(meshGeometry, this.material)
                        const lines = new THREE.LineSegments(linesGeometry, this.materialLinea)
                        //mesh.castShadow = true
                        this.grupo.add(mesh, lines)
                    } else {
                        const mesh = new THREE.Mesh(meshGeometry, this.material)
                        mesh.receiveShadow = true
                        this.grupo.add(mesh)
                    }
                }
                else {
                    const geometry = new THREE.ShapeGeometry(shape)
                    const mesh = new THREE.Mesh(geometry, this.material)
                    mesh.receiveShadow = true
                    this.grupo.add(mesh)
                }
            }

        }

    }
}

