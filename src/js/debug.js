// Carpetas
const gui = new dat.GUI()
let mapaFolder = gui.addFolder('Mapa'),
    lucesFolder = gui.addFolder('Luces'),
    aptosFolder = gui.addFolder('Aptos'),
    coloresFolder = gui.addFolder('Colores'),
    proyectoFolder = gui.addFolder('Proyecto'),
    mapa_generalFolder = mapaFolder.addFolder('General'),
    mapa_arbolesFolder = mapaFolder.addFolder('Árboles'),
    mapa_andenesFolder = mapaFolder.addFolder('Andenes'),
    mapa_terrenosFolder = mapaFolder.addFolder('Terrenos'),
    mapa_contextoFolder = mapaFolder.addFolder('Contexto')

mapaFolder.close()
lucesFolder.close()
aptosFolder.close()
coloresFolder.close()
proyectoFolder.close()


//Arboles
mapa_arbolesFolder.add(losArboles.position, 'x').min(-200).max(200).step(0.1).name('losArboles X')
mapa_arbolesFolder.add(losArboles.position, 'y').min(-2).max(2).step(0.01).name('losArboles Y')
mapa_arbolesFolder.add(losArboles.position, 'z').min(-200).max(200).step(0.1).name('losArboles Z')

mapa_arbolesFolder.add(losArboles.rotation, 'y').min(-200).max(200).step(0.01).name('losArboles Rot')

mapa_arbolesFolder.add(losArboles.scale, 'x').min(0.5).max(0.9).step(0.01).name('scale losArboles X')
mapa_arbolesFolder.add(losArboles.scale, 'z').min(0.5).max(0.9).step(0.01).name('scale losArboles Z')
mapa_arbolesFolder.add(losArboles.scale, 'y').min(0.5).max(0.9).step(0.01).name('scale losArboles Y')

//Mapa
mapa_generalFolder.add(mapa.position, 'x').min(-200).max(200).step(0.1).name('mapa X')
mapa_generalFolder.add(mapa.position, 'z').min(-200).max(200).step(0.1).name('mapa Z')
mapa_generalFolder.add(mapa.rotation, 'z').min(-200).max(200).step(0.01).name('mapa Rot Z')

mapa_generalFolder.add(mapa.scale, 'x').min(0.5).max(0.9).step(0.01).name('scale mapa X')
mapa_generalFolder.add(mapa.scale, 'z').min(0.5).max(0.9).step(0.01).name('scale mapa Z')
mapa_generalFolder.add(mapa.scale, 'y').min(0.5).max(0.9).step(0.01).name('scale mapa Y')

//Luces
lucesFolder.add(directionalLight.position, 'x').min(-25).max(250).step(0.01).name('Directional x')
lucesFolder.add(directionalLight.position, 'y').min(0.1).max(250).step(0.01).name('Directional y')
lucesFolder.add(directionalLight.position, 'z').min(-25).max(250).step(0.01).name('Directional z')
lucesFolder.add(directionalLight, 'intensity').min(0).max(2).step(0.001).name('Directional inten')

lucesFolder
    .addColor(colores, 'colorPoint2')
    .onChange(() => {
        directionalLight.color.set(colores.colorPoint2)        
    })
    .name('Directional color')

lucesFolder.add(pointLight.position, 'x').min(-25).max(25).step(0.01).name('point x')
lucesFolder.add(pointLight.position, 'y').min(-10).max(75).step(0.01).name('point y')
lucesFolder.add(pointLight.position, 'z').min(-25).max(25).step(0.01).name('point z')
lucesFolder.add(pointLight, 'intensity').min(0).max(3).step(0.1).name('Point inten')
lucesFolder.add(pointLight, 'distance').min(0).max(200).step(1).name('Point Distance')

lucesFolder
    .addColor(colores, 'colorPoint')
    .onChange(() => {
        pointLight.color.set(colores.colorPoint)        
    })
    .name('colorPoint')

/**
 * Debug Colores
 */
coloresFolder
.addColor(colores, 'mascara_1')
.onChange(() => {
    materialFill_a1.color.set(colores.mascara_1)
    materialLineas_a1.color.set(colores.mascara_1)
})
.name('Mascara 1')

coloresFolder
.addColor(colores, 'mascara_2')
.onChange(() => {
    materialFill_a2.color.set(colores.mascara_2)
    materialLineas_a2.color.set(colores.mascara_2)
})
.name('Mascara 2')

coloresFolder
.addColor(colores, 'mascara_3')
.onChange(() => {
    materialFill_a3.color.set(colores.mascara_3)
    materialLineas_a3.color.set(colores.mascara_3)
})
.name('Mascara 3')

