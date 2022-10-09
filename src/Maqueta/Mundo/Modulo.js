//Librerias
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
//Proyecto
import Maqueta from '../Maqueta.js'

export default class Modulo {
    constructor(recurso, material, grupo) {
        this.maqueta = new Maqueta()
        this.escena = this.maqueta.escena
        this.colores = this.maqueta.colores
        this.recurso = recurso
        this.material = material
        this.grupo = grupo

       
        //
        this.crearModulo()
    }
    numAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    crearModulo() {
        const pathsSVG = this.recurso.paths
        let posicionArboles = []
        let posicionArboles2 = []

        for (let i = 0; i < pathsSVG.length; i++) {
            const path = pathsSVG[i]
            const ran = this.numAleatorio(1, 2)
            
            if (ran === 1) {
                posicionArboles.push(path.subPaths[0].currentPoint);
            } else {
                posicionArboles2.push(path.subPaths[0].currentPoint);
            }

        }

        function agregarArboles(gltf) {
            gltf.scene.traverse((child) => {
                child.material = mat_arbol1
                child.castShadow = true

            })
            for (let p = 0; p < posicionArboles.length; p++) {
                const n = this.numAleatorio(65, 100) / 100
                const r = (Math.random() * 2) * Math.PI
                const arbolito = new THREE.Object3D()
                gltf.scene.scale.set(0.1, 0.1, 0.1)
                arbolito.add(gltf.scene.clone())
                arbolito.position.set(posicionArboles[p].x, -0.05, posicionArboles[p].y)
                arbolito.children[0].children[0].scale.set(n, n, n)
                arbolito.children[0].children[0].rotation.y = r
                //arbolito.scale.set(n, n, n)
                losArboles.add(arbolito)
            }
        }

        //

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
                        mesh.castShadow = true
                        this.grupo.add(mesh, lines)
                    } else {
                        const mesh = new THREE.Mesh(meshGeometry, this.material)
                        mesh.castShadow = true
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

svgloader.load(
    'mapa/mapa_arboles.svg',
    function (data) {
        const pathsSVG = data.paths
        let posicionArboles = []
        let posicionArboles2 = []
        for (let i = 0; i < pathsSVG.length; i++) {
            const path = pathsSVG[i]
            const ran = numAleatorio(1, 2)
            //console.log(path.subPaths[0].currentPoint)
            if (ran === 1) {
                posicionArboles.push(path.subPaths[0].currentPoint);
            } else {
                posicionArboles2.push(path.subPaths[0].currentPoint);
            }

        }
        gltfLoader.load('modelos/arbol_1.glb', agregarArboles)
        gltfLoader.load('modelos/arbol_2.glb', agregarArboles2)
        function agregarArboles(gltf) {
            gltf.scene.traverse((child) => {
                child.material = mat_arbol1
                child.castShadow = true

            })
            for (let p = 0; p < posicionArboles.length; p++) {
                const n = numAleatorio(65, 100) / 100
                const r = (Math.random() * 2) * Math.PI
                const arbolito = new THREE.Object3D()
                gltf.scene.scale.set(0.1, 0.1, 0.1)
                arbolito.add(gltf.scene.clone())
                arbolito.position.set(posicionArboles[p].x, -0.05, posicionArboles[p].y)
                arbolito.children[0].children[0].scale.set(n, n, n)
                arbolito.children[0].children[0].rotation.y = r
                //arbolito.scale.set(n, n, n)
                losArboles.add(arbolito)
            }
        }
        function agregarArboles2(gltf) {
            gltf.scene.traverse((child) => {
                child.material = mat_arbol2
                child.castShadow = true

            })
            for (let p = 0; p < posicionArboles2.length; p++) {
                const n = numAleatorio(45, 90) / 100
                const r = (Math.random() * 2) * Math.PI
                const arbolito = new THREE.Object3D()
                gltf.scene.scale.set(0.1, 0.1, 0.1)
                arbolito.add(gltf.scene.clone())
                arbolito.position.set(posicionArboles2[p].x, -0.05, posicionArboles2[p].y)
                arbolito.children[0].children[0].scale.set(n, n, n)
                arbolito.children[0].children[0].rotation.y = r
                losArboles.add(arbolito)
            }
        }
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado árboles pos')
    },
    function (error) {
        console.log('Algo malo pasa con los árboles pos')
        console.log(error)
    }
)