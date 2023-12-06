//Librerias
import * as THREE from 'three'
import { Raycaster } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import gsap from 'gsap'
//Proyecto
import Camara from './Camara.js'
import Renderer from './Renderer.js'
import Tamanos from "./Utils/Tamanos.js"
import Tiempo from "./Utils/Tiempo.js"
import Colores from "./Mundo/Skins/Skin_Color/Colores.js"
import Mundo from './Mundo/Mundo.js'
import Recursos from './Utils/Recursos.js'
import sources from './sources.js'
import Debug from './Utils/Debug.js'
import Materiales from './Mundo/Skins/Skin_Color/Materiales.js'
import Interaccion from './Interaccion/Interaccion.js'
import Hotspots from './Interaccion/Hotspots.js'
import Inventario from './Inventario.js'



let instancia = null

export default class Maqueta {
    constructor(canvas) {
        if (instancia) {

            return instancia
        }

        instancia = this

        //Acceso global
        window.maqueta = this
        //Opciones
        this.canvas = canvas

        //Configuracion
        this.debug = new Debug()
        this.tamanos = new Tamanos()
        this.tiempo = new Tiempo()
        this.escena = new THREE.Scene()
        this.camara = new Camara()
        this.colores = new Colores()
        this.renderer = new Renderer()
        this.recursos = new Recursos(sources)
        this.mundo = new Mundo()
        this.materiales = new Materiales()
        this.raycaster = new Raycaster()
        //this.hotspots = new Hotspots().hotspots
        this.hotspotsCercanias = new Hotspots().cercanias
        this.hotspotsZonas = new Hotspots().zonas
        this.mostrarCercanias = false
        this.mostrarZonas = false
        this.frustum = new THREE.Frustum()
        this.inventario = new Inventario()
        this.raycasterAptos = new Raycaster()
        this.raycasterAptos.layers.set(1)
        this.raycasterZonas = new Raycaster()
        this.raycasterZonas.layers.set(2)
        this.mouse = new THREE.Vector2()
        this.interseccionActual = null
        this.brujula_dir = new THREE.Vector3()
        this.brujula_sph = new THREE.Spherical()
        this.brujula = document.getElementById('brujula')
     

        if (this.debug.active) {
            this.stats = Stats()
            document.body.appendChild(this.stats.dom)
        }

        this.tamanos.on('redimensionar', () => {
            this.redimensionar()
        })

        this.tiempo.on('tick', () => {
            this.actualizar()

            if (this.debug.active) {
                this.actualizarStats()
            }
        })



        // Esperar que cargue Recursos
        this.recursos.on('cargado', () => {
            this.interaccion = new Interaccion()
            window.addEventListener('mousemove', (event) => {
                this.mouse.x = event.clientX / this.tamanos.ancho * 2 - 1
                this.mouse.y = - (event.clientY / this.tamanos.alto) * 2 + 1
            })
            //
            this.canvas.addEventListener('click', () => {
                if (this.interseccionActual) {
                    const aptoActivo = this.interseccionActual.object
                    this.interaccion.quitarAislamiento(false)
                    
                    this.interaccion.aislarApto(aptoActivo.userData.id)
                }
                //Zonas
                if (this.interseccionActualZonas) {
                    const zonaActiva = this.interseccionActualZonas.object.name
                    this.interaccion.mostrarZona(zonaActiva)                    
                }
            })
            //
            this.interaccion.btnCerrarTooltip.addEventListener('click', (event) => {
                event.preventDefault()
                this.interaccion.quitarAislamiento(true)
            })
            //
            this.iniciar()
        })
    }
    iniciar() {
        //Quitar loading
        const pantallaCarga = document.getElementById('pantalla-carga'),
        logo = pantallaCarga.querySelector('.logo')

        pantallaCarga.classList.add('cargado')
        
        //Mover camara
        const controles = this.camara.controles
        controles.enabled = false
        gsap.to(this.camara.instancia.position, {
            duration: 5,
            delay: 3,
            ease: "power3.out",
            x: - 4.711,
            y: 2.220,
            z: 3.411,
            onUpdate: function () {
                controles.update()
            },
            onComplete: function () {
                controles.maxDistance = 6
                controles.enabled = true
                logo.classList.add('cargado')

                setTimeout(()=>{pantallaCarga.style.display = 'none'}, 1000)
            }
        })
    }

