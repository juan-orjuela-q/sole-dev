import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { Raycaster } from 'three'
import gsap from 'gsap'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js'
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass.js'
import Stats from 'three/examples/jsm/libs/stats.module'

console.log(SAOPass)

//Recorridos 360
const modalTour = document.querySelector('#modal-tour'),
    tourApto = modalTour.querySelector('.appicua-tour'),
    btnTour = document.querySelector('#btn-tour-360'),
    btnTourCerrar = modalTour.querySelector('.btn-cerrar-360')
/**
 * MAQUETA
 */
//Menu maqueta

//const anchoModal = menuMaqueta.offsetWidth 
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
// Debug
const gui = new dat.GUI()
let mapaFolder = gui.addFolder('Mapa'),
    lucesFolder = gui.addFolder('Luces'),
    aptosFolder = gui.addFolder('Aptos'),
    coloresFolder = gui.addFolder('Colores'),
    proyectoFolder = gui.addFolder('Proyecto'),
    mapa_generalFolder = mapaFolder.addFolder('General'),
    mapa_arbolesFolder = mapaFolder.addFolder('Árboles'),
    mapa_andenesFolder = mapaFolder.addFolder('Andenes'),
    mapa_terrenosFolder = mapaFolder.addFolder('Terrenos'),
    mapa_contextoFolder = mapaFolder.addFolder('Contexto')

mapaFolder.close()
lucesFolder.close()
aptosFolder.close()
coloresFolder.close()
proyectoFolder.close()
// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()
/**
 * Loaders
 */

const loadingManager = new THREE.LoadingManager(
    //Cargado
    () => {
        console.log('MAQUETA LISTA');
        cargando.classList.add('cargado')
        setTimeout(_ => cargando.remove(), 1200)
    },
    //En progreso
    (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal
        barraCarga.style.transform = `scaleX(${progressRatio})`
    }
)
const dracoLoader = new DRACOLoader(loadingManager),
    gltfLoader = new GLTFLoader(loadingManager),
    svgloader = new SVGLoader(loadingManager),
    cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager),
    textureLoader = new THREE.TextureLoader(loadingManager)

dracoLoader.setDecoderPath('/draco/')
gltfLoader.setDRACOLoader(dracoLoader)
// Axes helper
const axesHelper = new THREE.AxesHelper(2)
//scene.add(axesHelper)
//Colores
const colores = {
    colorProyecto: '#EDE0CE',
    colorProyectoAlt: '#F5F5F5',
    contextoFillColor: '#c7cbd1',
    contextoLineColor: '#ffffff',
    colorVias: '#8995a4',
    colorTransito: '#222431',
    colorAlerta: '#C1403A',
    colorArboles: '#d3ddc0',
    colorAndenes: '#c2c8d0',
    colorCielo: '#f5ffff',
    colorBruma: '#f5ffff',
    mascara_1: '#458376',
    mascara_2: '#C1403A',
    mascara_3: '#313c90',
    colorTerreno: '#eff4e6',
    colorPoint: '#c7c7c7',
    colorPoint2: '#ffffff',
    //Colores version alterna
    mainArboles: '#d3ddc0',
    mainArbustos: '#a4b18c',
    mainBarandas: '#ffffff',
    mainBbq: '#c18b8b',
    mainCarros: '#84889f',
    mainComunal: '#ffffff',//#f3f1e8
    mainJuegos: '#c18b8b',
    mainLuminarias: '#222431',
    mainTorres: '#ffffff',//#f3f1e8
    mainTorresLineas: '#ffffff',
    mainUrbano: '#ffffff'
}

const paletaMascaras = [colores.mascara_1, colores.mascara_2, colores.mascara_3]

/**
 * Texturas
 */
const environmentMap = cubeTextureLoader.load([
    'env-3/px.png',
    'env-3/nx.png',
    'env-3/py.png',
    'env-3/ny.png',
    'env-3/pz.png',
    'env-3/nz.png'
])

scene.background = environmentMap

const text_arboles = textureLoader.load('texturas/arboles.webp'),
    text_arbustos = textureLoader.load('texturas/arbustos.webp'),
    text_barandas = textureLoader.load('texturas/barandas_diffuse_abr.webp'),
    text_barandasAlpha = textureLoader.load('texturas/barandas_alpha_abr.webp'),
    text_bbq = textureLoader.load('texturas/bbq.webp'),
    text_carros_abajo = textureLoader.load('texturas/carros_abajo.webp'),
    text_carros_arriba = textureLoader.load('texturas/carros_arriba.webp'),
    text_comunal = textureLoader.load('texturas/comunal.webp'),
    text_juegos = textureLoader.load('texturas/juegos.webp'),
    text_juegos_2 = textureLoader.load('texturas/juegos_2.webp'),
    text_luminarias = textureLoader.load('texturas/luminarias.webp'),
    text_torre_baja = textureLoader.load('texturas/torre_baja.webp'),
    text_torre_sole_1 = textureLoader.load('texturas/torre_sole_1.webp'),
    text_torre_sole_2 = textureLoader.load('texturas/torre_sole_2.webp'),
    text_urbano = textureLoader.load('texturas/urbano.webp'),
    text_arbol_1 = textureLoader.load('texturas/arbol_1.webp'),
    text_arbol_2 = textureLoader.load('texturas/arbol_2.webp'),
    text_vias_1 = textureLoader.load('texturas/vias_1.webp'),
    text_vias_2 = textureLoader.load('texturas/vias_2.webp'),
    text_disp_terreno = textureLoader.load('texturas/disp_terreno.jpg'),
    text_mapa = textureLoader.load('texturas/seamless-grass.jpg'),
    text_nube = textureLoader.load('texturas/nube.png'),
    amb_torre_baja = textureLoader.load('texturas/textura_torre_baja.webp'),
    amb_torre_sole_1 = textureLoader.load('texturas/textura_torre_sole_1.webp'),
    amb_torre_sole_2 = textureLoader.load('texturas/textura_torre_sole_2.webp'),
    amb_comunal = textureLoader.load('texturas/textura_comunal.webp')


text_mapa.wrapS = THREE.RepeatWrapping
text_mapa.wrapT = THREE.RepeatWrapping
text_mapa.repeat.set(200, 200)

text_nube.wrapS = THREE.RepeatWrapping
text_nube.wrapT = THREE.RepeatWrapping
text_nube.repeat.set(10, 10)

text_arboles.flipY = false
text_arbustos.flipY = false
text_barandas.flipY = false
text_barandasAlpha.flipY = false
text_bbq.flipY = false
text_carros_abajo.flipY = false
text_carros_arriba.flipY = false
text_comunal.flipY = false
text_juegos.flipY = false
text_juegos_2.flipY = false
text_luminarias.flipY = false
text_torre_baja.flipY = false
text_torre_sole_1.flipY = false
text_torre_sole_2.flipY = false
text_urbano.flipY = false
text_arbol_1.flipY = false
text_arbol_2.flipY = false
text_vias_1.flipY = false
text_vias_2.flipY = false
//Ambient
amb_comunal.flipY = false
amb_torre_baja.flipY = false
amb_torre_sole_1.flipY = false
amb_torre_sole_2.flipY = false
//matcapTexture.flipY = false


/**
* Materiales
*/
const mat_arboles = new THREE.MeshBasicMaterial({ map: text_arboles }),
    mat_arbustos = new THREE.MeshBasicMaterial({ map: text_arbustos }),
    mat_barandas = new THREE.MeshBasicMaterial({ map: text_barandas, alphaMap: text_barandasAlpha, transparent: true }),
    mat_bbq = new THREE.MeshBasicMaterial({ map: text_bbq }),
    mat_carros_abajo = new THREE.MeshBasicMaterial({ map: text_carros_abajo }),
    mat_carros_arriba = new THREE.MeshBasicMaterial({ map: text_carros_arriba }),
    mat_comunal = new THREE.MeshStandardMaterial({ color: '#ffffff', map: amb_comunal }),
    mat_juegos = new THREE.MeshBasicMaterial({ map: text_juegos }),
    mat_juegos_2 = new THREE.MeshBasicMaterial({ map: text_juegos_2 }),
    mat_luminarias = new THREE.MeshBasicMaterial({ map: text_luminarias }),
    mat_torre_baja = new THREE.MeshBasicMaterial({ map: amb_torre_baja }),
    mat_torre_sole_1 = new THREE.MeshBasicMaterial({ map: amb_torre_sole_1 }),
    mat_torre_sole_2 = new THREE.MeshBasicMaterial({ map: amb_torre_sole_2 }),
    mat_urbano = new THREE.MeshBasicMaterial({ map: text_urbano })

