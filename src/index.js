import { parseOPZMessage } from './parse-opz'

export class OPZParser {
    construtor() {
        this.onMIDISuccess = this.onMIDISuccess.bind(this)
        this.onMIDIFailure = this.onMIDIFailure.bind(this)
        this.onMIDIMessage = this.onMIDIMessage.bind(this)
        
        navigator.requestMIDIAccess().then(this.onMIDISuccess, this.onMIDIFailure)
    }

    onMIDISuccess(midiAccess) {
        let inputs = midiAccess.inputs.values()
      
        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            console.log('Connected:', input.value.name)
            input.value.onmidimessage = this.onMIDIMessage
        }
    }
      
    onMIDIFailure(msg) {
        console.log( "Failed to get MIDI access - " + msg )
    }
      
    // onNote(note, velocity) {
    //     console.log('onNote', {note, velocity})
    // }
    // onPad(pad, velocity) {
    //     console.log('onPad', {note, velocity})
    // }
    // onPitchBend(value) {
    //     console.log('onPitchBend', {note, velocity})
    // }
    // onModWheel(value) {
    //     console.log('onModWheel', {note, velocity})
    // }
      
    onMIDIMessage(message) {
        let data = parseOPZMessage(message)
        console.log(data)
        return data
        
        /*
        // Parse the MIDIMessageEvent.
        const {command, channel, note, velocity} = parseMidiMessage(message)
        console.log({command, channel, note, velocity})
    
        // Stop command.
        // Negative velocity is an upward release rather than a downward press.
        if (command === 8) {
        if      (channel === 0) onNote(note, -velocity)
        else if (channel === 9) onPad(note, -velocity)
        }
    
        // Start command.
        else if (command === 9) {
        if      (channel === 0) onNote(note, velocity)
        else if (channel === 9) onPad(note, velocity)
        }
    
        // Knob command.
        else if (command === 11) {
        if (note === 1) onModWheel(velocity)
        }
    
        // Pitch bend command.
        else if (command === 14) {
        onPitchBend(velocity)
        }
        */
    }
}

export default OPZ