import * as THREE from 'three'
import Maqueta from '../../../Maqueta.js'

export default class Ambiente {
    constructor() {
        this.maqueta = new Maqueta()
        this.escena = this.maqueta.escena
        this.colores = this.maqueta.colores
        this.materiales = this.maqueta.materiales
        this.recursos = this.maqueta.recursos
        this.debug = this.maqueta.debug

        //Debug
        if (this.debug.active) {
            this.debugLuces = this.debug.ui.addFolder('Luces')
            this.debugCielo = this.debug.ui.addFolder('Cielo')
            this.debugEnv = this.debug.ui.addFolder('Environment')
        }

        //Crear cielo
        this.crearCielo()
        // Crear luces
        this.crearAmbientLight()
        this.crearDirectionalLight()
        //this.crearPointLight()

        //Crear environment map
        //this.crearEnvironmentMap()
        //this.aplicarEnvironmentMap()
    }
    crearCielo() {
        const niebla = new THREE.Fog(this.colores.coloresMundo.colorBruma, 9, 210)
        this.escena.fog = niebla

        if (this.debug.active) {
            //console.log(niebla)
            this.debugCielo.add(niebla, 'near').min(0).max(200).step(1).name('Niebla near')
            this.debugCielo.add(niebla, 'far').min(5).max(500).step(5).name('Niebla far')

            this.debugCielo
                .addColor(this.colores.coloresMundo, 'colorBruma')
                .onChange(() => {
                    niebla.color.set(this.colores.coloresMundo.colorBruma)
                })
                .name('Niebla')
        }
    }

    crearAmbientLight() {
        const ambientLight = new THREE.AmbientLight(this.colores.luces.ambient, 0.85)
        this.escena.add(ambientLight)
        //Debug
        if (this.debug.active) {
            this.debugLuces.add(ambientLight, 'intensity').min(0).max(5).step(0.05).name('Amb. Intensity')
        }
    }

    crearDirectionalLight() {
        const directionalLight = new THREE.DirectionalLight(this.colores.luces.directional, 0.4)

        directionalLight.position.set(-25.42, 24, -5)
        // directionalLight.shadow.camera.near = 10
        // directionalLight.shadow.camera.far = 100
        // directionalLight.shadow.camera.top = 10
        // directionalLight.shadow.camera.right = 10
        // directionalLight.shadow.camera.bottom = -10
        // directionalLight.shadow.camera.left = -10



        directionalLight.castShadow = false
        //directionalLight.shadow.mapSize.width = 2048
        //directionalLight.shadow.mapSize.height = 2048

        //const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
        //directionalLightCameraHelper.visible = false

        this.escena.add(directionalLight)
        //this.escena.add(directionalLightCameraHelper)

        //Debug

        if (this.debug.active) {
            this.debugLuces.add(directionalLight, 'intensity').min(0).max(5).step(0.01).name('Dir. Intensity')
            this.debugLuces.add(directionalLight.position, 'x').min(-25).max(250).step(0.01).name('Dir. x')
            this.debugLuces.add(directionalLight.position, 'y').min(0.01).max(250).step(0.01).name('Dir. y')
            this.debugLuces.add(directionalLight.position, 'z').min(-25).max(250).step(0.01).name('Dir. z')

            /*this.debugFolder.add(directionalLight.shadow.camera, 'near').min(-25).max(25).step(0.1).name('Dir Shadow near')
            this.debugFolder.Luces.add(directionalLight.shadow.camera, 'near').min(-25).max(25).step(0.1).name('Dir Shadow near')
            this.debugFolder.Luces.add(directionalLight.shadow.camera, 'far').min(-25).max(600).step(0.1).name('Dir Shadow far')
            this.debugFolder.Luces.add(directionalLight.shadow.camera, 'top').min(-25).max(25).step(0.1).name('Dir Shadow top')
            this.debugFolder.Luces.add(directionalLight.shadow.camera, 'right').min(-25).max(25).step(0.1).name('Dir Shadow right')
            this.debugFolder.Luces.add(directionalLight.shadow.camera, 'bottom').min(-25).max(25).step(0.1).name('Dir Shadow bottom')
            this.debugFolder.Luces.add(directionalLight.shadow.camera, 'left').min(-25).max(25).step(0.1).name('Dir Shadow left')*/
        }

    }

    crearPointLight() {
        const pointLight = new THREE.PointLight(this.colores.luces.point, 0.2, 116, 2)
        pointLight.position.set(0, 13.01, 0)
        this.escena.add(pointLight)

        const pointLight2 = new THREE.PointLight(this.colores.luces.point, 0.7, 50, 2)
        this.escena.add(pointLight2)
    }

    crearEnvironmentMap() {

        this.environmentMap = {}
        this.environmentMap.intensity = 1
        this.environmentMap.texture = this.recursos.items.environmentMapTexture
        //this.environmentMap.texture.encoding = THREE.sRGBEncoding
        //this.escena.background = this.environmentMap.texture
    }

    aplicarEnvironmentMap() {
        //this.escena.environment = this.environmentMap.texture
        this.environmentMap.updateMaterials = () => {
            this.escena.traverse((child) => {
                
                //if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial && child.userData.env === true) {
                    if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial && child.userData.env === true) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                } 
            })
        }
        this.environmentMap.updateMaterials()
    }
}