//Materiales alternos
const mat_arbolesAlt = new THREE.MeshStandardMaterial({ color: colores.mainArboles }),
    mat_arbustosAlt = new THREE.MeshStandardMaterial({ color: colores.mainArbustos }),
    mat_barandasAlt = new THREE.MeshStandardMaterial({ color: colores.mainBarandas, alphaMap: text_barandasAlpha, transparent: true }),
    mat_bbqAlt = new THREE.MeshStandardMaterial({ color: colores.mainBbq }),
    mat_carrosAlt = new THREE.MeshStandardMaterial({ color: colores.mainCarros }),
    mat_comunalAlt = new THREE.MeshStandardMaterial({ color: colores.mainComunal }),
    mat_juegosAlt = new THREE.MeshStandardMaterial({ color: colores.mainJuegos }),
    mat_luminariasAlt = new THREE.MeshStandardMaterial({ color: colores.mainLuminarias }),
    mat_torresAlt = new THREE.MeshStandardMaterial({ color: colores.mainTorres }),
    mat_urbanoAlt = new THREE.MeshStandardMaterial({ color: colores.mainUrbano, transparent: true, opacity: 0 }),
    mat_torresLineas = new THREE.LineBasicMaterial({ color: colores.mainTorresLineas, linewidth: 1, transparent: true, opacity: 0 })
//Materiales color
const materialLinea = new THREE.LineBasicMaterial({ color: colores.contextoLineColor, linewidth: 1, transparent: true, opacity: .35 });

const mat_arbol1 = new THREE.MeshStandardMaterial({ color: colores.colorArboles }),
    mat_arbol2 = new THREE.MeshStandardMaterial({ color: colores.colorArboles }),
    mat_vias1 = new THREE.MeshStandardMaterial({ color: colores.colorVias }),
    mat_vias2 = new THREE.MeshStandardMaterial({ color: colores.colorAndenes }),
    mat_piso = new THREE.MeshStandardMaterial({ color: colores.colorTerreno, bumpMap: text_mapa, bumpScale: .015 })


const contextoMaterial = new THREE.MeshStandardMaterial({
    color: colores.contextoFillColor,
    transparent: true,
    opacity: .95,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1
})

const mat_vias = new THREE.MeshStandardMaterial({
    color: colores.colorVias,
    transparent: false,
    side: THREE.DoubleSide,
    depthWrite: true
})

const mat_andenes = new THREE.MeshStandardMaterial({
    color: colores.colorAndenes,
    transparent: false,
    side: THREE.DoubleSide,
    depthWrite: true

})

const mat_transito = new THREE.MeshBasicMaterial({
    color: colores.colorTransito,
    transparent: false,
    side: THREE.DoubleSide,
    depthWrite: true
})

const mat_acceso = new THREE.MeshBasicMaterial({
    color: colores.colorAlerta,
    transparent: false,
    side: THREE.DoubleSide,
    depthWrite: true
})

const mat_terreno = new THREE.MeshStandardMaterial({
    displacementMap: text_disp_terreno,
    displacementScale: 27,
    //wireframe: true,
    color: colores.colorTerreno,

})

/**
 * Interaccion
 */
const lilGUI = document.querySelector('.lil-gui')

function toogleGUI() {
    lilGUI.classList.toggle('oculto')
}

toogleGUI()

window.addEventListener('keydown', (event) => {
    if (event.key === 'l') {
        toogleGUI()
    } 
})



const formatoNumero = Intl.NumberFormat('de-DE')

btnsTipologia.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        if (item.classList.contains('activo')) {
            item.classList.remove('activo')
        } else {
            item.classList.add('activo')
        }
    })
})
btnCerrar.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault()
        let modal = item.parentNode

        anchoModal = 0
        redimensionar()
        modal.classList.remove('activo')

        if (modal.id === 'modal-cercanias') {
            hwInfo.classList.remove('activo')
        }
    })
})
btnsFlotantes.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault()
        const destino = document.querySelector(item.dataset.destino)
        //Mostrar Pop UP
        destino.classList.add('activo')
        //Redimensionar maqueta
        anchoModal = destino.offsetWidth
        redimensionar()
    })
})
const btnCambioEscena = document.querySelector('#btn-cambioEscena'),
    maquetaRender = document.querySelector('#maqueta-render')

let escRender = true,
    frameActual = 0



let renders = []
for (let i = 0; i < 120; i++) {
    const render = `maqRender/${i}.jpg`
    renders.push(render)
}
$(function () {
    $('#maqueta-render').spritespin({
        source: renders,
        width: 1920,
        height: 1080,
        // reverse interaction direction
        sense: -1,
        animate: false,
        onFrame: function (e, data) {
            frameActual = data.frame
        }
    });
})

btnCambioEscena.addEventListener('click', event => {
    btnCambioEscena.classList.toggle('activo')
    maquetaRender.classList.toggle('activo')
    if (escRender) {

        escRender = false
    } else {
        escRender = true
    }
})

btnCambioEscena.click()
const btnCercanias = document.getElementById('btnCercanias')
btnCercanias.addEventListener('click', mostrarInfo)

const modalCercanias = document.getElementById('modal-cercanias')
modalCercanias.querySelectorAll('input').forEach(input => input.checked = true)
//Aislar apto
let camaraX = 5,
    camaraY = 4,
    camaraZ = 5

const tooltipApto = document.getElementById('tooltip-apto'),
    tool_torre = tooltipApto.querySelector('.torre span'),
    tool_apto = tooltipApto.querySelector('.apto span'),
    tool_ac = tooltipApto.querySelector('.a-c span'),
    tool_ap = tooltipApto.querySelector('.a-p span'),
    tool_img = tooltipApto.querySelector('.tool-img')

const btnMostrarApto = document.querySelector('#tooltip-apto .btn-ir')

function aislarApto(identificador) {

    const filasResultados = Array.from(document.querySelectorAll('#modal-unidades tbody tr'))
    const filasFavoritos = Array.from(document.querySelectorAll('#modal-favoritos tbody tr'))

    if (filasResultados) {
        filasResultados.forEach(fila => fila.classList.remove('activo'))
        let fila = filasResultados.find(fila => fila.dataset.apto === identificador)
        fila.classList.add('activo')
    }

    mascarasProyecto.traverse((child) => {

        if (child.type === "Mesh") {
            //Limpiar mascaras
            if (child.userData.tipo === '1') {
                child.material = materialFill_a1
            } else if (child.userData.tipo === '2') {
                child.material = materialFill_a2
            } else if (child.userData.tipo === '3') {
                child.material = materialFill_a3
            } else {
                console.log('Problema con Fila')
            }
            //Poner mascara
            if (child.userData.id === identificador) {
                child.material = mascaraHover

                //Mover camara
                const aptoX = child.position.x * mascarasProyecto.scale.x + (pModX * 1),
                    aptoY = child.position.y * mascarasProyecto.scale.y + (pModY * 1),
                    aptoZ = child.position.z * mascarasProyecto.scale.z + (pModZ * 1)

                controls.enabled = false

                //Cambiar posicion y target de camara
                if (child.userData.torre === "1") {
                    camaraX = 1.5
                } else if (child.userData.torre === "2") {
                    camaraX = -1
                } else if (child.userData.torre === "3") {
                    camaraX = -3
                } else {
                    console.log('No salio bien')
                }

                if (child.userData.vista === "Norte") {
                    camaraZ = -6
                } else {
                    camaraZ = 6
                }

                gsap.to(camera.position, {
                    duration: 1,
                    x: camaraX,
                    y: camaraY,
                    z: camaraZ,
                    onUpdate: function () {
                        controls.update()
                    },
                    onComplete: function () {
                        controls.enabled = true
                    }
                })

                gsap.to(controls.target, {
                    duration: 1,
                    x: aptoX,
                    y: aptoY,
                    z: aptoZ,
                    onUpdate: function () {
                        controls.update();
                    },
                    onComplete: function () {
                        controls.enabled = true;
                    }
                });
                //Mostrar tooltip

                tooltipApto.classList.add('activo')
                btnMostrarApto.dataset.destino = identificador
                //Pintar info

                let obj = infoTipologias.find(obj => obj.id === identificador)

                tool_torre.innerHTML = obj.torre
                tool_apto.innerHTML = obj.apto_tit
                tool_ac.innerHTML = obj.area_ac
                tool_ap.innerHTML = obj.area_ap
                tool_img.innerHTML = `<img src="${obj.img_planta}" alt="Planta de unidad">`
                /*const positionTooltip = new THREE.Vector3(aptoX, aptoY, aptoZ),
                    screenPosition = positionTooltip.clone()

                screenPosition.project(camera)
                const translateX = screenPosition.x * sizes.width * 0.5
                const translateY = screenPosition.y * sizes.height * - 0.5
                tooltipApto.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`*/




            }
        }
    })
}

