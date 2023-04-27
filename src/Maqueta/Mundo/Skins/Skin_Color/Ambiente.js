import * as THREE from 'three'
import Maqueta from '../../../Maqueta.js'
import { Sky } from "three/examples/jsm/objects/Sky";

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
        const niebla = new THREE.Fog(this.colores.coloresMundo.colorBruma, 15, 140);
        this.escena.fog = niebla;
    
        this.sky = new Sky();
        this.sky.scale.setScalar(10000);
        this.sun = new THREE.Vector3();
    
        let phi = THREE.MathUtils.degToRad(15);//65
        let theta = THREE.MathUtils.degToRad(60 + 180);  
        console.log(this.sun)
        this.sun.setFromSphericalCoords(1, phi, theta);
        console.log(this.sun)
        //this.sun.set(-0,1,1)
        
        
    
        var uniforms = this.sky.material.uniforms;
        uniforms["turbidity"].value = 9.5;
        uniforms["rayleigh"].value = 0.34;//0.34
        uniforms["mieCoefficient"].value = 0.025;
        uniforms["mieDirectionalG"].value = 0.886;
        uniforms["sunPosition"].value.copy(this.sun);
    
        this.escena.add(this.sky);
    
        //Debug
        const effectController = {
          turbidity: 10,
          rayleigh: 3,
          mieCoefficient: 0.005,
          mieDirectionalG: 0.7,
          elevation: 2,
          azimuth: 180      
        };
    
        function guiChanged() {
            
            uniforms[ 'turbidity' ].value = effectController.turbidity;
            uniforms[ 'rayleigh' ].value = effectController.rayleigh;
            uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
            uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;         
    
        }
    
        if (this.debug.active) {
          //console.log(niebla)
          this.debugCielo
            .add(niebla, "near")
            .min(0)
            .max(200)
            .step(1)
            .name("Niebla near");
          this.debugCielo
            .add(niebla, "far")
            .min(5)
            .max(500)
            .step(5)
            .name("Niebla far");
    
          this.debugCielo
            .addColor(this.colores.coloresMundo, "colorBruma")
            .onChange(() => {
              niebla.color.set(this.colores.coloresMundo.colorBruma);
            })
            .name("Niebla");
    
          this.debugCielo
            .add(effectController, "turbidity", 0.0, 20.0, 0.1)
            .onChange(guiChanged);
          this.debugCielo
            .add(effectController, "rayleigh", 0.0, 4, 0.001)
            .onChange(guiChanged);
          this.debugCielo
            .add(effectController, "mieCoefficient", 0.0, 0.1, 0.001)
            .onChange(guiChanged);
          this.debugCielo
            .add(effectController, "mieDirectionalG", 0.0, 1, 0.001)
            .onChange(guiChanged);  
          
        }
      }

    crearAmbientLight() {
        const ambientLight = new THREE.AmbientLight(this.colores.luces.ambient, 0.8)
        this.escena.add(ambientLight)
        //Debug
        if (this.debug.active) {
            this.debugLuces.add(ambientLight, 'intensity').min(0).max(5).step(0.05).name('Amb. Intensity')
        }
    }

    crearDirectionalLight() {
        const directionalLight = new THREE.DirectionalLight(
          this.colores.luces.directional,
          0.25
        );
    
        directionalLight.position.set(-25, 27.39, 33.1);
        directionalLight.shadow.camera.near = 10
        directionalLight.shadow.camera.far = 100
        directionalLight.shadow.camera.top = 20
        directionalLight.shadow.camera.right = 20
        directionalLight.shadow.camera.bottom = -20
        directionalLight.shadow.camera.left = -20
    
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048
        directionalLight.shadow.mapSize.height = 2048
    
        //const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
        //directionalLightCameraHelper.visible = false
    
        this.escena.add(directionalLight);
        //this.escena.add(directionalLightCameraHelper)
    
        const directionalLight2 = new THREE.DirectionalLight(
          this.colores.luces.directional,
          0.25
        );
        directionalLight2.position.set(-25.42, 24, -5);
        directionalLight2.castShadow = false;
        this.escena.add(directionalLight2);
        //Debug
    
        if (this.debug.active) {
          this.debugLuces
            .add(directionalLight, "intensity")
            .min(0)
            .max(5)
            .step(0.01)
            .name("Dir. Intensity");
            this.debugLuces
            .add(directionalLight2, "intensity")
            .min(0)
            .max(5)
            .step(0.01)
            .name("Dir. Intensity2");
          this.debugLuces
            .add(directionalLight.position, "x")
            .min(-25)
            .max(250)
            .step(0.01)
            .name("Dir. x");
          this.debugLuces
            .add(directionalLight.position, "y")
            .min(0.01)
            .max(250)
            .step(0.01)
            .name("Dir. y");
          this.debugLuces
            .add(directionalLight.position, "z")
            .min(-25)
            .max(250)
            .step(0.01)
            .name("Dir. z");
    
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





