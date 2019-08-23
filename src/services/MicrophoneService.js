class MicrophoneService {
    audioContext = null;
    inputDevice = null;

    listeners = {};
    
    error = false;

    /**
     * Emits an event to all listeners
     * @param {string} type 
     * @param {*} data 
     */
    emit(type, data = null) {
        if (!this.listeners[type]) {
            return;
        }

        this.listeners[type].forEach(listener => {
            if (typeof listener !== 'function') {
                return;
            }

            listener(data);
        });
    }

    /**
     * Adds a new event listener
     * @param {string} type 
     * @param {function} callback 
     */
    on(type, callback) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }

        this.listeners[type].push(callback);
    }

    /**
     * Removes a listener
     * @param {string} type 
     * @param {function} callback 
     */
    removeListener(type, callback) {
        if (!this.listeners[type]) {
            return;
        }

        const index = this.listeners[type].findIndex(listener => listener === callback);

        if (index === -1) {
            return;
        }

        this.listeners[type].splice(index, 1);
    }

    /**
     * Prepares the service APIs to use
     */
    init() {
        this.audioContext = new AudioContext();

        navigator.getUserMedia = navigator.getUserMedia
            || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia
            || navigator.msGetUserMedia;

        if (!navigator.getUserMedia) {
            this.error = true;
            throw new Error('UserMedia API not available!');
        }
    }

    /**
     * Returns a list of available input devices
     * @returns {Promise<array>}
     */
    getAvailableInputDevices() {
        return new Promise((resolve, reject) => {
            navigator.mediaDevices.enumerateDevices()
                .then((devices) => {
                    resolve(devices.filter((d) => d.kind === 'audioinput'))
                })
                .catch(reject)
        });
    }

    /**
     * Selects a device to listen
     * @param {string} deviceId 
     */
    selectDevice(deviceId) {
        this.inputDevice = deviceId;
    }

    /**
     * Initialises the listening cycle for microphone
     */
    listen() {
        return new Promise((resolve, reject) => {
            if (!this.inputDevice) {
                reject('No device selected!');
            }
    
            const userMediaOptions = {
                audio: {
                    deviceId: this.inputDevice
                }
            }
    
            navigator.getUserMedia(
                userMediaOptions,
                (stream) => {
                    this.initialiseMicrophoneServices(stream);
                    resolve();
                },
                (e) => {
                    reject(e);
                }
            );

        })
    }

    /**
     * Initialises microphone processors 
     * @param {*} stream 
     */
    initialiseMicrophoneServices(stream) {
        const microphone = this.audioContext.createMediaStreamSource(stream);

        const meter = this.createAudioMeter(this.audioContext);
        microphone.connect(meter);
    }

    /**
     * Creates audio processor and initialises callbacks
     * @param {AudioContext} audioContext 
     * @param {number} clipLevel 
     * @param {number} averaging 
     * @param {number} clipLag 
     */
    createAudioMeter(audioContext, clipLevel = 0.98, averaging = 0.95, clipLag = 750) {
        const processor = audioContext.createScriptProcessor(512);
        processor.onaudioprocess = (e) => {
            // volume audio process updates listening parameters
            this.volumeAudioProcess(e, processor);
            this.onAudioProcess(e, processor);
        };

        processor.clipping = false;
        processor.lastClip = 0;
        processor.volume = 0;
        processor.clipLevel = clipLevel;
        processor.averaging = averaging;
        processor.clipLag = clipLag;

        // this will have no effect, since we don't copy the input to the output,
        // but works around a current Chrome bug.
        processor.connect(audioContext.destination);

        processor.checkClipping = function () {
            if (!this.clipping) {
                return false;
            }

            if ((this.lastClip + this.clipLag) < window.performance.now()) {
                this.clipping = false;
            }

            return this.clipping;
        };

        processor.shutdown = function () {
            this.disconnect();
            this.onaudioprocess = null;
        };

        return processor;
    }

    /**
     * Audio processing handle
     * @param {AudioProcessingEvent} event 
     * @param {ScriptProcessorNode} processor 
     */
    onAudioProcess(event, processor) {
        this.emit('audio-process', { event, processor })
    }

    /**
     * Volume Audio Processor - calculates microphone volume
     * Only Audio Processor that is actually required to run
     * @param {AudioProcessingEvent} event 
     * @param {ScriptProcessorNode} processor 
     */
    volumeAudioProcess(event, processor) {
        let buf = event.inputBuffer.getChannelData(0);
        let bufLength = buf.length;
        let sum = 0;
        let x;

        // Do a root-mean-square on the samples: sum up the squares...
        for (let i = 0; i < bufLength; i++) {
            x = buf[i];
            if (Math.abs(x) >= processor.clipLevel) {
                processor.clipping = true;
                processor.lastClip = window.performance.now();
            }

            sum += x * x;
        }

        // ... then take the square root of the sum.
        var rms = Math.sqrt(sum / bufLength);

        // Now smooth this out with the averaging factor applied
        // to the previous sample - take the max here because we
        // want "fast attack, slow release."
        const volume = Math.max(rms, processor.volume * processor.averaging);

        if (processor.volume !== volume) {
            processor.volume = volume;
            const volumePercentage = Math.min(Math.round(100 * volume), 100)

            if (volumePercentage !== this.volume) {
                this.volume = volumePercentage;
    
                this.emit('volume-change', this.volume);
            }
        }
    }
}

export default new MicrophoneService();