function quitarAislamiento() {
    tooltipApto.classList.remove('activo')
    btnMostrarApto.dataset.destino = ''

    const filasResultados = Array.from(document.querySelectorAll('#modal-unidades tbody tr'))
    const filasFavoritos = Array.from(document.querySelectorAll('#modal-favoritos tbody tr'))

    if (filasResultados) {
        filasResultados.forEach(fila => fila.classList.remove('activo'))
    }

    mascarasProyecto.traverse((child) => {

        if (child.type === "Mesh") {
            //Limpiar mascaras
            if (child.userData.tipo === '1') {
                child.material = materialFill_a1
            } else if (child.userData.tipo === '2') {
                child.material = materialFill_a2
            } else if (child.userData.tipo === '3') {
                child.material = materialFill_a3
            } else {
                console.log('Problema con Fila')
            }

        }
    })

    controls.enabled = false
    gsap.to(controls.target, {
        duration: 1,
        x: 0,
        y: 0,
        z: 0,
        onUpdate: function () {
            controls.update();
        },
        onComplete: function () {
            controls.enabled = true;
        }
    });
}

const btnCerrarTooltip = document.querySelector('#tooltip-apto .btn-cerrar')

btnCerrarTooltip.addEventListener('click', (event) => {
    event.preventDefault();
    quitarAislamiento()
})

//Hover máscaras con listados
function hoverFilaApto(e) {
    e.preventDefault()
    e.stopPropagation()
    const fila = e.target,
        filaID = fila.dataset.apto
    if (filaID) {
        aislarApto(filaID)
    }
}

/**
 * Modelos
 */

//Escena principal
const pModX = 3
const pModY = 0
const pModZ = -5.75

const escenaPrincipal = new THREE.Group();
escenaPrincipal.position.y = 0.02
scene.add(escenaPrincipal)

// Carga modelos
gltfLoader.load(
    'modelos/arboles.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_arbolesAlt
            child.castShadow = true
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/arbustos.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_arbustosAlt
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/barandas_abr.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_barandasAlt
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/bbq.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_bbqAlt
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/carros_abajo.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_carrosAlt
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/carros_arriba.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_carrosAlt
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)
gltfLoader.load(
    'modelos/n_comunal.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_comunal
            //child.material = mat_comunalAlt
            child.castShadow = true
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
        //Agregar bordes
        for (let i = 0; i < gltf.scene.children.length; i++) {
            var geo = new THREE.EdgesGeometry(gltf.scene.children[i].geometry);
            var wireframe = new THREE.LineSegments(geo, mat_torresLineas);
            gltf.scene.children[i].add(wireframe)
        }
    }
)
gltfLoader.load(
    'modelos/juegos_2.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            //child.material = mat_juegos_2
            child.material = mat_juegosAlt
            
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)
gltfLoader.load(
    'modelos/juegos.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            //child.material = mat_juegos
            child.material = mat_juegosAlt
            
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/luminarias.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            //child.material = mat_luminarias
            child.material = mat_luminariasAlt
            
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/n_torre_baja.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_torre_baja
            //child.material = mat_torresAlt
            child.castShadow = true
            
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
        
        //Agregar bordes
        for (let i = 0; i < gltf.scene.children.length; i++) {
            var geo = new THREE.EdgesGeometry(gltf.scene.children[i].geometry);
            var wireframe = new THREE.LineSegments(geo, mat_torresLineas);
            gltf.scene.children[i].add(wireframe)
        }
    }
)

gltfLoader.load(
    'modelos/n_torre_sole_1.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_torre_sole_1
            //child.material = mat_torresAlt
            child.castShadow = true
            
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
        //Agregar bordes
        for (let i = 0; i < gltf.scene.children.length; i++) {
            var geo = new THREE.EdgesGeometry(gltf.scene.children[i].geometry);
            var wireframe = new THREE.LineSegments(geo, mat_torresLineas);
            gltf.scene.children[i].add(wireframe)
        }
    }
)
gltfLoader.load(
    'modelos/n_torre_sole_2.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_torre_sole_2
            //child.material = mat_torresAlt
            child.castShadow = true
            
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)

        //Agregar bordes
        for (let i = 0; i < gltf.scene.children.length; i++) {
            var geo = new THREE.EdgesGeometry(gltf.scene.children[i].geometry);
            var wireframe = new THREE.LineSegments(geo, mat_torresLineas);
            gltf.scene.children[i].add(wireframe)
        }


    }
)

gltfLoader.load(
    'modelos/urbano.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            //child.material = mat_urbano
            child.material = mat_urbanoAlt
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
        
    }
)

//Contexto
const contexto = new THREE.Group();
scene.add(contexto)

gltfLoader.load(
    'modelos/vecinos/vecinos.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = contextoMaterial
            child.castShadow = true
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY + 0.05, pModZ)

        contexto.add(gltf.scene)
        //Agregar bordes
        for (let i = 0; i < gltf.scene.children.length; i++) {
            var geo = new THREE.EdgesGeometry(gltf.scene.children[i].geometry);
            var wireframe = new THREE.LineSegments(geo, materialLinea);
            gltf.scene.children[i].add(wireframe)
        }
    }
)

gltfLoader.load(
    'modelos/vecinos/proyecto_vecino.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = contextoMaterial
            child.castShadow = true
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY + 0.05, pModZ)

        contexto.add(gltf.scene)
        //Agregar bordes
        for (let i = 0; i < gltf.scene.children.length; i++) {
            var geo = new THREE.EdgesGeometry(gltf.scene.children[i].geometry);
            var wireframe = new THREE.LineSegments(geo, materialLinea);
            gltf.scene.children[i].add(wireframe)
        }
    }
)
gltfLoader.load(
    'modelos/vecinos/comercio.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = contextoMaterial
            child.castShadow = true
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY + 0.05, pModZ)

        contexto.add(gltf.scene)
        //Agregar bordes
        for (let i = 0; i < gltf.scene.children.length; i++) {
            var geo = new THREE.EdgesGeometry(gltf.scene.children[i].geometry);
            var wireframe = new THREE.LineSegments(geo, materialLinea);
            gltf.scene.children[i].add(wireframe)
        }
    }
)

//Mapa
const mapa = new THREE.Group();
const vias = new THREE.Group();
const andenes = new THREE.Group();
const transito_fijo = new THREE.Group();
const transito = new THREE.Group();
const arqui = new THREE.Group();

//Vias
svgloader.load(
    'mapa/vias_ALT.svg',
    function (data) {
        const pathsSVG = data.paths
        for (let i = 0; i < pathsSVG.length; i++) {
            const path = pathsSVG[i]

            const shapes = SVGLoader.createShapes(path)
            for (let j = 0; j < shapes.length; j++) {

                const shape = shapes[j]
                const geometry = new THREE.ShapeGeometry(shape)
                const mesh = new THREE.Mesh(geometry, mat_vias)
                mesh.receiveShadow = true
                vias.add(mesh)
            }
        }
        
        vias.position.z = -0.01
        mapa.add(vias)

    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado vias')
    },
    function (error) {
        console.log('Algo malo pasa con las vias')
    }
)

