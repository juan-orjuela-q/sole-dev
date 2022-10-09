
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