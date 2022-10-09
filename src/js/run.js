




//Configurar mapa
mapa.rotation.x = Math.PI * 0.5
mapa.position.set(-68.5, 0.01, -62.8)
mapa.rotation.z = -0.07
mapa.scale.set(0.64, 0.64, 0.64)
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


const pointLight2 = new THREE.PointLight(colores.colorPoint2, 0.7, 50, 2)

pointLight2.position.set(0, 0, 0)



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