import EventEmitter from "./EventEmitter"

export default class Tiempo extends EventEmitter
{
    constructor()
    {
        super()
        //Configuracion

        //start El momento en el que empieza la experiencia
        //current El momento actual, cambia cada en frame
        //elapsed El tiempo que transcurrido desde que empezó la experiencia
        //delta El tiempo que ha pasado desde el frame anterior

        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        

        window.requestAnimationFrame(() => {
            this.tick()
        })
        
    }

    tick()
    {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger('tick')

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}