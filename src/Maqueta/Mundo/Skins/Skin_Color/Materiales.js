//Librerias
import * as THREE from "three";
//Proyecto
import Maqueta from "../../../Maqueta.js";

export default class Materiales {
  constructor() {
    this.maqueta = new Maqueta();
    this.escena = this.maqueta.escena;
    this.colores = this.maqueta.colores;
    this.recursos = this.maqueta.recursos;

    this.materialesProyecto = {};
    this.materialesContexto = {};
    this.materialesPersonas = [];
    this.materialesArbustos = [];
    this.materialesArboles = [];
    this.materialesArbolesRelleno = [];

    this.recursos.on("cargado", () => {
      this.crearMateriales();
    });
  }
  crearMateriales() {
    const texturaAndenes = this.recursos.items.patron_darkBrickWall;
    texturaAndenes.wrapS = THREE.RepeatWrapping;
    texturaAndenes.wrapT = THREE.RepeatWrapping;
    texturaAndenes.repeat.set(2.5, 2.5);
    texturaAndenes.rotation = Math.PI * 1.25;

    const texturaPasto = this.recursos.items.patron_pasto;
    texturaPasto.wrapS = THREE.RepeatWrapping;
    texturaPasto.wrapT = THREE.RepeatWrapping;
    texturaPasto.repeat.set(250, 250);

    const texturaEdificios = this.recursos.items.patron_cartonEdificios;
    texturaEdificios.wrapS = THREE.RepeatWrapping;
    texturaEdificios.wrapT = THREE.RepeatWrapping;
    texturaEdificios.repeat.x = 0.5;
    texturaEdificios.repeat.y = 0.3;

    //Materiales proyecto
    this.materialesProyecto.torre_baja = new THREE.MeshStandardMaterial({
      map: this.recursos.items.textura_torre_baja,
      color: this.colores.coloresMundo.colorProyecto,
    });

    this.materialesProyecto.torre_sole_1 = new THREE.MeshStandardMaterial({
      map: this.recursos.items.textura_torre_sole_1,
      color: this.colores.coloresMundo.colorProyecto,
    });

    this.materialesProyecto.torre_sole_2 = new THREE.MeshStandardMaterial({
      map: this.recursos.items.textura_torre_sole_2,
      color: this.colores.coloresMundo.colorProyecto,
    });

    this.materialesProyecto.comunal = new THREE.MeshStandardMaterial({
      map: this.recursos.items.textura_comunal,
      color: this.colores.coloresMundo.colorProyecto,
    });

    this.materialesProyecto.arboles = new THREE.MeshBasicMaterial({
      //map: this.recursos.items.textura_arboles,
      //map: texturaArboles,

      color: this.colores.coloresMundo.colorArboles,
    });

    this.materialesProyecto.arbustos = new THREE.MeshBasicMaterial({
      //map: this.recursos.items.textura_arbustos,
      //map: texturaArboles,
      color: this.colores.coloresMundo.colorArboles,
    });

    this.materialesProyecto.barandas = new THREE.MeshStandardMaterial({
      map: this.recursos.items.textura_barandas,
      //color: this.colores.coloresMundo.colorEdificiosLinea,
      transparent: true,
      alphaMap: this.recursos.items.textura_barandas_alpha,
    });

    this.materialesProyecto.bbq = new THREE.MeshStandardMaterial({
      map: this.recursos.items.textura_bbq,
      //color: this.colores.coloresMundo.colorBbq,
    });

    this.materialesContexto.carros = new THREE.MeshStandardMaterial({
      //map: this.recursos.items.textura_carros_abajo,
      color: this.colores.coloresMundo.colorCarros,
    });
    this.materialesContexto.carros = new THREE.MeshStandardMaterial({
      //map: this.recursos.items.textura_carros_arriba,
      color: this.colores.coloresMundo.colorCarros,
    });

    this.materialesProyecto.juegos = new THREE.MeshStandardMaterial({
      map: this.recursos.items.textura_juegos,
      //color: this.colores.coloresMundo.colorJuegos,
    });
    this.materialesProyecto.juegos_2 = new THREE.MeshStandardMaterial({
      map: this.recursos.items.textura_juegos_2,
      //color: this.colores.coloresMundo.colorJuegos,
    });

    this.materialesProyecto.luminarias = new THREE.MeshStandardMaterial({
      //map: this.recursos.items.textura_luminarias,
      color: this.colores.coloresMundo.colorLuminarias,
    });

    this.materialesProyecto.vecinos = new THREE.MeshStandardMaterial({
      color: this.colores.coloresMundo.colorEdificios,
      
      transparent: true,
      opacity: 0.85,
    });

    this.materialesProyecto.mascaras = new THREE.MeshBasicMaterial({
      color: this.colores.mascaras.mascara1,
      transparent: true,
      opacity: 0.5,
    });
    this.materialesProyecto.mascaraHover = new THREE.MeshBasicMaterial({
      color: this.colores.mascaras.mascaraHover,
      transparent: true,
      opacity: 0.5,
    });
    this.materialesProyecto.mascaraClick = new THREE.MeshBasicMaterial({
      color: this.colores.mascaras.mascaraClick,
    });

    //Materiales contexto
    this.materialesContexto.elevacion = new THREE.MeshStandardMaterial({
      displacementMap: this.recursos.items.textura_terreno_elevacion,
      displacementScale: 27,
      //color: this.colores.coloresMundo.colorTerreno,
      color: "#66755c",
      //color: "#6a7150"
    });

    const texturaPiso = this.recursos.items.patron_cartographer;
    texturaPiso.wrapS = THREE.RepeatWrapping;
    texturaPiso.wrapT = THREE.RepeatWrapping;
    texturaPiso.repeat.set(100, 100);

    this.materialesContexto.piso = new THREE.MeshStandardMaterial({
      color: this.colores.coloresMundo.colorTerreno,
      map: texturaPasto,
      //bumpMap: texturaPiso,
      //bumpScale: 0.025,
    });
    //Andenes
    this.materialesContexto.andenes = new THREE.MeshStandardMaterial({
      color: this.colores.coloresMundo.colorAndenes,
      map: texturaAndenes,
      side: THREE.DoubleSide,
      depthWrite: true,
    });
    //Vias
    const texturaVias = this.recursos.items.patron_asfaltDark;
    texturaVias.wrapS = THREE.RepeatWrapping;
    texturaVias.wrapT = THREE.RepeatWrapping;
    texturaVias.repeat.set(0.5, 0.5);

    this.materialesContexto.vias = new THREE.MeshStandardMaterial({
      color: this.colores.coloresMundo.colorVias,
      map: texturaVias,
      transparent: false,
      side: THREE.DoubleSide,
      depthWrite: true,
    });

    //TRansito
    this.materialesContexto.entrada = new THREE.MeshStandardMaterial({
      color: this.colores.coloresMundo.colorEntrada,      
    });
    this.materialesContexto.salida = new THREE.MeshStandardMaterial({
      color: this.colores.coloresMundo.colorSalida,      
    });

    

    this.materialesContexto.edificios = new THREE.MeshStandardMaterial({
      color: this.colores.coloresMundo.colorEdificios,
      map: texturaEdificios,
      transparent: false,
      opacity: 1,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    this.materialesContexto.edificiosLinea = new THREE.LineBasicMaterial({
      color: this.colores.coloresMundo.colorEdificiosLinea,
      linewidth: 1,
      transparent: true,
      opacity: 0.35,
    });
    //Arboles
    const particulasMaterial = new THREE.PointsMaterial();
    particulasMaterial.size = 0.45;
    particulasMaterial.sizeAttenuation = true;
    particulasMaterial.map = this.recursos.items.textura_arbol_tipo1;
    particulasMaterial.alphaMap = this.recursos.items.textura_arbol_tipo1_alpha;
    particulasMaterial.transparent = true;
    particulasMaterial.alphaTest = 0.001;

    //Personas
    const materialPersona_tipo1 = new THREE.SpriteMaterial();
    //materialPersona_tipo1.map = this.recursos.items.textura_personas_tipo1;
    materialPersona_tipo1.alphaMap =
      this.recursos.items.textura_personas_tipo1_alpha;
    materialPersona_tipo1.transparent = true;
    materialPersona_tipo1.alphaTest = 0.001;

    const materialPersona_tipo2 = new THREE.SpriteMaterial();
    //materialPersona_tipo2.map = this.recursos.items.textura_personas_tipo2;
    materialPersona_tipo2.alphaMap =
      this.recursos.items.textura_personas_tipo2_alpha;
    materialPersona_tipo2.transparent = true;
    materialPersona_tipo2.alphaTest = 0.001;

    const materialPersona_tipo3 = new THREE.SpriteMaterial();
    //materialPersona_tipo3.map = this.recursos.items.textura_personas_tipo3;
    materialPersona_tipo3.alphaMap =
      this.recursos.items.textura_personas_tipo3_alpha;
    materialPersona_tipo3.transparent = true;
    materialPersona_tipo3.alphaTest = 0.001;

    const materialPersona_tipo4 = new THREE.SpriteMaterial();
    //materialPersona_tipo4.map = this.recursos.items.textura_personas_tipo4;
    materialPersona_tipo4.alphaMap =
      this.recursos.items.textura_personas_tipo4_alpha;
    materialPersona_tipo4.transparent = true;
    materialPersona_tipo4.alphaTest = 0.001;

    const materialPersona_tipo5 = new THREE.SpriteMaterial();
    //materialPersona_tipo5.map = this.recursos.items.textura_personas_tipo5;
    materialPersona_tipo5.alphaMap =
      this.recursos.items.textura_personas_tipo5_alpha;
    materialPersona_tipo5.transparent = true;
    materialPersona_tipo5.alphaTest = 0.001;

    this.materialesPersonas.push(
      materialPersona_tipo1,
      materialPersona_tipo2,
      materialPersona_tipo3,
      materialPersona_tipo4,
      materialPersona_tipo5
    );

    //Arbustos

    const materialArbusto_tipo1 = new THREE.SpriteMaterial();
    materialArbusto_tipo1.map = this.recursos.items.textura_arbusto_tipo1;
    materialArbusto_tipo1.alphaMap =
      this.recursos.items.textura_arbusto_tipo1_alpha;
    materialArbusto_tipo1.transparent = true;
    materialArbusto_tipo1.alphaTest = 0.001;

    const materialArbusto_tipo2 = new THREE.SpriteMaterial();
    materialArbusto_tipo2.map = this.recursos.items.textura_arbusto_tipo2;
    materialArbusto_tipo2.alphaMap =
      this.recursos.items.textura_arbusto_tipo2_alpha;
    materialArbusto_tipo2.transparent = true;
    materialArbusto_tipo2.alphaTest = 0.001;

    const materialArbusto_tipo3 = new THREE.SpriteMaterial();
    materialArbusto_tipo3.map = this.recursos.items.textura_arbusto_tipo3;
    materialArbusto_tipo3.alphaMap =
      this.recursos.items.textura_arbusto_tipo3_alpha;
    materialArbusto_tipo3.transparent = true;
    materialArbusto_tipo3.alphaTest = 0.001;

    this.materialesArbustos.push(
      materialArbusto_tipo1,
      materialArbusto_tipo2,
      materialArbusto_tipo3
    );

    //Arboles

    const materialArbol_tipo1 = new THREE.SpriteMaterial();
    materialArbol_tipo1.map = this.recursos.items.textura_arbol_tipo1;
    materialArbol_tipo1.alphaMap =
      this.recursos.items.textura_arbol_tipo1_alpha;
    materialArbol_tipo1.transparent = true;
    materialArbol_tipo1.alphaTest = 0.001;

    const materialArbol_tipo2 = new THREE.SpriteMaterial();
    materialArbol_tipo2.map = this.recursos.items.textura_arbol_tipo2;
    materialArbol_tipo2.alphaMap =
      this.recursos.items.textura_arbol_tipo2_alpha;
    materialArbol_tipo2.transparent = true;
    materialArbol_tipo2.alphaTest = 0.001;

    const materialArbol_tipo3 = new THREE.SpriteMaterial();
    materialArbol_tipo3.map = this.recursos.items.textura_arbol_tipo3;
    materialArbol_tipo3.alphaMap =
      this.recursos.items.textura_arbol_tipo3_alpha;
    materialArbol_tipo3.transparent = true;
    materialArbol_tipo3.alphaTest = 0.001;

    const materialArbol_tipo4 = new THREE.SpriteMaterial();
    materialArbol_tipo4.map = this.recursos.items.textura_arbol_tipo4;
    materialArbol_tipo4.alphaMap =
      this.recursos.items.textura_arbol_tipo4_alpha;
    materialArbol_tipo4.transparent = true;
    materialArbol_tipo4.alphaTest = 0.001;

    this.materialesArboles.push(
      materialArbol_tipo1,
      materialArbol_tipo2,
      materialArbol_tipo3,
      materialArbol_tipo4
    );

    //Arboles Reeleno

    const materialArbolRelleno_tipo1 = new THREE.SpriteMaterial();
    materialArbolRelleno_tipo1.map = this.recursos.items.textura_arboles_tipo1;
    materialArbolRelleno_tipo1.alphaMap =
      this.recursos.items.textura_arboles_tipo1_alpha;
    materialArbolRelleno_tipo1.transparent = true;
    materialArbolRelleno_tipo1.alphaTest = 0.001;

    const materialArbolRelleno_tipo2 = new THREE.SpriteMaterial();
    materialArbolRelleno_tipo2.map = this.recursos.items.textura_arboles_tipo2;
    materialArbolRelleno_tipo2.alphaMap =
      this.recursos.items.textura_arboles_tipo2_alpha;
    materialArbolRelleno_tipo2.transparent = true;
    materialArbolRelleno_tipo2.alphaTest = 0.001;

    const materialArbolRelleno_tipo3 = new THREE.SpriteMaterial();
    materialArbolRelleno_tipo3.map = this.recursos.items.textura_arboles_tipo3;
    materialArbolRelleno_tipo3.alphaMap =
      this.recursos.items.textura_arboles_tipo3_alpha;
    materialArbolRelleno_tipo3.transparent = true;
    materialArbolRelleno_tipo3.alphaTest = 0.001;
/*
    const materialArbolRelleno_tipo4 = new THREE.SpriteMaterial();
    materialArbolRelleno_tipo4.map = this.recursos.items.textura_arboles_tipo4;
    materialArbolRelleno_tipo4.alphaMap =
      this.recursos.items.textura_arboles_tipo4_alpha;
    materialArbolRelleno_tipo4.transparent = true;
    materialArbolRelleno_tipo4.alphaTest = 0.001;*/

    this.materialesArbolesRelleno.push(
      materialArbolRelleno_tipo1,
      materialArbolRelleno_tipo2,
      materialArbolRelleno_tipo3
      /*materialArbolRelleno_tipo4*/
    );

    //Nubes
    const texturaNubes = this.recursos.items.textura_nubes;
    texturaNubes.wrapS = THREE.RepeatWrapping;
    texturaNubes.wrapT = THREE.RepeatWrapping;
    texturaNubes.repeat.x = 6;
    texturaNubes.repeat.y = 6;

    this.materialesContexto.nubes = new THREE.MeshBasicMaterial({
      color: this.colores.coloresMundo.colorNubes,
      side: THREE.DoubleSide,
      map: texturaNubes,
      transparent: true,
    });
    //Lago
    this.materialesContexto.lago = new THREE.MeshStandardMaterial({
      map: this.recursos.items.textura_lago,
      alphaMap: this.recursos.items.textura_lago_alpha,
      transparent: true,
      //metalness: 0.8,
      //roughness: 0.8
      
    });
  }
}
