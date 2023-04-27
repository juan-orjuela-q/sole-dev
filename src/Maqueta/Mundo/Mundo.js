//Librerias
import * as THREE from "three";
//Proyecto
import Maqueta from "../Maqueta.js";
import Ambiente from "./Skins/Skin_Color/Ambiente.js";
import Mapa from "./Mapa.js";
import Modelo from "./Modelo.js";
import Materiales from "./Skins/Skin_Color/Materiales.js";

export default class Mundo {
  constructor() {
    this.maqueta = new Maqueta();
    this.escena = this.maqueta.escena;
    this.colores = this.maqueta.colores;
    this.recursos = this.maqueta.recursos;
    this.escalaProyecto = this.maqueta.tamanos.escalaProyecto;
    this.posicionProyecto = this.maqueta.tamanos.posicionProyecto;
    this.materiales = new Materiales();
    this.mapa = {};
    this.debug = this.maqueta.debug;

    //Debug
    if (this.debug.active) {
      this.debugColores = this.debug.ui.addFolder("Colores");
      this.debugProyecto = this.debug.ui.addFolder("Proyecto");
      this.debugTerreno = this.debug.ui.addFolder("Terreno");
      this.debugMapa = this.debug.ui.addFolder("Mapa");
    }

    this.grupoMapa = new THREE.Group();
    this.grupoVias = new THREE.Group();
    this.grupoTransito = new THREE.Group();
    this.grupoAndenes = new THREE.Group();
    this.grupoManzanas = new THREE.Group();
    this.grupoTransitoFijo = new THREE.Group();
    this.grupoTransito = new THREE.Group();
    this.grupoEdificios = new THREE.Group();
    this.grupoEdificiosBajos = new THREE.Group();
    this.grupoArbolesCoord = new THREE.Group();
    this.grupoArboles = new THREE.Group();
    this.grupoArbolesParticulas = new THREE.Group();
    this.grupoPersonas = new THREE.Group();
    this.grupoProyecto = new THREE.Group();
    this.mascarasProyecto = new THREE.Group();

    this.crearHelper();

    // Esperar que cargue Recursos
    this.recursos.on("cargado", () => {
      // Setup

      this.crearTerreno();
      this.crearMapa();
      //this.crearVegetacion()
      //this.crearVegetacionParticulas();
      this.crearModelos();
      this.crearPersonas();
      this.crearArbustos();
      this.crearArboles();
      this.crearArbolesRelleno();
      this.crearMascaras();
      this.crearNubes();
      this.crearDebug();

      this.ambiente = new Ambiente();
    });
  }
  numAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  crearHelper() {
    const axesHelper = new THREE.AxesHelper(2);
    //this.escena.add(axesHelper)

    //Test Mesh
    this.bolaHelper = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 16, 16),
      new THREE.MeshStandardMaterial({ color: this.colores.paleta.color3 })
    );
    //this.escena.add(this.bolaHelper)
  }
  crearTerreno() {
    //Piso
    const piso = new THREE.Mesh(
      new THREE.CircleGeometry(120, 32),
      this.materiales.materialesContexto.piso
    );
    piso.receiveShadow = true;
    piso.rotation.x = -Math.PI * 0.5;
    piso.position.y = -0.01;
    this.escena.add(piso);

    //Terreno con elevacion
    const elevacion = new THREE.Mesh(
      new THREE.PlaneGeometry(360, 360, 60, 60),
      this.materiales.materialesContexto.elevacion
    );
    elevacion.rotation.x = -Math.PI * 0.5;
    elevacion.position.y = -1;
    this.escena.add(elevacion);

    //Nubes
    const nubesGeo = new THREE.SphereGeometry(130, 32, 16);
    this.nubes = new THREE.Mesh(
      nubesGeo,
      this.materiales.materialesContexto.nubes
    );
    this.escena.add(this.nubes);
    //Lago
    /*const lago = new THREE.Mesh(
      new THREE.PlaneGeometry(3.75, 3.75, 4),
      this.materiales.materialesContexto.lago
    );
    
    lago.rotation.x = -Math.PI * 0.5;
    lago.rotation.z = -Math.PI * 0.5;
    
    lago.position.x = 4.5
    lago.position.y = 0.05;
    lago.position.z = 7.25
    this.escena.add(lago);*/
  }
  rotarNubes() {
    this.nubes.rotation.z += 0.001;
  }
  crearMapa() {
    //Andenes
    this.mapa.andenes = new Mapa(
      this.recursos.items.svg_andenes,
      this.materiales.materialesContexto.andenes,
      this.grupoAndenes,
      true,
      0.045
    );
    //this.grupoAndenes.position.set(4, 25.9, 0);

    this.grupoMapa.add(this.grupoAndenes);

    //Vias
    this.mapa.vias = new Mapa(
      this.recursos.items.svg_vias,
      this.materiales.materialesContexto.vias,
      this.grupoVias
    );
    this.grupoVias.position.set(0, 0, -0.01);
    this.grupoMapa.add(this.grupoVias);
    //Edificios
    this.mapa.edificios = new Mapa(
      this.recursos.items.svg_edificios,
      this.materiales.materialesContexto.edificios,
      this.grupoEdificios,
      true,
      0.75,
      //this.materiales.materialesContexto.edificiosLinea
    );
    this.grupoEdificios.position.set(0, 0, -0.76);
    this.grupoMapa.add(this.grupoEdificios);

    //Vias
    this.mapa.entrada = new Mapa(
      this.recursos.items.svg_entrada,
      this.materiales.materialesContexto.entrada,
      this.grupoTransito,
      true,
      0.025
    );
    this.mapa.salida = new Mapa(
      this.recursos.items.svg_salida,
      this.materiales.materialesContexto.salida,
      this.grupoTransito,
      true,
      0.025
    );
    this.grupoTransito.position.set(0, 0, -0.025);
    this.grupoTransito.visible = false
    this.grupoMapa.add(this.grupoTransito);
    
    

    //Configurar mapa
    this.grupoMapa.rotation.x = Math.PI * 0.5;
    this.grupoMapa.position.set(-69.41, 0.01, -65.04);
    this.grupoMapa.rotation.z = -0.07;
    this.grupoMapa.scale.set(0.64, 0.64, 0.64);
    this.escena.add(this.grupoMapa);
  }
  crearVegetacionParticulas() {
    const escala = 0.64;

    this.escena.add(this.grupoArbolesParticulas);

    this.vegetacionParticulas = {};
    this.vegetacionParticulas.vegetacionSVG =
      this.recursos.items.svg_arboles_posicion;

    const pathsSVG = this.vegetacionParticulas.vegetacionSVG.paths;

    //Prueba particula

    //Geometria custom
    const particulasGeometriaCustom = new THREE.BufferGeometry(),
      numArboles = pathsSVG.length;

    const posiciones = new Float32Array(numArboles * 3);

    for (let i = 0; i < numArboles; i++) {
      //x
      posiciones[i * 3] =
        pathsSVG[i].subPaths[0].currentPoint.x * escala - 69.41;
      //y
      posiciones[i * 3 + 1] = 0.15;
      //z
      posiciones[i * 3 + 2] =
        pathsSVG[i].subPaths[0].currentPoint.y * escala - 65.04;
      //67.2 - 70.7
      //(-69.41, 0.01, -65.04)
    }

    particulasGeometriaCustom.setAttribute(
      "position",
      new THREE.BufferAttribute(posiciones, 3)
    );

    //
    const particulasGeometria = new THREE.SphereGeometry(10, 32, 32);

    const particulasMaterial = new THREE.PointsMaterial();
    particulasMaterial.size = 0.75;
    particulasMaterial.sizeAttenuation = true;
    particulasMaterial.map = this.recursos.items.textura_arbol_tipo1;
    particulasMaterial.alphaMap = this.recursos.items.textura_arbol_tipo1_alpha;
    particulasMaterial.transparent = true;
    particulasMaterial.alphaTest = 0.001;

    const particulas = new THREE.Points(
      particulasGeometriaCustom,
      particulasMaterial
    );

    this.grupoArbolesParticulas.rotation.y = 0.07;
    this.grupoArbolesParticulas.position.x = 4.22;
    this.grupoArbolesParticulas.position.z = -5;

    this.grupoArbolesParticulas.add(particulas);
  }
  crearVegetacionParticulasM(svg_posicion, material, escala, x, y, z) {
    //const escala = 0.64;
    //this.escena.add(this.grupoArbolesParticulas);
    const pathsSVG = svg_posicion.paths,
      particulasGeometriaCustom = new THREE.BufferGeometry(),
      numArboles = pathsSVG.length,
      posiciones = new Float32Array(numArboles * 3);

    for (let i = 0; i < numArboles; i++) {
      //x
      posiciones[i * 3] = pathsSVG[i].subPaths[0].currentPoint.x * escala - x;
      //y
      posiciones[i * 3 + 1] = y;
      //z
      posiciones[i * 3 + 2] =
        pathsSVG[i].subPaths[0].currentPoint.y * escala - z;
    }

    particulasGeometria.setAttribute(
      "position",
      new THREE.BufferAttribute(posiciones, 3)
    );

    const particulas = new THREE.Points(particulasGeometria, material);

    this.grupoArbolesParticulas.rotation.y = 0.07;
    this.grupoArbolesParticulas.position.x = 5.36;
    this.grupoArbolesParticulas.position.z = 6.65;

    this.grupoArbolesParticulas.add(particulas);
  }

  crearArboles() {
    const escala = 0.64,
      x = -67.2,
      y = 0,
      z = -70.7;

    const personas = this.recursos.items.svg_arboles_posicion;
    const pathsSVG = personas.paths;
    //Geometria custom
    const num = pathsSVG.length;
    for (let i = 0; i < num; i++) {
      const numMat = Math.floor(Math.random() * 4);
      const material = this.materiales.materialesArboles[numMat];
      const sprite = new THREE.Sprite(material),
        posX = pathsSVG[i].subPaths[0].currentPoint.x * escala + x,
        posZ = pathsSVG[i].subPaths[0].currentPoint.y * escala + z;

      sprite.center = new THREE.Vector2(0.5, 0.0);
      sprite.scale.set(0.35, 0.35, 1);

      sprite.position.x = posX;
      sprite.position.y = y;
      sprite.position.z = posZ;

      this.grupoPersonas.add(sprite);
    }
  }

  crearArbolesRelleno() {
    const escala = 0.64,
      x = -67.2,
      y = 0,
      z = -70.7;

    const personas = this.recursos.items.svg_arboles_relleno_posicion;
    const pathsSVG = personas.paths;
    //Geometria custom
    const num = pathsSVG.length;
    for (let i = 0; i < num; i++) {
      const numMat = Math.floor(Math.random() * 3);
      const material = this.materiales.materialesArbolesRelleno[numMat];
      const sprite = new THREE.Sprite(material),
        posX = pathsSVG[i].subPaths[0].currentPoint.x * escala + x,
        posZ = pathsSVG[i].subPaths[0].currentPoint.y * escala + z;

      sprite.center = new THREE.Vector2(0.5, 0.0);
      sprite.scale.set(0.5, 0.5, 1);

      sprite.position.x = posX;
      sprite.position.y = y;
      sprite.position.z = posZ;

      this.grupoPersonas.add(sprite);
    }
  }

  crearPersonas() {
    const escala = 0.64,
      x = -67.2,
      y = 0,
      z = -70.7;
    this.escena.add(this.grupoPersonas);
    this.grupoPersonas.rotation.y = 0.07;
    this.grupoPersonas.position.x = 2.42;
    this.grupoPersonas.position.z = 0.81;
    const personas = this.recursos.items.svg_personas_posicion;
    const pathsSVG = personas.paths;
    //Geometria custom
    const num = pathsSVG.length;
    for (let i = 0; i < num; i++) {
      const numMat = Math.floor(Math.random() * 5);
      const material = this.materiales.materialesPersonas[numMat];
      const sprite = new THREE.Sprite(material),
        posX = pathsSVG[i].subPaths[0].currentPoint.x * escala + x,
        posZ = pathsSVG[i].subPaths[0].currentPoint.y * escala + z;

      sprite.center = new THREE.Vector2(0.5, 0.0);
      sprite.scale.set(0.15, 0.15, 1);

      sprite.position.x = posX;
      sprite.position.y = y;
      sprite.position.z = posZ;

      this.grupoPersonas.add(sprite);
    }
  }
  crearArbustos() {
    const escala = 0.64,
      x = -67.2,
      y = 0,
      z = -70.7;

    const personas = this.recursos.items.svg_arbustos_posicion;
    const pathsSVG = personas.paths;
    //Geometria custom
    const num = pathsSVG.length;
    for (let i = 0; i < num; i++) {
      const numMat = Math.floor(Math.random() * 3);
      const material = this.materiales.materialesArbustos[numMat];
      const sprite = new THREE.Sprite(material),
        posX = pathsSVG[i].subPaths[0].currentPoint.x * escala + x,
        posZ = pathsSVG[i].subPaths[0].currentPoint.y * escala + z;

      sprite.center = new THREE.Vector2(0.5, 0.0);
      sprite.scale.set(0.12, 0.12, 1);

      sprite.position.x = posX;
      sprite.position.y = y;
      sprite.position.z = posZ;

      this.grupoPersonas.add(sprite);
    }
  }

  crearVegetacion() {
    this.grupoArboles.scale.set(0.0696, 0.0696, 0.0696);

    this.grupoArboles.position.set(-74.1, 0, -89);

    this.vegetacion = {};

    this.vegetacion.vegetacionSVG = this.recursos.items.svg_coord_arboles;
    this.vegetacion.vegetacionModelo1 =
      this.recursos.items.modelo_arbol_1.scene;
    this.vegetacion.vegetacionModelo2 =
      this.recursos.items.modelo_arbol_2.scene;

    const pathsSVG = this.vegetacion.vegetacionSVG.paths;

    //Distribuir arboles en dos grupos

    let posicionArboles = [],
      posicionArboles2 = [];

    for (let i = 0; i < pathsSVG.length; i++) {
      const path = pathsSVG[i];
      const ran = this.numAleatorio(1, 2);
      //console.log(path.subPaths[0].currentPoint)
      if (ran === 1) {
        posicionArboles.push(path.subPaths[0].currentPoint);
      } else {
        posicionArboles2.push(path.subPaths[0].currentPoint);
      }
    }

    //Agregar grupo 1
    this.vegetacion.vegetacionModelo1.traverse((child) => {
      child.material = this.materiales.materialesContexto.arboles;
      //child.castShadow = true
    });
    for (let p = 0; p < posicionArboles.length; p++) {
      const n = this.numAleatorio(65, 100) / 100;
      const r = Math.random() * 2 * Math.PI;
      const arbolito = new THREE.Object3D();
      this.vegetacion.vegetacionModelo1.scale.set(1, 1, 1);
      arbolito.add(this.vegetacion.vegetacionModelo1.clone());
      arbolito.position.set(posicionArboles[p].x, -0.05, posicionArboles[p].y);
      arbolito.children[0].children[0].scale.set(n, n, n);
      arbolito.children[0].children[0].rotation.y = r;
      this.grupoArboles.add(arbolito);
    }

    this.escena.add(this.grupoArboles);
    //Agregar grupo 2
    this.vegetacion.vegetacionModelo2.traverse((child) => {
      child.material = this.materiales.materialesContexto.arboles;
      //child.castShadow = true
    });
    for (let p = 0; p < posicionArboles2.length; p++) {
      const n = this.numAleatorio(45, 90) / 100;
      const r = Math.random() * 2 * Math.PI;
      const arbolito = new THREE.Object3D();
      this.vegetacion.vegetacionModelo2.scale.set(1, 1, 1);
      arbolito.add(this.vegetacion.vegetacionModelo1.clone());
      arbolito.position.set(
        posicionArboles2[p].x,
        -0.05,
        posicionArboles2[p].y
      );
      arbolito.children[0].children[0].scale.set(n, n, n);
      arbolito.children[0].children[0].rotation.y = r;
      this.grupoArboles.add(arbolito);
    }

    this.escena.add(this.grupoArboles);
  }
  crearModelos() {
    //Proyecto
    this.torre_baja = new Modelo(
      this.recursos.items.modelo_torre_baja,
      this.materiales.materialesProyecto.torre_baja,
      this.grupoProyecto,
      false
    );
    this.torre_sole_1 = new Modelo(
      this.recursos.items.modelo_torre_sole_1,
      this.materiales.materialesProyecto.torre_sole_1,
      this.grupoProyecto,
      false
    );
    this.torre_sole_2 = new Modelo(
      this.recursos.items.modelo_torre_sole_2,
      this.materiales.materialesProyecto.torre_sole_2,
      this.grupoProyecto,
      false
    );

    //this.arboles = new Modelo(this.recursos.items.modelo_arboles, this.materiales.materialesProyecto.arboles, this.grupoProyecto)
    //this.arbustos = new Modelo(this.recursos.items.modelo_arbustos, this.materiales.materialesProyecto.arbustos, this.grupoProyecto)
    /*this.barandas = new Modelo(
      this.recursos.items.modelo_barandas,
      this.materiales.materialesProyecto.barandas,
      this.grupoProyecto
    );
    
    
    

    this.juegos = new Modelo(
      this.recursos.items.modelo_juegos,
      this.materiales.materialesProyecto.juegos,
      this.grupoProyecto
    );*/
    this.bbq = new Modelo(
      this.recursos.items.modelo_bbq,
      this.materiales.materialesProyecto.bbq,
      this.grupoProyecto
    );
    this.carros_abajo = new Modelo(
      this.recursos.items.modelo_carros_abajo,
      this.materiales.materialesContexto.carros,
      this.grupoProyecto,
      false,
      false,
      {x: 0, y: 0, z: 5}
    );
    this.carros_arriba = new Modelo(
      this.recursos.items.modelo_carros_arriba,
      this.materiales.materialesContexto.carros,
      this.grupoProyecto
    );
    this.comunal = new Modelo(
      this.recursos.items.modelo_comunal,
      this.materiales.materialesProyecto.comunal,
      this.grupoProyecto,
      false
    );
    this.juegos_2 = new Modelo(
      this.recursos.items.modelo_juegos_2,
      this.materiales.materialesProyecto.juegos_2,
      this.grupoProyecto
    );
     this.luminarias = new Modelo(
       this.recursos.items.modelo_luminarias,
       this.materiales.materialesProyecto.luminarias,
       this.grupoProyecto
     );

     this.luminarias.modelo.scale.z = 2.49
     this.luminarias.modelo.position.x = -28.56
     this.luminarias.modelo.position.z = -175.53
     this.luminarias.modelo.rotation.y = 0.11

    this.comercio = new Modelo(
      this.recursos.items.modelo_comercio,
      this.materiales.materialesProyecto.vecinos,
      this.grupoProyecto,
      false
    );
    this.proyecto_vecino = new Modelo(
      this.recursos.items.modelo_proyecto_vecino,
      this.materiales.materialesProyecto.vecinos,
      this.grupoProyecto,
      false
    );
    this.vecinos = new Modelo(
      this.recursos.items.modelo_vecinos,
      this.materiales.materialesProyecto.vecinos,
      this.grupoProyecto,
      false
    );

    //Configurar modelos
    this.grupoProyecto.scale.set(
      this.escalaProyecto.x,
      this.escalaProyecto.y,
      this.escalaProyecto.z
    );
    this.grupoProyecto.position.set(
      this.posicionProyecto.x,
      this.posicionProyecto.y,
      this.posicionProyecto.z
    );
    if (this.debug.active) {
      this.debugProyecto
        .add(this.grupoProyecto.position, "x")
        .min(-10)
        .max(10)
        .step(0.01)
        .name("Proyecto x");
      this.debugProyecto
        .add(this.grupoProyecto.position, "y")
        .min(-1)
        .max(1)
        .step(0.001)
        .name("Proyecto y");
      this.debugProyecto
        .add(this.grupoProyecto.position, "z")
        .min(-10)
        .max(10)
        .step(0.01)
        .name("Proyecto z");

      this.debugProyecto
        .add(this.luminarias.modelo.position, "x")
        .min(-50)
        .max(50)
        .step(0.01)
        .name("Luminarias x");
      this.debugProyecto
        .add(this.luminarias.modelo.position, "y")
        .min(-1)
        .max(1)
        .step(0.001)
        .name("Luminarias y");
      this.debugProyecto
        .add(this.luminarias.modelo.position, "z")
        .min(-250)
        .max(250)
        .step(0.01)
        .name("Luminarias z");

        this.debugProyecto
        .add(this.luminarias.modelo.scale, "x")
        .min(0.5)
        .max(3)
        .step(0.01)
        .name("Luminarias s x");
      this.debugProyecto
        .add(this.luminarias.modelo.scale, "y")
        .min(0.5)
        .max(3)
        .step(0.001)
        .name("Luminarias s y");
      this.debugProyecto
        .add(this.luminarias.modelo.scale, "z")
        .min(0.5)
        .max(5)
        .step(0.01)
        .name("Luminarias s z");

        this.debugProyecto
        .add(this.luminarias.modelo.rotation, "y")
        .min(-90)
        .max(90)
        .step(0.01)
        .name("Luminarias rot y");
    }
    this.escena.add(this.grupoProyecto);
  }
  crearMascaras() {
    this.mascarasProyecto.scale.set(
      this.escalaProyecto.x,
      this.escalaProyecto.y,
      this.escalaProyecto.z
    );
    this.mascarasProyecto.position.set(
      this.posicionProyecto.x,
      this.posicionProyecto.y,
      this.posicionProyecto.z
    );
    //this.mascarasProyecto.rotation.y = Math.PI * -0.3;
    this.escena.add(this.mascarasProyecto);
  }
  crearNubes() {
    const geometria = new THREE.SphereGeometry(120, 32, 32),
      texturaNubes = this.recursos.items.textura_nubes;

    texturaNubes.wrapS = THREE.RepeatWrapping;
    texturaNubes.wrapT = THREE.RepeatWrapping;
    texturaNubes.repeat.set(3, 3);

    const materialNubes = new THREE.MeshBasicMaterial({
      fog: false,
      side: THREE.BackSide,
      transparent: true,
      map: texturaNubes,
      alphaMap: texturaNubes,
    });

    const materialNubes2 = new THREE.MeshStandardMaterial({
      fog: true,
      side: THREE.BackSide,
      transparent: true,
      color: '#deeaef',
      opacity: 0.5
    });

    const esferaNubes = new THREE.Mesh(geometria, materialNubes);

    const esferaNubes2 = new THREE.Mesh(geometria, materialNubes2);
    esferaNubes2.scale.set(0.95, 0.95, 0.95)

    // Añadir la malla a la escena
    /this.escena.add(esferaNubes);
    this.escena.add(esferaNubes2);
  }

  crearDebug() {
    if (this.debug.active) {
      //Helper
      this.debugProyecto
        .add(this.bolaHelper.position, "x")
        .min(-50)
        .max(50)
        .step(0.01)
        .name("Helper x");
      this.debugProyecto
        .add(this.bolaHelper.position, "y")
        .min(-50)
        .max(50)
        .step(0.01)
        .name("Helper y");
      this.debugProyecto
        .add(this.bolaHelper.position, "z")
        .min(-50)
        .max(50)
        .step(0.01)
        .name("Helper z");

      this.debugProyecto
        .add(this.escalaProyecto, "x")
        .min(0.01)
        .max(0.1)
        .step(0.01)
        .name("Proyecto scale x");
      this.debugProyecto
        .add(this.escalaProyecto, "y")
        .min(0.01)
        .max(0.1)
        .step(0.01)
        .name("Proyecto scale y");
      this.debugProyecto
        .add(this.escalaProyecto, "z")
        .min(0.01)
        .max(0.1)
        .step(0.01)
        .name("Proyecto scale z");

      this.debugProyecto
        .add(this.grupoEdificios.position, "x")
        .min(-100)
        .max(100)
        .step(1)
        .name("Edificios x");
      this.debugProyecto
        .add(this.grupoEdificios.position, "y")
        .min(-100)
        .max(100)
        .step(1)
        .name("Edificios y");
      this.debugProyecto
        .add(this.grupoEdificios.position, "z")
        .min(-100)
        .max(100)
        .step(1)
        .name("Edificios z");

      this.debugMapa
        .add(this.grupoArbolesParticulas.position, "x")
        .min(-100)
        .max(100)
        .step(0.01)
        .name("Arboles Part x");
      this.debugMapa
        .add(this.grupoArbolesParticulas.position, "y")
        .min(-5)
        .max(5)
        .step(0.01)
        .name("Arboles Part y");
      this.debugMapa
        .add(this.grupoArbolesParticulas.position, "z")
        .min(-100)
        .max(100)
        .step(0.01)
        .name("Arboles Part z");

      this.debugMapa
        .add(this.grupoPersonas.position, "x")
        .min(-100)
        .max(100)
        .step(0.01)
        .name("Personas x");
      this.debugMapa
        .add(this.grupoPersonas.position, "y")
        .min(-5)
        .max(5)
        .step(0.01)
        .name("Personas y");
      this.debugMapa
        .add(this.grupoPersonas.position, "z")
        .min(-100)
        .max(100)
        .step(0.01)
        .name("Personas z");

      this.debugMapa
        .add(this.grupoMapa.position, "x")
        .min(-100)
        .max(100)
        .step(0.001)
        .name("Mapa x");
      this.debugMapa
        .add(this.grupoMapa.position, "y")
        .min(-100)
        .max(100)
        .step(0.001)
        .name("Mapa y");
      this.debugMapa
        .add(this.grupoMapa.position, "z")
        .min(-100)
        .max(100)
        .step(0.001)
        .name("Mapa z");

      this.debugMapa
        .add(this.grupoMapa.scale, "x")
        .min(0.0625)
        .max(0.1)
        .step(0.0001)
        .name("Mapa scale x");
      this.debugMapa
        .add(this.grupoMapa.scale, "y")
        .min(0.0625)
        .max(0.1)
        .step(0.0001)
        .name("Mapa scale y");
      this.debugMapa
        .add(this.grupoMapa.scale, "z")
        .min(0.0625)
        .max(0.1)
        .step(0.0001)
        .name("Mapa scale z");

      this.debugMapa
        .add(this.grupoAndenes.position, "x")
        .min(-1000)
        .max(100)
        .step(0.1)
        .name("Andenes x");
      this.debugMapa
        .add(this.grupoAndenes.position, "y")
        .min(-10)
        .max(10)
        .step(0.01)
        .name("Andenes y");
      this.debugMapa
        .add(this.grupoAndenes.position, "z")
        .min(-100)
        .max(100)
        .step(0.1)
        .name("Andenes z");

      this.debugMapa
        .add(this.grupoTransito.position, "x")
        .min(-100)
        .max(100)
        .step(0.1)
        .name("Transito x");
      this.debugMapa
        .add(this.grupoTransito.position, "y")
        .min(-100)
        .max(100)
        .step(0.01)
        .name("Transito y");
      this.debugMapa
        .add(this.grupoTransito.position, "z")
        .min(-100)
        .max(100)
        .step(0.1)
        .name("Transito z");

      this.debugMapa
        .add(this.grupoArboles.position, "x")
        .min(-100)
        .max(100)
        .step(0.1)
        .name("Arboles x");
      this.debugMapa
        .add(this.grupoArboles.position, "y")
        .min(-100)
        .max(100)
        .step(0.01)
        .name("Arboles y");
      this.debugMapa
        .add(this.grupoArboles.position, "z")
        .min(-100)
        .max(100)
        .step(0.1)
        .name("Arboles z");

      this.debugMapa
        .add(this.grupoArboles.scale, "x")
        .min(0.1)
        .max(5)
        .step(0.01)
        .name("Arboles s x");
      this.debugMapa
        .add(this.grupoArboles.scale, "y")
        .min(0.1)
        .max(5)
        .step(0.01)
        .name("Arboles s y");
      this.debugMapa
        .add(this.grupoArboles.scale, "z")
        .min(0.1)
        .max(5)
        .step(0.01)
        .name("Arboles s z");

      //Colores

      this.debugColores
        .addColor(this.colores.coloresMundo, "colorAndenes")
        .onChange(() => {
          this.materiales.materialesContexto.andenes.color.set(
            this.colores.coloresMundo.colorAndenes
          );
        })
        .name("Andenes");

      this.debugColores
        .addColor(this.colores.coloresMundo, "colorEdificios")
        .onChange(() => {
          this.materiales.materialesContexto.edificios.color.set(
            this.colores.coloresMundo.colorEdificios
          );
        })
        .name("Edificios");

      this.debugColores
        .addColor(this.colores.coloresMundo, "colorVias")
        .onChange(() => {
          this.materiales.materialesContexto.vias.color.set(
            this.colores.coloresMundo.colorVias
          );
        })
        .name("Vias");

      this.debugColores
        .addColor(this.colores.coloresMundo, "colorTerreno")
        .onChange(() => {
          this.materiales.materialesContexto.elevacion.color.set(
            this.colores.coloresMundo.colorTerreno
          );
          this.materiales.materialesContexto.piso.color.set(
            this.colores.coloresMundo.colorTerreno
          );
        })
        .name("Terreno");

      this.debugColores
        .addColor(this.colores.coloresMundo, "colorArboles")
        .onChange(() => {
          this.materiales.materialesProyecto.arboles.color.set(
            this.colores.coloresMundo.colorArboles
          );
          this.materiales.materialesContexto.arboles.color.set(
            this.colores.coloresMundo.colorArboles
          );
        })
        .name("Árboles");

      this.debugColores
        .addColor(this.colores.coloresMundo, "colorProyecto")
        .onChange(() => {
          this.materiales.materialesProyecto.torre1.color.set(
            this.colores.coloresMundo.colorProyecto
          );
          this.materiales.materialesProyecto.torre2.color.set(
            this.colores.coloresMundo.colorProyecto
          );
          this.materiales.materialesProyecto.torre3.color.set(
            this.colores.coloresMundo.colorProyecto
          );
        })
        .name("Proyecto");

      this.debugColores
        .addColor(this.colores.coloresMundo, "colorNubes")
        .onChange(() => {
          this.materiales.materialesContexto.nubes.color.set(
            this.colores.coloresMundo.colorNubes
          );
        })
        .name("Nubes");

      this.debugColores
        .addColor(this.colores.coloresMundo, "colorCarros")
        .onChange(() => {
          this.materiales.materialesContexto.carros.color.set(
            this.colores.coloresMundo.colorCarros
          );
        })
        .name("Carros");
    }
  }
}