//Andenes
svgloader.load(
    'mapa/andenes_ALT.svg',
    function (data) {
        const pathsSVG = data.paths
        for (let i = 0; i < pathsSVG.length; i++) {
            const path = pathsSVG[i]
            const shapes = SVGLoader.createShapes(path)

            for (let j = 0; j < shapes.length; j++) {
                const shape = shapes[j]
                /*const geometry = new THREE.ShapeGeometry(shape)
                const mesh = new THREE.Mesh(geometry, mat_andenes)
                andenes.add(mesh)*/

                const meshGeometry = new THREE.ExtrudeBufferGeometry(shape, {
                    depth: .075,
                    bevelEnabled: false
                })
                const mesh = new THREE.Mesh(meshGeometry, mat_andenes)
                mesh.receiveShadow = true

                andenes.add(mesh)
            }
        }
        andenes.position.set(4, 25.9, 0)
        mapa_andenesFolder.add(andenes.position, 'x').min(-200).max(200).step(0.1).name('andenes X')
        mapa_andenesFolder.add(andenes.position, 'y').min(-200).max(200).step(0.1).name('andenes Y')
        mapa_andenesFolder.add(andenes.position, 'z').min(-2).max(2).step(0.01).name('andenes Z')
        mapa.add(andenes)

    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado andenes')
    },
    function (error) {
        console.log('Algo malo pasa con los andenes')
    }
)
//Tránsito
svgloader.load(
    'mapa/mapa_transito.svg',
    function (data) {
        const pathsSVG = data.paths
        for (let i = 0; i < pathsSVG.length; i++) {

            const path = pathsSVG[i]
            const shapes = SVGLoader.createShapes(path)

            for (let j = 0; j < shapes.length; j++) {

                const shape = shapes[j]
                const geometry = new THREE.ShapeGeometry(shape)
                const mesh = new THREE.Mesh(geometry, mat_acceso)
                transito.add(mesh)
            }
        }
        transito.position.set(87.3, 91.5, -0.13)

        /*gui.add(transito.position, 'x').min(-200).max(200).step(0.1).name('transito X')
        gui.add(transito.position, 'y').min(-200).max(200).step(0.1).name('transito Y')
        gui.add(transito.position, 'z').min(-2).max(2).step(0.01).name('transito Z')

        gui.add(transito.scale, 'x').min(-200).max(200).step(0.1).name('transito sc X')
        gui.add(transito.scale, 'y').min(-200).max(200).step(0.1).name('transito sc Y')
        gui.add(transito.scale, 'z').min(-2).max(2).step(0.01).name('transito sc Z')*/

    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado transito')
    },
    function (error) {
        console.log('Algo malo pasa con los transito')
    }
)
//Tránsito Fijo
svgloader.load(
    'mapa/mapa_transito_fijo.svg',
    function (data) {
        console.log(data)
        const pathsSVG = data.paths

        for (let i = 0; i < pathsSVG.length; i++) {

            const path = pathsSVG[i]
            const shapes = SVGLoader.createShapes(path)

            for (let j = 0; j < shapes.length; j++) {

                const shape = shapes[j]
                const geometry = new THREE.ShapeGeometry(shape)
                const mesh = new THREE.Mesh(geometry, mat_transito)
                transito_fijo.add(mesh)
            }
        }
        transito_fijo.position.set(87.65, 85.6, -0.13)

        /*gui.add(transito_fijo.position, 'x').min(-200).max(200).step(0.1).name('transito fijo X')
        gui.add(transito_fijo.position, 'y').min(-200).max(200).step(0.1).name('transito fijo Y')
        gui.add(transito_fijo.position, 'z').min(-2).max(2).step(0.01).name('transito fijo Z')

        gui.add(transito_fijo.scale, 'x').min(-200).max(200).step(0.1).name('transito fijo sc X')
        gui.add(transito_fijo.scale, 'y').min(-200).max(200).step(0.1).name('transito fijo sc Y')
        gui.add(transito_fijo.scale, 'z').min(-2).max(2).step(0.01).name('transito fijo sc Z')*/

        mapa.add(transito_fijo)

    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado transito fijo')
    },
    function (error) {
        console.log('Algo malo pasa con los transito fijo')
    }
)

//Arqui


svgloader.load(
    'mapa/mapa_arqui.svg',
    function (data) {
        console.log(data)
        const pathsSVG = data.paths

        for (let i = 0; i < pathsSVG.length; i++) {

            const path = pathsSVG[i]

            const shapes = SVGLoader.createShapes(path)
            // Opcion 1
            /*
            for ( let j = 0; j < shapes.length; j ++ ) {

                const shape = shapes[ j ]
                const geometry = new THREE.ShapeGeometry( shape )
                const mesh = new THREE.Mesh( geometry, material )
                arqui.add( mesh )
                
            }
            */
            // Opcion extrute
            for (let j = 0; j < shapes.length; j++) {

                const shape = shapes[j]
                const meshGeometry = new THREE.ExtrudeBufferGeometry(shape, {
                    depth: .75,
                    bevelEnabled: false
                })
                const linesGeometry = new THREE.EdgesGeometry(meshGeometry)
                const mesh = new THREE.Mesh(meshGeometry, contextoMaterial)
                const lines = new THREE.LineSegments(linesGeometry, materialLinea)
                mesh.castShadow = true
                arqui.add(mesh, lines)
            }
            //Fin extrute
        }

        arqui.position.set(5.3, 28.7, - 0.76)

        mapa_contextoFolder.add(arqui.position, 'x').min(-200).max(200).step(0.1).name('arqui X')
        mapa_contextoFolder.add(arqui.position, 'y').min(-200).max(200).step(0.1).name('arqui Y')
        mapa_contextoFolder.add(arqui.position, 'z').min(-2).max(2).step(0.01).name('arqui Z')

        mapa.add(arqui)

    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado arqui')
    },
    function (error) {
        console.log('Algo falla con arqui')
    }
)

//Arboles
function numAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const losArboles = new THREE.Group();
scene.add(losArboles)
/*
svgloader.load(
    'test/rects_test_b.svg',
    function (data) {
        console.log(data)
        const pathsSVG = data.paths

        for (let i = 0; i < pathsSVG.length; i++) {

            const path = pathsSVG[i]
            const shapes = SVGLoader.createShapes(path)

            for (let j = 0; j < shapes.length; j++) {

                const shape = shapes[j]
                const geometry = new THREE.ShapeGeometry(shape)
                const mesh = new THREE.Mesh(geometry, mat_transito)
                mesh.scale.set(0.05, 0.05, 0.05)
                scene.add(mesh)
            }
        }
    }
)*/



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

losArboles.position.set(-67.2, 0.01, -70.7)

losArboles.scale.set(0.64, 0.64, 0.64)

losArboles.rotation.y = 0.07;

mapa_arbolesFolder.add(losArboles.position, 'x').min(-200).max(200).step(0.1).name('losArboles X')
mapa_arbolesFolder.add(losArboles.position, 'y').min(-2).max(2).step(0.01).name('losArboles Y')
mapa_arbolesFolder.add(losArboles.position, 'z').min(-200).max(200).step(0.1).name('losArboles Z')

mapa_arbolesFolder.add(losArboles.rotation, 'y').min(-200).max(200).step(0.01).name('losArboles Rot')

mapa_arbolesFolder.add(losArboles.scale, 'x').min(0.5).max(0.9).step(0.01).name('scale losArboles X')
mapa_arbolesFolder.add(losArboles.scale, 'z').min(0.5).max(0.9).step(0.01).name('scale losArboles Z')
mapa_arbolesFolder.add(losArboles.scale, 'y').min(0.5).max(0.9).step(0.01).name('scale losArboles Y')


//Configurar mapa
mapa.rotation.x = Math.PI * 0.5
mapa.position.set(-68.5, 0.01, -62.8)
mapa.rotation.z = -0.07
mapa.scale.set(0.64, 0.64, 0.64)

mapa_generalFolder.add(mapa.position, 'x').min(-200).max(200).step(0.1).name('mapa X')
mapa_generalFolder.add(mapa.position, 'z').min(-200).max(200).step(0.1).name('mapa Z')
mapa_generalFolder.add(mapa.rotation, 'z').min(-200).max(200).step(0.01).name('mapa Rot Z')

mapa_generalFolder.add(mapa.scale, 'x').min(0.5).max(0.9).step(0.01).name('scale mapa X')
mapa_generalFolder.add(mapa.scale, 'z').min(0.5).max(0.9).step(0.01).name('scale mapa Z')
mapa_generalFolder.add(mapa.scale, 'y').min(0.5).max(0.9).step(0.01).name('scale mapa Y')