coloresFolder
.addColor(colores, 'colorTerreno')
.onChange(() => {
    terreno.material.color.set(colores.colorTerreno)
    piso.material.color.set(colores.colorTerreno)
})
.name('Terreno')

coloresFolder
.addColor(colores, 'colorBruma')
.onChange(() => {
    niebla.color.set(colores.colorBruma)
})
.name('Bruma')

coloresFolder
.addColor(colores, 'colorCielo').onChange(() => {
    renderer.setClearColor(colores.colorCielo)
}).name('Cielo')

coloresFolder
.addColor(colores, 'colorArboles').onChange(() => {
    mat_arbol1.color.set(colores.colorArboles)
    mat_arbol2.color.set(colores.colorArboles)
}).name('Arboles')

coloresFolder
.addColor(colores, 'colorAndenes').onChange(() => {
    mat_andenes.color.set(colores.colorAndenes)
    mat_vias2.color.set(colores.colorAndenes)
}).name('Andenes')

coloresFolder
.addColor(colores, 'colorVias').onChange(() => {
    mat_vias.color.set(colores.colorVias)
    mat_vias1.color.set(colores.colorVias)
}).name('Vías')

coloresFolder
.addColor(colores, 'colorTransito').onChange(() => {
    mat_transito.color.set(colores.colorTransito)

}).name('Vías')

coloresFolder
.addColor(colores, 'contextoFillColor').onChange(() => {
    contextoMaterial.color.set(colores.contextoFillColor)
}).name('Vecinos')

coloresFolder
.addColor(colores, 'contextoLineColor').onChange(() => {
    materialLinea.color.set(colores.contextoLineColor)
}).name('Vecinos Línea')
coloresFolder.add(materialLinea, 'opacity').min(0).max(1).step(0.05).name('Vecinos Línea Op')

//Colores alternativo
proyectoFolder
.addColor(colores, 'mainArboles').onChange(() => {
    mat_arbolesAlt.color.set(colores.mainArboles)
}).name('Árboles')

proyectoFolder
.addColor(colores, 'mainArbustos').onChange(() => {
    mat_arbustosAlt.color.set(colores.mainArbustos)
}).name('Arbustos')

proyectoFolder
.addColor(colores, 'mainBarandas').onChange(() => {
    mat_barandasAlt.color.set(colores.mainBarandas)
}).name('Barandas')

proyectoFolder
.addColor(colores, 'mainBbq').onChange(() => {
    mat_bbqAlt.color.set(colores.mainBbq)
}).name('Bbq')

proyectoFolder
.addColor(colores, 'mainCarros').onChange(() => {
    mat_carrosAlt.color.set(colores.mainCarros)
}).name('Carros')

proyectoFolder
.addColor(colores, 'mainComunal').onChange(() => {
    mat_comunalAlt.color.set(colores.mainComunal)
}).name('Comunal')

proyectoFolder
.addColor(colores, 'mainBbq').onChange(() => {
    mat_bbqAlt.color.set(colores.mainBbq)
}).name('Bbq')

proyectoFolder
.addColor(colores, 'mainJuegos').onChange(() => {
    mat_juegosAlt.color.set(colores.mainJuegos)
}).name('Juegos')

proyectoFolder
.addColor(colores, 'mainLuminarias').onChange(() => {
    mat_luminariasAlt.color.set(colores.mainLuminarias)
}).name('Luminarias')

proyectoFolder
.addColor(colores, 'mainTorres').onChange(() => {
    mat_torresAlt.color.set(colores.mainTorres)
}).name('Torres')

proyectoFolder
.addColor(colores, 'mainUrbano').onChange(() => {
    mat_urbanoAlt.color.set(colores.mainUrbano)
}).name('Urbano')

proyectoFolder
.addColor(colores, 'mainTorresLineas').onChange(() => {
    mat_torresLineas.color.set(colores.mainTorresLineas)
}).name('Torres Línea')

proyectoFolder.add(mat_torresLineas, 'opacity').min(0).max(1).step(0.05).name('Torres Línea Op')

lucesFolder.add(directionalLight.shadow.camera, 'near').min(-25).max(25).step(0.1).name('Dir Shadow near')
lucesFolder.add(directionalLight.shadow.camera, 'far').min(-25).max(600).step(0.1).name('Dir Shadow far')

lucesFolder.add(directionalLight.shadow.camera, 'top').min(-25).max(25).step(0.1).name('Dir Shadow top')
lucesFolder.add(directionalLight.shadow.camera, 'right').min(-25).max(25).step(0.1).name('Dir Shadow right')
lucesFolder.add(directionalLight.shadow.camera, 'bottom').min(-25).max(25).step(0.1).name('Dir Shadow bottom')
lucesFolder.add(directionalLight.shadow.camera, 'left').min(-25).max(25).step(0.1).name('Dir Shadow left')