    redimensionar() {
        this.camara.redimensionar()
        this.renderer.redimensionar()
    }

    actualizar() {
        this.camara.actualizar()
        this.renderer.actualizar()
        this.interactuarMascaras()
        this.moverBrujula()
        //
        if (this.mostrarCercanias) {
            this.posicionarHotspots(this.hotspotsCercanias)
        }
        if (this.mostrarZonas) {
            //this.posicionarHotspots(this.hotspotsZonas)
            this.interactuarZonas()
        } 
    }
    actualizarStats() {
        this.stats.update()
    }

    posicionarHotspots(hotspots) {
        //Evitar problema con hostspots fuera de cámara
        this.frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(this.camara.instancia.projectionMatrix, this.camara.instancia.matrixWorldInverse))
        //Controlar hotspots
        for (const hotspot of hotspots) {
            const screenPosition = hotspot.position.clone()
            screenPosition.project(this.camara.instancia)

            this.raycaster.setFromCamera(screenPosition, this.camara.instancia)
            const intersects = this.raycaster.intersectObjects(this.mundo.grupoProyectoRay.children, true)
            if (intersects.length === 0) {
                if (this.frustum.containsPoint(hotspot.position)) {
                    hotspot.element.classList.add('visible')
                } else {
                    hotspot.element.classList.remove('visible')
                }
            } else {
                const intersectionDistance = intersects[0].distance
                const hotspotDistance = hotspot.position.distanceTo(this.camara.instancia.position)

                if (intersectionDistance < hotspotDistance) {
                    hotspot.element.classList.remove('visible')
                }
                else {
                    hotspot.element.classList.add('visible')
                }
            }

            const translateX = screenPosition.x * this.tamanos.ancho * 0.5
            const translateY = screenPosition.y * this.tamanos.alto * - 0.5
            hotspot.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }
    interactuarMascaras() {
        if (this.mundo.mascarasProyecto.children.length > 0) {
            this.raycasterAptos.setFromCamera(this.mouse, this.camara.instancia)
            const objetosEvaluar = this.mundo.mascarasProyecto.children,
                intersecciones = this.raycasterAptos.intersectObjects(objetosEvaluar, true)
            if (intersecciones.length) {
                this.interseccionActual = intersecciones[0]
                
                if (this.interseccionActual.object.type === 'Mesh') {
                    for (const objeto of objetosEvaluar) {
                        for (const hijo of objeto.children) {
                            if (hijo.userData.activo === false) {
                                //hijo.material = this.materiales.materialesProyecto.mascaras
                                  if (hijo.userData.disponibilidad === 'VENDIDO') {
                                      hijo.material = this.materiales.materialesProyecto.mascarasVendido
                                  } else if (hijo.userData.disponibilidad === 'OPCIONADO') {
                                      hijo.material = this.materiales.materialesProyecto.mascarasOpcionado
                                  } else if (hijo.userData.disponibilidad === 'BLOQUEADA PARA LA VENTA') {
                                      hijo.material = this.materiales.materialesProyecto.mascaras
                                  } else {
                                      hijo.material = this.materiales.materialesProyecto.mascaras
                                  }

                            }
                        }
                    }
                    if (this.interseccionActual.object.userData.activo === false) {
                        this.interseccionActual.object.material = this.materiales.materialesProyecto.mascaraHover
                    }
                }
            } else {
                if (this.interseccionActual) {
                    for (const objeto of objetosEvaluar) {
                        for (const hijo of objeto.children) {
                            if (hijo.userData.activo === false) {
                                //hijo.material = this.materiales.materialesProyecto.mascaras
                                if (hijo.userData.disponibilidad === 'VENDIDO') {
                                    hijo.material = this.materiales.materialesProyecto.mascarasVendido
                                } else if (hijo.userData.disponibilidad === 'OPCIONADO') {
                                    hijo.material = this.materiales.materialesProyecto.mascarasOpcionado
                                } else if (hijo.userData.disponibilidad === 'BLOQUEADA PARA LA VENTA') {
                                    hijo.material = this.materiales.materialesProyecto.mascaras
                                } else {
                                    hijo.material = this.materiales.materialesProyecto.mascaras
                                }
                            }
                        }
                    }
                }
                this.interseccionActual = null
            }
        }
    }
    interactuarZonas() {
        if (this.mundo.mascarasZonas.children.length > 0) {
            this.raycasterZonas.setFromCamera(this.mouse, this.camara.instancia)
            const objetosEvaluar = this.mundo.mascarasZonas.children[0].children,
                intersecciones = this.raycasterZonas.intersectObjects(objetosEvaluar, true)
            if (intersecciones.length) {
                this.interseccionActualZonas = intersecciones[0]
                if (this.interseccionActualZonas.object.type === 'Mesh') {
                    
                    for (const objeto of objetosEvaluar) {
                        if(!objeto.userData.activo) {
                            objeto.material = this.materiales.materialesProyecto.mascarasZonas    
                        }
                                       
                    }
                    if(!this.interseccionActualZonas.object.activo) {
                        this.interseccionActualZonas.object.material = this.materiales.materialesProyecto.mascaraHover  
                    }
                    
                }
            } else {
                if (this.interseccionActualZonas) {
                    for (const objeto of objetosEvaluar) {
                        if(!objeto.userData.activo) {
                            objeto.material = this.materiales.materialesProyecto.mascarasZonas
                        }                        
                    }
                }
                this.interseccionActualZonas = null
            }
        }
    }
    moverBrujula() {
        this.camara.instancia.getWorldDirection(this.brujula_dir)
        this.brujula_sph.setFromVector3(this.brujula_dir)
        this.brujula.style.transform = `rotate(${THREE.Math.radToDeg(this.brujula_sph.theta) - 180}deg)`;
    }
    
