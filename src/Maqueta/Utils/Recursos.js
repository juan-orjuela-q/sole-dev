//Librerias
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

import EventEmitter from "./EventEmitter"

export default class Recursos extends EventEmitter
{
    constructor(sources)
    {
        super()
        this.sources = sources
        
        //Configuracion
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.dracoLoader = new DRACOLoader(),
        this.loaders.gltfLoader = new GLTFLoader(),
        this.loaders.svgLoader = new SVGLoader(),
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(),
        this.loaders.textureLoader = new THREE.TextureLoader()

    }

    startLoading()
    {
        // Cargar cada source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        file.flipY = false
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'svg')
            {
                this.loaders.svgLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'json')
            {
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

                readTextFile(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, JSON.parse(file))
                    }
                )
                
            }
        }
    }

    sourceLoaded(source, file){
        this.items[source.name] = file
        this.loaded++
        if(this.loaded ===  this.toLoad) {
            console.log('Recursos cargados')
            this.trigger('cargado')
            
        }

    }
}