scene.add(mapa)
/**
 * Lights
 */
//Ambient
const ambientLight = new THREE.AmbientLight(0xffffff, 0.74)
lucesFolder.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambient')

scene.add(ambientLight)

//Directional
const directionalLight = new THREE.DirectionalLight(colores.colorPoint2, 0.1)

directionalLight.position.set(-20.42, 25.76, 20.14)

lucesFolder.add(directionalLight.position, 'x').min(-25).max(250).step(0.01).name('Directional x')
lucesFolder.add(directionalLight.position, 'y').min(0.1).max(250).step(0.01).name('Directional y')
lucesFolder.add(directionalLight.position, 'z').min(-25).max(250).step(0.01).name('Directional z')
lucesFolder.add(directionalLight, 'intensity').min(0).max(2).step(0.001).name('Directional inten')

directionalLight.shadow.camera.near = 10
directionalLight.shadow.camera.far = 100

directionalLight.shadow.camera.top = 10
directionalLight.shadow.camera.right = 10
directionalLight.shadow.camera.bottom = -10
directionalLight.shadow.camera.left = -10

//directionalLight.shadow.radius = 20

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
//scene.add(directionalLightCameraHelper)

directionalLightCameraHelper.visible = true

directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

//PointLight
const pointLight = new THREE.PointLight(colores.colorPoint, 0.2, 116, 2)

pointLight.position.set(0, 13.01, 0)
lucesFolder.add(pointLight.position, 'x').min(-25).max(25).step(0.01).name('point x')
lucesFolder.add(pointLight.position, 'y').min(-10).max(75).step(0.01).name('point y')
lucesFolder.add(pointLight.position, 'z').min(-25).max(25).step(0.01).name('point z')
lucesFolder.add(pointLight, 'intensity').min(0).max(3).step(0.1).name('Point inten')
lucesFolder.add(pointLight, 'distance').min(0).max(200).step(1).name('Point Distance')

lucesFolder
    .addColor(colores, 'colorPoint')
    .onChange(() => {
        pointLight.color.set(colores.colorPoint)        
    })
    .name('colorPoint')

const pointLight2 = new THREE.PointLight(colores.colorPoint2, 0.7, 50, 2)
/*pointLight2.castShadow = true
pointLight2.shadow.mapSize.width = 2048
pointLight2.shadow.mapSize.height = 2048*/
pointLight2.position.set(0, 0, 0)
/*lucesFolder.add(pointLight2.position, 'x').min(-25).max(25).step(0.01).name('point x')
lucesFolder.add(pointLight2.position, 'y').min(-10).max(75).step(0.01).name('point y')
lucesFolder.add(pointLight2.position, 'z').min(-25).max(25).step(0.01).name('point z')
lucesFolder.add(pointLight2, 'intensity').min(0).max(3).step(0.1).name('Point inten')
lucesFolder.add(pointLight2, 'distance').min(0).max(200).step(1).name('Point Distance')*/

lucesFolder
    .addColor(colores, 'colorPoint2')
    .onChange(() => {
        directionalLight.color.set(colores.colorPoint2)        
    })
    .name('Directional color')




/**
 * Floor
 */

const particulas = new THREE.PlaneGeometry(250, 250, 50, 50)
const particulasMaterial = new THREE.PointsMaterial({
    size: 2,
    sizeAttenuation: false
})
particulasMaterial.color = new THREE.Color('#ffffff')
const pisoParticulas = new THREE.Points(particulas, particulasMaterial)


const piso = new THREE.Mesh(
    new THREE.CircleGeometry(120, 32),
    mat_piso

)
piso.receiveShadow = true
piso.rotation.x = - Math.PI * 0.5
piso.position.y = -0.01

scene.add(piso)

/**
 * Nubes
 */
 const nubesGeo = new THREE.SphereGeometry( 130, 32, 16 );
 const mat_nubes = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide, map: text_nube, transparent: true } );
 const nubes = new THREE.Mesh( nubesGeo, mat_nubes );
 scene.add( nubes );
/**
 * Terreno
 */
const terreno = new THREE.Mesh(
    new THREE.PlaneGeometry(360, 360, 60, 60),
    mat_terreno
)
terreno.rotation.x = - Math.PI * 0.5
terreno.position.y = -1
mapa_terrenosFolder.add(terreno.material, 'displacementScale')
terreno.receiveShadow =  true
scene.add(terreno)
/**
 * Sizes
 */

const sizes = {
    width: window.innerWidth - anchoModal,
    height: window.innerHeight
}

function redimensionar() {
    sizes.width = window.innerWidth - anchoModal
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    //Actualizar hotspot wrapper
    hotspotsWrappers.forEach(item => {
        item.style.width = sizes.width + 'px'
        item.style.height = sizes.height + 'px'
    })

}
window.addEventListener('resize', () => {
    redimensionar()
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.01, 250)
//const camera = new THREE.OrthographicCamera( sizes.width / - 2, sizes.width / 2, sizes.height / 2, sizes.height / - 2, 1, 1000 );
camera.position.set(4.38, 2.33, 4.91)
scene.add(camera)
scene.add(pointLight)
scene.add(directionalLight)
// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI * 0.5;
controls.minDistance = 6
controls.maxDistance = 15

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.antialias = true
renderer.setClearColor(colores.colorCielo)






//Niebla
const niebla = new THREE.Fog(colores.colorBruma, 2, 180)
scene.fog = niebla

/**
 * Hotspots
 */
const raycaster = new Raycaster()
const hotspotsWrappers = document.querySelectorAll('.hotspots-wrapper')

hotspotsWrappers.forEach(item => {
    item.style.width = sizes.width + 'px'
    item.style.height = sizes.height + 'px'
})




const hotspots = [{
    position: new THREE.Vector3(3.34, 0.72, -0.5),
    element: document.querySelector('.hotspot-0'),
    label: 'Terraza BBQ',
    img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/terraza.jpg'
},
{
    position: new THREE.Vector3(3.84, 0.45, -0.06),
    element: document.querySelector('.hotspot-1'),
    label: 'Social Kitchen',
    img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/social-kitchen.jpg'
},
{
    position: new THREE.Vector3(4.7, 0.13, -0.26),
    element: document.querySelector('.hotspot-2'),
    label: 'Lobby',
    img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/lobby.jpg'
},
{
    position: new THREE.Vector3(3.5, 0.45, -0.06),
    element: document.querySelector('.hotspot-3'),
    label: 'Salón de juegos',
    img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/salon-juegos.jpg'
},
{
    position: new THREE.Vector3(3.79, 0.13, -0.06),
    element: document.querySelector('.hotspot-4'),
    label: 'Salón social',
    img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/salon-social.jpg'
},
{
    position: new THREE.Vector3(4.24, 0.45, -0.06),
    element: document.querySelector('.hotspot-5'),
    label: 'Piscina',
    img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/piscina.jpg'
},
{
    position: new THREE.Vector3(-5.9, 0.55, -2.82),
    element: document.querySelector('.hotspot-6')
},
{
    position: new THREE.Vector3(1.68, 0.63, 4.8),
    element: document.querySelector('.hotspot-7')
}
    , {
    position: new THREE.Vector3(15, 0.6, 15),
    element: document.querySelector('.hotspot-8')
},
{
    position: new THREE.Vector3(-50, 0.6, 15),
    element: document.querySelector('.hotspot-9')
},
{
    position: new THREE.Vector3(6, 0.6, 48),
    element: document.querySelector('.hotspot-10')
},
{
    position: new THREE.Vector3(14, 0.6, -45),
    element: document.querySelector('.hotspot-11')
}]


const bolaHelper = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
bolaHelper.position.set(1, 100, 3)

scene.add(bolaHelper)
gui.add(bolaHelper.position, 'x', -70, 70, 0.01).name('Helper X')
gui.add(bolaHelper.position, 'y', -70, 70, 0.01).name('Helper Y')
gui.add(bolaHelper.position, 'z', -70, 70, 0.01).name('Helper Z')


/**
 * Apartamentos
 */
const mascarasProyecto = new THREE.Group()
mascarasProyecto.scale.set(0.05, 0.05, 0.05)
mascarasProyecto.position.set(pModX, pModY, pModZ)
scene.add(mascarasProyecto)




// COGNIS
const apto_tipo_1 = new THREE.Group();
apto_tipo_1.userData.tipo = 'apto_tipo_1'

const apto_tipo_2 = new THREE.Group();
apto_tipo_2.userData.tipo = 'apto_tipo_2'

const apto_tipo_3 = new THREE.Group();
apto_tipo_3.userData.tipo = 'apto_tipo_3'

const materialFill_a1 = new THREE.MeshStandardMaterial({
    color: paletaMascaras[0],
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide
})

const materialLineas_a1 = new THREE.LineBasicMaterial({ color: paletaMascaras[0], linewidth: 1 });

const materialFill_a2 = new THREE.MeshStandardMaterial({
    color: paletaMascaras[1],
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide
})

const materialLineas_a2 = new THREE.LineBasicMaterial({ color: paletaMascaras[1], linewidth: 1 });

const materialFill_a3 = new THREE.MeshStandardMaterial({
    color: paletaMascaras[2],
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide
})

const materialLineas_a3 = new THREE.LineBasicMaterial({ color: paletaMascaras[2], linewidth: 1 });

const mascaraHover = new THREE.MeshBasicMaterial({ color: '#FFFFFF', transparent: true, opacity: '0.8' })

//Carga aptos nueva
const archivos = [
    'torre1_x01',
    'torre1_x02',
    'torre1_x03',
    'torre1_x04',
    'torre1_x05',
    'torre1_x06',
    'torre2_x07',
    'torre2_x08',
    'torre2_x09',
    'torre2_x10',
    //Mal nombrado
    'torre2_x11',
    'torre2_x12',
    'torre3_x13',
    'torre3_x14',
    'torre3_x15',
    'torre3_x16',
    'torre3_x17',
    'torre3_x18']

for (let n = 0; n < archivos.length; n++) {

    const nArchivo = archivos[n]

    //Cargar
    gltfLoader.load(
        `modelos/aptos-inventario/${nArchivo}.glb`,

        (gltf) => {


            for (let i = 0; i < gltf.scene.children.length; i++) {
                // nuevos scripts
                const mascaraApto = gltf.scene.children[i],
                    nameMax = mascaraApto.userData.name,
                    id = nameMax.substring(0, nameMax.match("_tipo").index),
                    torre = nameMax.substring(nameMax.match("torre").index + 5, nameMax.match("_apto").index),
                    num = nameMax.substring(nameMax.match("apto").index + 4, nameMax.match("_tipo").index),
                    tipo = nameMax.substring(nameMax.match("tipo").index + 4, nameMax.length)



                //Determinar vista


                const posicionApto = id.substr(id.length - 2),
                    aptosVistaNorte = ["01", "02", "06", "07", "08", "12", "13", "14", "18"],
                    compararVista = (element) => element === posicionApto,
                    vista = aptosVistaNorte.some(compararVista) ? "Norte" : "Sur"

                mascaraApto.userData.id = id
                mascaraApto.userData.torre = torre
                mascaraApto.userData.numero = num
                mascaraApto.userData.tipo = tipo
                mascaraApto.userData.vista = vista
                mascaraApto.visible = false

                if (tipo === '1') {
                    mascaraApto.material = materialFill_a1
                } else if (tipo === '2') {
                    mascaraApto.material = materialFill_a2
                } else if (tipo === '3') {
                    mascaraApto.material = materialFill_a3
                } else {
                    console.log('Error al añadir máscara')
                }

            }
            mascarasProyecto.add(gltf.scene)

        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + `% cargado apto ${nArchivo}`)
        },
        function (error) {
            console.log(`Algo malo pasa con el apto ${nArchivo}`)
        }
    )
    //Fin carga
}

