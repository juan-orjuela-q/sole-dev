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