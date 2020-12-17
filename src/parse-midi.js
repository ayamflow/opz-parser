function parseMidiMessage(message) {
    return {
        command: message.data[0] >> 4,
        channel: message.data[0] & 0xf,
        note: message.data[1],
        velocity: message.data[2] / 127
    }
}

export default parseMidiMessage