/**
 * Raycaster aptos
 */
const raycasterAptos = new Raycaster()
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1

})
//Elementos modal Aptos
const modalApto = document.querySelector('#modal-aptos'),
    apto_tit = modalApto.querySelector('h2'),
    pre_tit = modalApto.querySelector('.prefijo_tit'),
    suf_tit = modalApto.querySelector('.sufijo_tit'),
    area_ac = modalApto.querySelector('.area_ac span'),
    area_ap = modalApto.querySelector('.area_ap span'),
    area_b = modalApto.querySelector('.area_b span'),
    atributos = modalApto.querySelector('.atributos'),
    img_planta = modalApto.querySelector('.img_planta'),
    tablaResultados = document.querySelector('#resultados tbody')

//Elementos modal Hotspot
const modalHotspot = document.querySelector('#modal-hotspots')
const hotImg = modalHotspot.querySelector('.hotspot-img')
const hotLabel = modalHotspot.querySelector('.hotspot-label')
//Inventario
//COGNIS


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
let infoTipologias
readTextFile("inventario/inventario.json", function (text) {
    infoTipologias = JSON.parse(text);
});

/**
 * Post processing
 */
const effectComposer = new EffectComposer(renderer)
effectComposer.setSize(sizes.width, sizes.height)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)



/*const bokehPass = new BokehPass(scene, camera, {
    focus: 12,
    aperture: 0.0001,
    maxblur: 0.0075,
    width: sizes.width,
    height: sizes.height
})*/
const saoPass = new SAOPass( scene, camera, false, true );
effectComposer.addPass(saoPass)

saoPass.params.output = SAOPass.OUTPUT.Beauty
// Init gui Pass

gui.add( saoPass.params, 'output', {
    'Beauty': SAOPass.OUTPUT.Beauty,
    'Beauty+SAO': SAOPass.OUTPUT.Default,
    'SAO': SAOPass.OUTPUT.SAO,
    'Depth': SAOPass.OUTPUT.Depth,
    'Normal': SAOPass.OUTPUT.Normal
} ).onChange( function ( value ) {

    saoPass.params.output = parseInt( value );

} );

saoPass.params.saoIntensity = 0.003
saoPass.params.saoScale = 1.84

saoPass.params.saoKernelRadius = 68.31
saoPass.params.saoMinResolution = 0
saoPass.params.saoBlur = true
saoPass.params.saoBlurRadius = 5//5.94
saoPass.params.saoBlurStdDev = 89.3577
saoPass.params.saoBlurDepthCutoff = 0.0001


gui.add( saoPass.params, 'saoBias', 0, 0.1, 0.01 );
gui.add( saoPass.params, 'saoIntensity', 0, 1, 0.001 );
gui.add( saoPass.params, 'saoScale', 0, 20, 0.01 );
gui.add( saoPass.params, 'saoKernelRadius', 1, 100 );
gui.add( saoPass.params, 'saoMinResolution', 0, 1, 0.0001 );
gui.add( saoPass.params, 'saoBlur' );
gui.add( saoPass.params, 'saoBlurRadius', 0, 10, 0.01 );
gui.add( saoPass.params, 'saoBlurStdDev', 0.5, 150, 0.0001 );
gui.add( saoPass.params, 'saoBlurDepthCutoff', 0.0, 0.1, 0.0001 );

const stats = Stats()
document.body.appendChild(stats.dom)
//COGNIS
//Mostrar máscaras según json
const btnFiltrar = document.querySelector('#filtrar')
const modalUnidades = document.getElementById('modal-unidades')
const btnNuevaBusqueda = document.getElementById('btn-nueva-busqueda')

