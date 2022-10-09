import * as THREE from 'three'

export default class Hotspots {
    constructor() {
        this.hotspots = [{
            position: new THREE.Vector3(3.34, 0.82, -0.2),
            element: document.querySelector('.hotspot-0'),
            label: 'Terraza BBQ',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/terraza.jpg'
        },
        {
            position: new THREE.Vector3(3.84, 0.55, 0.06),
            element: document.querySelector('.hotspot-1'),
            label: 'Social Kitchen',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/social-kitchen.jpg'
        },
        {
            position: new THREE.Vector3(4.7, 0.23, -0.26),
            element: document.querySelector('.hotspot-2'),
            label: 'Lobby',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/lobby.jpg'
        },
        {
            position: new THREE.Vector3(3.5, 0.55, 0.06),
            element: document.querySelector('.hotspot-3'),
            label: 'Salón de juegos',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/salon-juegos.jpg'
        },
        {
            position: new THREE.Vector3(3.79, 0.23, 0.2),
            element: document.querySelector('.hotspot-4'),
            label: 'Salón social',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/salon-social.jpg'
        },
        {
            position: new THREE.Vector3(4.24, 0.55, 0.06),
            element: document.querySelector('.hotspot-5'),
            label: 'Piscina',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/piscina.jpg'
        },
        {
            position: new THREE.Vector3(-5.9, 0.55, -2.82),
            element: document.querySelector('.hotspot-6')
        },
        {
            position: new THREE.Vector3(1.68, 0.63, 4.8),
            element: document.querySelector('.hotspot-7')
        }
            , {
            position: new THREE.Vector3(15, 0.6, 15),
            element: document.querySelector('.hotspot-8')
        },
        {
            position: new THREE.Vector3(-50, 0.6, 15),
            element: document.querySelector('.hotspot-9')
        },
        {
            position: new THREE.Vector3(6, 0.6, 48),
            element: document.querySelector('.hotspot-10')
        },
        {
            position: new THREE.Vector3(14, 0.6, -45),
            element: document.querySelector('.hotspot-11')
        }]
    }
}