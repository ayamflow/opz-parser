function parseMidiMessage(message) {
  return {
    command: message.data[0] >> 4,
    channel: message.data[0] & 0xf,
    note: message.data[1],
    velocity: message.data[2] / 127
  };
}

var TRACKS = ['kick', 'snare', 'perc', 'sample', 'bass', 'lead', 'arp', 'chord', 'fx1', 'fx2', 'tape', 'master', 'perform', 'module', 'lights', 'motion'];
var ACTIONS = ['release', 'press'];
var NOTE_START_OFFSET = 53;
function parseOPZMessage(message) {
  var _parseMidiMessage = parseMidiMessage(message),
      channel = _parseMidiMessage.channel,
      note = _parseMidiMessage.note,
      velocity = _parseMidiMessage.velocity;

  var track = TRACKS[channel];
  var key = note - NOTE_START_OFFSET;
  var action = ACTIONS[Math.round(velocity)];
  return {
    track: track,
    key: key,
    action: action
  };
}

var OPZParser = /*#__PURE__*/function () {
  function OPZParser() {}

  var _proto = OPZParser.prototype;

  _proto.construtor = function construtor() {
    this.onMIDISuccess = this.onMIDISuccess.bind(this);
    this.onMIDIFailure = this.onMIDIFailure.bind(this);
    this.onMIDIMessage = this.onMIDIMessage.bind(this);
    navigator.requestMIDIAccess().then(this.onMIDISuccess, this.onMIDIFailure);
  };

  _proto.onMIDISuccess = function onMIDISuccess(midiAccess) {
    var inputs = midiAccess.inputs.values();

    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      console.log('Connected:', input.value.name);
      input.value.onmidimessage = this.onMIDIMessage;
    }
  };

  _proto.onMIDIFailure = function onMIDIFailure(msg) {
    console.log("Failed to get MIDI access - " + msg);
  } // onNote(note, velocity) {
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
  ;

  _proto.onMIDIMessage = function onMIDIMessage(message) {
    var data = parseOPZMessage(message);
    console.log(data);
    return data;
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
  };

  return OPZParser;
}();

exports.OPZParser = OPZParser;