btnFiltrar.addEventListener('click', event => {
    event.preventDefault();
    quitarAislamiento();
    //Limpiar máscaras
    mascarasProyecto.traverse(child => {
        if (child.type === "Mesh") {
            child.visible = false
        }
    })
    tablaResultados.innerHTML = ''
    //Consultar json
    for (let i = 0; i < infoTipologias.length; i++) {
        const infoID = infoTipologias[i].id

        //Prender los aptos del JSON
        mascarasProyecto.traverse(child => {
            if (child.type === "Mesh") {
                if (child.userData.id === infoID) {
                    child.visible = true
                }
            }
        })
        //Pintar tabla
        const resultado =
            `<tr data-apto="${infoTipologias[i].id}">
            <td>${infoTipologias[i].torre}</td>
            <td>${infoTipologias[i].apto_tit}</td>
            <td>${infoTipologias[i].tipo_tit}</td>
            <td>${infoTipologias[i].habitaciones}</td>
            <td>${infoTipologias[i].piso}</td>
            <td>${infoTipologias[i].area_ac}</td>
            <td>$${formatoNumero.format(infoTipologias[i].valor)}</td>
            <td>
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.625 1.18751C11.2782 1.17842 12.6875 2.00754 12.6875 4.68751C12.6875 7.36748 6.99995 11.25 6.99995 11.25C6.99995 11.25 1.3125 7.36748 1.3125 4.68751C1.3125 2.00754 2.72178 1.1892 4.375 1.18751C5.25 1.18662 6.45391 1.7364 7.00005 2.50001C7.54609 1.7364 8.74018 1.19238 9.625 1.18751Z" stroke="#70676F" stroke-linejoin="round" />
                </svg>
            </td>
        </tr>`


        const tablaResultadosActual = tablaResultados.innerHTML
        tablaResultados.innerHTML = tablaResultadosActual + resultado
        //Actualizar filasApto
        filasApto = document.querySelectorAll('.listado-resultados tbody tr')

        filasApto.forEach(item => {
            item.addEventListener('click', hoverFilaApto, false)
        })
    }
    //Mostrar resultados
    modalUnidades.classList.add('mostrando-resultados')

})
//Nueva busqueda
btnNuevaBusqueda.addEventListener('click', event => {
    event.preventDefault();

    //Mostrar filtros
    modalUnidades.classList.remove('mostrando-resultados')
})
//COGNIS
//Dar click en la máscara

canvas.addEventListener('click', () => {
    if (interseccionActual) {
        const aptoActivo = interseccionActual.object
        aislarApto(aptoActivo.userData.id)
    }
})



btnMostrarApto.addEventListener('click', (event) => {
    // Si es por ID se debe usar el de abajo
    const aptoActivo = btnMostrarApto.dataset.destino
    let obj = infoTipologias.find(obj => obj.id === aptoActivo)
    //Pintar info
    modalApto.classList.add('activo');
    apto_tit.innerHTML = obj.apto_tit
    pre_tit.innerHTML = 'Torre ' + obj.torre
    suf_tit.innerHTML = 'Apto tipo ' + obj.tipo
    area_ac.innerHTML = obj.area_ac
    area_ap.innerHTML = obj.area_ap
    img_planta.innerHTML = `<img src="${obj.img_planta}" alt="Planta de unidad">`
    //area_b.innerHTML = obj.area_b
    atributos.innerHTML = `<li>Habitaciones: ${obj.habitaciones}</li><li>Baños: ${obj.banos}</li>`
    if (obj.atributos) {
        let atrs = obj.atributos.split(',');

        atrs.forEach((item) => {
            let li = document.createElement("li");
            li.innerText = item;
            atributos.appendChild(li);
        })
    }
    //Agregar tour
    if (obj.tour_url) {
        btnTour.classList.add('visible')
        tourApto.setAttribute('src', obj.tour_url)
    } else {
        btnTour.classList.remove('visible')
        tourApto.setAttribute('src', '')
    }


})

//Mostrar recorrido
btnTour.addEventListener('click', (event) => {
    event.preventDefault()
    modalTour.classList.add('activo')
})
btnTourCerrar.addEventListener('click', (event) => {
    event.preventDefault()
    modalTour.classList.remove('activo')
    //tourApto.setAttribute('src', '')
})
//Cerrar Apto
const btnVolver = modalApto.querySelector('.btn-volver-apto')


btnVolver.addEventListener('click', (event) => {
    event.preventDefault()
    modalApto.classList.remove('activo')
    limpiarInfo()

})
function limpiarInfo() {
    apto_tit.innerHTML = ''
    area_ac.innerHTML = ''
    area_ap.innerHTML = ''
    //area_b.innerHTML = ''
    atributos.innerHTML = ''
    img_planta.innerHTML = ''
    //img_piso.innerHTML = ''
}

//Menu secundario
const menuSecundario = document.getElementById('menu-secundario')
const menuSecundarioItems = menuSecundario.querySelectorAll('a')
let acceso = false;

menuSecundarioItems.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault()
        const itemID = item.id

        if (item.classList.contains('activo')) {
            item.classList.remove('activo')
        } else {
            if (!(itemID === 'btnVista')) {
                item.classList.add('activo')
            }
        }

        if (itemID === 'btnInfo') {
            mostrarInfo(item)
        } else if (itemID === 'btnAcceso') {
            mostrarAcceso(item)
        } else if (itemID === 'btnVista') {
            mostrarVista(item)
        } else {
            console.log('Este boton no tiene acciones')
        }


    })
})

function mostrarInfo(el) {
    hwInfo.classList.add('activo')
    controls.enabled = false
    gsap.to(camera.position, {
        duration: 1,
        x: -8.5,
        y: 4.01,
        z: 4.2,
        onUpdate: function () {
            controls.update()
        },
        onComplete: function () {
            controls.enabled = true
        }
    })
}

function mostrarAcceso(el) {
    console.log(camera)
    if (!acceso) {
        controls.enabled = false;
        gsap.to(camera.position, {
            duration: 1,
            x: -3.9008822056589083,
            y: 6.7032028411231215,
            z: 5.549154796004263,
            onUpdate: function () {
                controls.update();

            },
            onComplete: function () {
                controls.enabled = true;
            }
        });
        mapa.add(transito)
        acceso = true
    } else {
        mapa.remove(transito)
        acceso = false
    }

}

function mostrarVista(el) {
    console.log('Mostrar vista')
    controls.enabled = false;
    gsap.to(camera.position, {
        duration: 1,
        x: -8.5,
        y: 4.01,
        z: 4.2,
        onUpdate: function () {
            controls.update();
        },
        onComplete: function () {
            controls.enabled = true;
            modalHotspot.classList.add('activo')
            hotImg.innerHTML = '<img src="https://chromastudio.co/sole/wp-content/uploads/2022/03/CPT-LECO-NO-VIS-AEREA-V2.jpg" style="object-fit: cover;" alt="Planta">'
            hotLabel.innerHTML = 'Vista aerea'
        }
    });

}

// FIN COGNIS
//Hotspots
for (let h = 0; h < hotspotsBtn.length; h++) {
    hotspotsBtn[h].addEventListener('click', event => {
        event.preventDefault();
        const hotX = hotspots[h].position.x
        const hotY = hotspots[h].position.y
        const hotZ = hotspots[h].position.z
        //Modificar minDistance de camara
        controls.minDistance = 2
        //Inicio cambio de camara
        controls.enabled = false;
        gsap.to(camera.position, {
            duration: 1,
            x: 4.057,
            y: 1.399,
            z: 1.686,
            onUpdate: function () {
                controls.update();
            },
            onComplete: function () {
                controls.enabled = true;
            }
        });
        gsap.to(controls.target, {
            duration: 1,
            x: hotX,
            y: hotY,
            z: hotZ,
            onUpdate: function () {
                controls.update();
            },
            onComplete: function () {
                controls.enabled = true;
                //Mostrar popup
                modalHotspot.classList.add('activo')
                hotImg.innerHTML = `<img src="${hotspots[h].img}" alt="Planta">`
                hotLabel.innerHTML = hotspots[h].label
            }
        });
        //Fin cambio de camara controls.target.set(0, 0.75, 0)
    })
}
const btnVolverHot = modalHotspot.querySelector('.btn-volver-hot')
btnVolverHot.addEventListener('click', (event) => {
    event.preventDefault()
    modalHotspot.classList.remove('activo')
    gsap.to(controls.target, {
        duration: 1,
        x: 0,
        y: 0.75,
        z: 0,
        onUpdate: function () {
            controls.update();
        },
        onComplete: function () {
            controls.enabled = true;
            //Mostrar popup
        }
    });
    controls.minDistance = 4
    limpiarModalHot()
})
function limpiarModalHot() {
    hotImg.innerHTML = ''
    hotLabel.innerHTML = ''
}

//Brujula
const brujula_dir = new THREE.Vector3(),
    brujula_sph = new THREE.Spherical(),
    brujula = document.getElementById('brujula')
/**
 * Debug Colores
 */
coloresFolder
    .addColor(colores, 'mascara_1')
    .onChange(() => {
        materialFill_a1.color.set(colores.mascara_1)
        materialLineas_a1.color.set(colores.mascara_1)
    })
    .name('Mascara 1')

