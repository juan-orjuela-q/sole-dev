/**
 * Interaccion
 */
 const lilGUI = document.querySelector('.lil-gui')

 function toogleGUI() {
     lilGUI.classList.toggle('oculto')
 }
 
 toogleGUI()
 
 window.addEventListener('keydown', (event) => {
     if (event.key === 'l') {
         toogleGUI()
     } 
 })
 
 const formatoNumero = Intl.NumberFormat('de-DE')
 
 btnsTipologia.forEach(item => {
     item.addEventListener('click', event => {
         event.preventDefault();
         if (item.classList.contains('activo')) {
             item.classList.remove('activo')
         } else {
             item.classList.add('activo')
         }
     })
 })
 btnCerrar.forEach(item => {
     item.addEventListener('click', event => {
         event.preventDefault()
         let modal = item.parentNode
 
         anchoModal = 0
         redimensionar()
         modal.classList.remove('activo')
 
         if (modal.id === 'modal-cercanias') {
             hwInfo.classList.remove('activo')
         }
     })
 })
 btnsFlotantes.forEach(item => {
     item.addEventListener('click', event => {
         event.preventDefault()
         const destino = document.querySelector(item.dataset.destino)
         //Mostrar Pop UP
         destino.classList.add('activo')
         //Redimensionar maqueta
         anchoModal = destino.offsetWidth
         redimensionar()
     })
 })
 const btnCambioEscena = document.querySelector('#btn-cambioEscena'),
     maquetaRender = document.querySelector('#maqueta-render')
 
 let escRender = true,
     frameActual = 0
 
 
 
 let renders = []
 for (let i = 0; i < 120; i++) {
     const render = `maqRender/${i}.jpg`
     renders.push(render)
 }
 $(function () {
     $('#maqueta-render').spritespin({
         source: renders,
         width: 1920,
         height: 1080,
         // reverse interaction direction
         sense: -1,
         animate: false,
         onFrame: function (e, data) {
             frameActual = data.frame
         }
     });
 })
 
 btnCambioEscena.addEventListener('click', event => {
     btnCambioEscena.classList.toggle('activo')
     maquetaRender.classList.toggle('activo')
     if (escRender) {
 
         escRender = false
     } else {
         escRender = true
     }
 })
 
 btnCambioEscena.click()
 const btnCercanias = document.getElementById('btnCercanias')
 btnCercanias.addEventListener('click', mostrarInfo)
 
 const modalCercanias = document.getElementById('modal-cercanias')
 modalCercanias.querySelectorAll('input').forEach(input => input.checked = true)
 //Aislar apto
 let camaraX = 5,
     camaraY = 4,
     camaraZ = 5
 
 const tooltipApto = document.getElementById('tooltip-apto'),
     tool_torre = tooltipApto.querySelector('.torre span'),
     tool_apto = tooltipApto.querySelector('.apto span'),
     tool_ac = tooltipApto.querySelector('.a-c span'),
     tool_ap = tooltipApto.querySelector('.a-p span'),
     tool_img = tooltipApto.querySelector('.tool-img')
 
 const btnMostrarApto = document.querySelector('#tooltip-apto .btn-ir')
 
 function aislarApto(identificador) {
 
     const filasResultados = Array.from(document.querySelectorAll('#modal-unidades tbody tr'))
     const filasFavoritos = Array.from(document.querySelectorAll('#modal-favoritos tbody tr'))
 
     if (filasResultados) {
         filasResultados.forEach(fila => fila.classList.remove('activo'))
         let fila = filasResultados.find(fila => fila.dataset.apto === identificador)
         fila.classList.add('activo')
     }
 
     mascarasProyecto.traverse((child) => {
 
         if (child.type === "Mesh") {
             //Limpiar mascaras
             if (child.userData.tipo === '1') {
                 child.material = materialFill_a1
             } else if (child.userData.tipo === '2') {
                 child.material = materialFill_a2
             } else if (child.userData.tipo === '3') {
                 child.material = materialFill_a3
             } else {
                 console.log('Problema con Fila')
             }
             //Poner mascara
             if (child.userData.id === identificador) {
                 child.material = mascaraHover
 
                 //Mover camara
                 const aptoX = child.position.x * mascarasProyecto.scale.x + (pModX * 1),
                     aptoY = child.position.y * mascarasProyecto.scale.y + (pModY * 1),
                     aptoZ = child.position.z * mascarasProyecto.scale.z + (pModZ * 1)
 
                 controls.enabled = false
 
                 //Cambiar posicion y target de camara
                 if (child.userData.torre === "1") {
                     camaraX = 1.5
                 } else if (child.userData.torre === "2") {
                     camaraX = -1
                 } else if (child.userData.torre === "3") {
                     camaraX = -3
                 } else {
                     console.log('No salio bien')
                 }
 
                 if (child.userData.vista === "Norte") {
                     camaraZ = -6
                 } else {
                     camaraZ = 6
                 }
 
                 gsap.to(camera.position, {
                     duration: 1,
                     x: camaraX,
                     y: camaraY,
                     z: camaraZ,
                     onUpdate: function () {
                         controls.update()
                     },
                     onComplete: function () {
                         controls.enabled = true
                     }
                 })
 
                 gsap.to(controls.target, {
                     duration: 1,
                     x: aptoX,
                     y: aptoY,
                     z: aptoZ,
                     onUpdate: function () {
                         controls.update();
                     },
                     onComplete: function () {
                         controls.enabled = true;
                     }
                 });
                 //Mostrar tooltip
 
                 tooltipApto.classList.add('activo')
                 btnMostrarApto.dataset.destino = identificador
                 //Pintar info
 
                 let obj = infoTipologias.find(obj => obj.id === identificador)
 
                 tool_torre.innerHTML = obj.torre
                 tool_apto.innerHTML = obj.apto_tit
                 tool_ac.innerHTML = obj.area_ac
                 tool_ap.innerHTML = obj.area_ap
                 tool_img.innerHTML = `<img src="${obj.img_planta}" alt="Planta de unidad">`
                 /*const positionTooltip = new THREE.Vector3(aptoX, aptoY, aptoZ),
                     screenPosition = positionTooltip.clone()
 
                 screenPosition.project(camera)
                 const translateX = screenPosition.x * sizes.width * 0.5
                 const translateY = screenPosition.y * sizes.height * - 0.5
                 tooltipApto.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`*/
 
 
 
 
             }
         }
     })
 }
 
 function quitarAislamiento() {
     tooltipApto.classList.remove('activo')
     btnMostrarApto.dataset.destino = ''
 
     const filasResultados = Array.from(document.querySelectorAll('#modal-unidades tbody tr'))
     const filasFavoritos = Array.from(document.querySelectorAll('#modal-favoritos tbody tr'))
 
     if (filasResultados) {
         filasResultados.forEach(fila => fila.classList.remove('activo'))
     }
 
     mascarasProyecto.traverse((child) => {
 
         if (child.type === "Mesh") {
             //Limpiar mascaras
             if (child.userData.tipo === '1') {
                 child.material = materialFill_a1
             } else if (child.userData.tipo === '2') {
                 child.material = materialFill_a2
             } else if (child.userData.tipo === '3') {
                 child.material = materialFill_a3
             } else {
                 console.log('Problema con Fila')
             }
 
         }
     })
 
     controls.enabled = false
     gsap.to(controls.target, {
         duration: 1,
         x: 0,
         y: 0,
         z: 0,
         onUpdate: function () {
             controls.update();
         },
         onComplete: function () {
             controls.enabled = true;
         }
     });
 }
 
 const btnCerrarTooltip = document.querySelector('#tooltip-apto .btn-cerrar')
 
 btnCerrarTooltip.addEventListener('click', (event) => {
     event.preventDefault();
     quitarAislamiento()
 })
 
 //Hover máscaras con listados
 function hoverFilaApto(e) {
     e.preventDefault()
     e.stopPropagation()
     const fila = e.target,
         filaID = fila.dataset.apto
     if (filaID) {
         aislarApto(filaID)
     }
 }