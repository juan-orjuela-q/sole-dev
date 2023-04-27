//Librerias
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js';
//Proyecto
import Maqueta from './Maqueta.js'

export default class Renderer {
    constructor() {
        this.maqueta = new Maqueta()
        this.tamanos = this.maqueta.tamanos
        this.escena = this.maqueta.escena
        this.canvas = this.maqueta.canvas
        this.camara = this.maqueta.camara
        this.colores = this.maqueta.colores
        this.debug = this.maqueta.debug

        //Debug
        if (this.debug.active) {
            this.debugEntorno = this.debug.ui.addFolder('Entorno')
        }

        this.crearInstanciaRenderer()

    }

    crearInstanciaRenderer() {
        this.instancia = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        //this.instancia.physicallyCorrectLights = true
        //this.instancia.outputEncoding = THREE.sRGBEncoding
        //this.instancia.toneMapping = THREE.LinearToneMapping
        //this.instancia.toneMapping = THREE.CineonToneMapping
        //this.instancia.toneMappingExposure = 1

        this.instancia.shadowMap.enabled = true
        this.instancia.shadowMap.type = THREE.PCFSoftShadowMap
        this.instancia.setSize(this.tamanos.ancho, this.tamanos.alto)
        this.instancia.setPixelRatio(Math.min(this.tamanos.pixelRatio, 2))
        this.instancia.setClearColor(this.colores.coloresMundo.colorCielo)

        this.effectComposer = new EffectComposer(this.instancia)
        this.effectComposer.setPixelRatio(Math.min(this.tamanos.pixelRatio, 2))
        this.effectComposer.setSize(this.tamanos.ancho, this.tamanos.alto)

        this.renderPass = new RenderPass(this.escena, this.camara.instancia)
        this.effectComposer.addPass(this.renderPass)


        const effectGrayScale = new ShaderPass(LuminosityShader);
        effectGrayScale.enabled  = false
        this.effectComposer.addPass(effectGrayScale);

        // you might want to use a gaussian blur filter before
        // the next pass to improve the result of the Sobel operator

        // Sobel operator

        const effectSobel = new ShaderPass(SobelOperatorShader);
        effectSobel.uniforms['resolution'].value.x = window.innerWidth * window.devicePixelRatio;
        effectSobel.uniforms['resolution'].value.y = window.innerHeight * window.devicePixelRatio;
        effectSobel.enabled = false
        this.effectComposer.addPass(effectSobel);
    }

    redimensionar() {
        this.instancia.setSize(this.tamanos.ancho, this.tamanos.alto)
        this.instancia.setPixelRatio(Math.min(this.tamanos.pixelRatio, 2))
    }

    actualizar() {
        //this.instancia.render(this.escena, this.camara.instancia)
        this.effectComposer.render()
    }

}