coloresFolder
    .addColor(colores, 'mascara_2')
    .onChange(() => {
        materialFill_a2.color.set(colores.mascara_2)
        materialLineas_a2.color.set(colores.mascara_2)
    })
    .name('Mascara 2')

coloresFolder
    .addColor(colores, 'mascara_3')
    .onChange(() => {
        materialFill_a3.color.set(colores.mascara_3)
        materialLineas_a3.color.set(colores.mascara_3)
    })
    .name('Mascara 3')

coloresFolder
    .addColor(colores, 'colorTerreno')
    .onChange(() => {
        terreno.material.color.set(colores.colorTerreno)
        piso.material.color.set(colores.colorTerreno)
    })
    .name('Terreno')

coloresFolder
    .addColor(colores, 'colorBruma')
    .onChange(() => {
        niebla.color.set(colores.colorBruma)
    })
    .name('Bruma')

coloresFolder
    .addColor(colores, 'colorCielo').onChange(() => {
        renderer.setClearColor(colores.colorCielo)
    }).name('Cielo')

coloresFolder
    .addColor(colores, 'colorArboles').onChange(() => {
        mat_arbol1.color.set(colores.colorArboles)
        mat_arbol2.color.set(colores.colorArboles)
    }).name('Arboles')

coloresFolder
    .addColor(colores, 'colorAndenes').onChange(() => {
        mat_andenes.color.set(colores.colorAndenes)
        mat_vias2.color.set(colores.colorAndenes)
    }).name('Andenes')

coloresFolder
    .addColor(colores, 'colorVias').onChange(() => {
        mat_vias.color.set(colores.colorVias)
        mat_vias1.color.set(colores.colorVias)
    }).name('Vías')

coloresFolder
    .addColor(colores, 'colorTransito').onChange(() => {
        mat_transito.color.set(colores.colorTransito)

    }).name('Vías')

coloresFolder
    .addColor(colores, 'contextoFillColor').onChange(() => {
        contextoMaterial.color.set(colores.contextoFillColor)
    }).name('Vecinos')

coloresFolder
    .addColor(colores, 'contextoLineColor').onChange(() => {
        materialLinea.color.set(colores.contextoLineColor)
    }).name('Vecinos Línea')
coloresFolder.add(materialLinea, 'opacity').min(0).max(1).step(0.05).name('Vecinos Línea Op')

//Colores alternativo
proyectoFolder
    .addColor(colores, 'mainArboles').onChange(() => {
        mat_arbolesAlt.color.set(colores.mainArboles)
    }).name('Árboles')

proyectoFolder
    .addColor(colores, 'mainArbustos').onChange(() => {
        mat_arbustosAlt.color.set(colores.mainArbustos)
    }).name('Arbustos')

proyectoFolder
    .addColor(colores, 'mainBarandas').onChange(() => {
        mat_barandasAlt.color.set(colores.mainBarandas)
    }).name('Barandas')

proyectoFolder
    .addColor(colores, 'mainBbq').onChange(() => {
        mat_bbqAlt.color.set(colores.mainBbq)
    }).name('Bbq')

    proyectoFolder
    .addColor(colores, 'mainCarros').onChange(() => {
        mat_carrosAlt.color.set(colores.mainCarros)
    }).name('Carros')

proyectoFolder
    .addColor(colores, 'mainComunal').onChange(() => {
        mat_comunalAlt.color.set(colores.mainComunal)
    }).name('Comunal')

proyectoFolder
    .addColor(colores, 'mainBbq').onChange(() => {
        mat_bbqAlt.color.set(colores.mainBbq)
    }).name('Bbq')

proyectoFolder
    .addColor(colores, 'mainJuegos').onChange(() => {
        mat_juegosAlt.color.set(colores.mainJuegos)
    }).name('Juegos')

proyectoFolder
    .addColor(colores, 'mainLuminarias').onChange(() => {
        mat_luminariasAlt.color.set(colores.mainLuminarias)
    }).name('Luminarias')

proyectoFolder
    .addColor(colores, 'mainTorres').onChange(() => {
        mat_torresAlt.color.set(colores.mainTorres)
    }).name('Torres')

proyectoFolder
    .addColor(colores, 'mainUrbano').onChange(() => {
        mat_urbanoAlt.color.set(colores.mainUrbano)
    }).name('Urbano')

proyectoFolder
    .addColor(colores, 'mainTorresLineas').onChange(() => {
        mat_torresLineas.color.set(colores.mainTorresLineas)
    }).name('Torres Línea')

proyectoFolder.add(mat_torresLineas, 'opacity').min(0).max(1).step(0.05).name('Torres Línea Op')

lucesFolder.add(directionalLight.shadow.camera, 'near').min(-25).max(25).step(0.1).name('Dir Shadow near')
lucesFolder.add(directionalLight.shadow.camera, 'far').min(-25).max(600).step(0.1).name('Dir Shadow far')

lucesFolder.add(directionalLight.shadow.camera, 'top').min(-25).max(25).step(0.1).name('Dir Shadow top')
lucesFolder.add(directionalLight.shadow.camera, 'right').min(-25).max(25).step(0.1).name('Dir Shadow right')
lucesFolder.add(directionalLight.shadow.camera, 'bottom').min(-25).max(25).step(0.1).name('Dir Shadow bottom')
lucesFolder.add(directionalLight.shadow.camera, 'left').min(-25).max(25).step(0.1).name('Dir Shadow left')
//coloresFolder.add(mat_piso, 'map').mapa
//Bug Hotspots
var frustum = new THREE.Frustum();



/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0
let interseccionActual = null

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Brujula
    camera.getWorldDirection(brujula_dir)
    brujula_sph.setFromVector3(brujula_dir)
    brujula.style.transform = `rotate(${THREE.Math.radToDeg(brujula_sph.theta) - 180}deg)`;

    //Aptos interactividad
    if (mascarasProyecto.children.length > 0) {

        raycasterAptos.setFromCamera(mouse, camera)
        const objetosEvaluar = mascarasProyecto.children,
            intersecciones = raycasterAptos.intersectObjects(objetosEvaluar, true)

        if (intersecciones.length) {

            interseccionActual = intersecciones[0]
            if (interseccionActual.object.type === 'Mesh') {
                /*for (const objeto of objetosEvaluar) {
                    for (const hijo of objeto.children) {
                        
                        if (hijo.userData.tipo === '1') {
                            hijo.material = materialFill_a1
                        } else if (hijo.userData.tipo === '2') {
                            hijo.material = materialFill_a2
                        } else if (hijo.userData.tipo === '3') {
                            hijo.material = materialFill_a3
                        } else {
                            console.log('Problema en Raycaster')
                        }
                    }
                }
                interseccionActual.object.material = mascaraHover*/

            }

        } else {
            if (interseccionActual) {
                //console.log('mouse leave')
            }
            interseccionActual = null
        }
    }
    // Update controls
    controls.update()
    //let cameraX = Math.abs(camera.position.x)
    //let cameraY = Math.abs(camera.position.y)
    //let cameraZ = Math.abs(camera.position.z)

    frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));


    //Mover Hotspots de Zonas Sociales
    for (const hotspot of hotspots) {
        const screenPosition = hotspot.position.clone()
        screenPosition.project(camera)

        raycaster.setFromCamera(screenPosition, camera)
        const intersects = raycaster.intersectObjects(escenaPrincipal.children, true)
        if (intersects.length === 0) {
            if (frustum.containsPoint(hotspot.position)) {
                hotspot.element.classList.add('visible')
            } else {
                hotspot.element.classList.remove('visible')
            }
            //hotspot.element.classList.add('visible')
        } else {
            const intersectionDistance = intersects[0].distance
            const hotspotDistance = hotspot.position.distanceTo(camera.position)

            //if (intersectionDistance < hotspotDistance || cameraX > 8 || cameraY > 7 || cameraZ > 8) {
            if (intersectionDistance < hotspotDistance) {
                hotspot.element.classList.remove('visible')
            }
            else {
                hotspot.element.classList.add('visible')
            }
        }

        const translateX = screenPosition.x * sizes.width * 0.5
        const translateY = screenPosition.y * sizes.height * - 0.5
        hotspot.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
    }

    //Animar nubes
    nubes.rotation.z += 0.001;


    // Render
    //renderer.render(scene, camera)
    effectComposer.render()
    stats.update()
    //console.log(camera.position)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()