    moverCamara(child) {
        //Mover camara
        const target = new THREE.Vector3()
        child.getWorldPosition(target)

        
        const aptoX = target.x,
            aptoY = target.y,
            aptoZ = target.z


        const controles = this.camara.controles
        controles.enabled = false

        //Cambiar posicion y target de camara
        if (child.userData.torre === "1") {
            this.tamanos.posicionCamara.x = 1.5
        } else if (child.userData.torre === "2") {
            this.tamanos.posicionCamara.x = -1
        } else if (child.userData.torre === "3") {
            this.tamanos.posicionCamara.x = -3
        } else {
            console.log('No salio bien')
        }

        /*if (child.userData.vista === "Norte") {
            camaraZ = -6
        } else {
            camaraZ = 6
        }*/

    //    gsap.to(this.camara.instancia.position, {
    //         duration: 1,
    //         x: this.tamanos.posicionCamara.x,
    //         y: this.tamanos.posicionCamara.y,
    //         //z: this.tamanos.posicionCamara.z,
    //         z: 6,
    //         x: -1.54,
    //         y: 2.154,
    //         z: 2.58,
    //         onUpdate: function () {
    //             controles.update()
    //         },
    //         onComplete: function () {
    //             controles.enabled = true
    //         }
    //     })

        gsap.to(controles.target, {
            duration: 1,
            x: aptoX,
            y: aptoY,
            z: aptoZ,
            onUpdate: function () {
                controles.update();
            },
            onComplete: function () {
                controles.enabled = true;
            }
        })

    }
}