/**
 * Colores
 */
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