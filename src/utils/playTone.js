export class toner {
    constructor () {
        this.audioContext = new window.AudioContext
        this.wave = this.audioContext.createOscillator()

        this.volume = this.audioContext.createGain()
        this.volume.connect(this.audioContext.destination)
        this.volume.gain.value = 0.1
        
        this.wave.type = "triangle"
        this.wave.frequency.value = 100
        this.wave.connect(this.volume)

        this.wave.start()
    }
    
    freq(freq) {
        this.wave.frequency.value = freq
        console.log(`freq ${freq}`)
    }
    
    stop() {
        this.wave.stop()
        console.log("stop")
    }
}