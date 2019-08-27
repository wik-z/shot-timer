// todo: import constants

class Beeper {
    static states = {
        BEEPER_STANDBY: 'standby',
        BEEPER_PLAYING: 'playing'
    }
    
    /**
     * @type {AudioContext|null}
     */
    audioContext = null;
    /**
     * @type {OscillatorNode|null}
     */
    oscillator = null;

    /**
     * @type {Beeper.states}
     */
    state = Beeper.states.BEEPER_STANDBY;

    frequency = 3000;
    duration = 200;

    /**
     * Creates beeper object
     * @param {*} frequency - beep frequency
     * @param {*} duration - beep duration
     */
    constructor() {
        this.audioContext = new AudioContext();

        this.prepareOscillator();
    }

    /**
     * Prepares the oscillator
     */
    prepareOscillator() {
        this.oscillator = this.audioContext.createOscillator()

        this.oscillator.type = 'square';
        this.oscillator.frequency.value = this.frequency;
        this.oscillator.connect(this.audioContext.destination);
    }

    /**
     * plays the sound
     * @returns {Promise<void|string>}
     */
    play() {
        return new Promise((resolve, reject) => {
            if (this.state === Beeper.states.BEEPER_PLAYING) {
                reject('Beeper is already playing');
            }
    
            this.oscillator.start();
            this.state = Beeper.states.BEEPER_PLAYING;

            setTimeout(() => { 
                this.oscillator.stop();
                resolve();
                this.state = Beeper.states.BEEPER_STANDBY;
                this.prepareOscillator(); 
            }, this.duration);
        });
    }
}

export default Beeper;