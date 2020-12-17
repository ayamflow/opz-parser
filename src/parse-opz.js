import { parseMidiMessage } from './parse-midi'

const TRACKS = [
    'kick',
    'snare',
    'perc',
    'sample',
    'bass',
    'lead',
    'arp',
    'chord',
    'fx1',
    'fx2',
    'tape',
    'master',
    'perform',
    'module',
    'lights',
    'motion'
]

const ACTIONS = [
    'release',
    'press'
]

const NOTE_START_OFFSET = 53

export function parseOPZMessage(message) {
    const {command, channel, note, velocity} = parseMidiMessage(message)
    let track = TRACKS[channel]
    let key = note - NOTE_START_OFFSET
    let action = ACTIONS[Math.round(velocity)]

    return({track, key, action})
}