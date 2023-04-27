export default class Colores 
{
    constructor()
    {
        this.paleta = {
            color1: '#222431',
            color2: '#F9E2D0',
            color3: '#C1403A',
            color4: '#458376',
            color5: '#313c90'
        },
        this.luces = {
            ambient: '#FFFFFF',
            point: '#FFFFFF',
            directional: '#FFFFFF'
        },
        this.mascaras = {
            mascara1: '#222431',
            mascara2: '#F9E2D0',
            mascara3: '#C1403A',
            mascara4: '#458376',
            mascara5: '#313c90',
            mascaraHover: '#ffffff',
            mascaraClick: '#ffffff',
            mascaraLinea: this.paleta.color1
        }
        this.coloresMundo = {
            blanco: '#FFFFFF',
            colorAmbiente: '#FFFFFF',
            colorProyecto: '#FFFFFF',
            colorProyectoAlt: this.paleta.color3,
            colorVecinos: '#c1c7cd',//c7cbd1
            colorEdificios: '#c1c7cd',//c7cbd1
            colorEdificiosLinea: '#ffffff',
            colorVias: '#ffffff',//'#787f87',
            colorTransito: '#222431',
            colorAlerta: '#C1403A',
            colorArboles: '#afb992',
            colorAndenes: '#d3beab',//'#c1b8ae',
            colorCielo: '#FFFFFF',//fbfaea
            colorBruma: '#e5cfbd',//ebeee2
            colorTerreno: '#a3a98e',//'#99ac8b',
            colorNubes: '#dbdbdb',
            //Colores version alterna
            colorBarandas: '#ffffff',
            colorBbq: '#84889f',
            colorCarros: '#85868e',
            colorComunal: '#ffffff',//#f3f1e8
            colorJuegos: '#84889f',
            colorLuminarias: '#222431',
            colorTorres: '#ffffff',//#f3f1e8
            colorTorresLineas: '#ffffff',
            colorUrbano: '#ffffff',
            //
            colorEntrada: '#a8c559',
            colorSalida: '#59c5aa',
        }
    }
}
