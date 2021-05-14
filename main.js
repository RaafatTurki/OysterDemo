let frames = []
let terminal = document.getElementById('terminal')

let active_prompt_segment = document.querySelector('#active_prompt_segment')
let active_prompt_input = active_prompt_segment.querySelector('input[type="text"]')

attach_event_listener(active_prompt_input, 'keydown', e => {
  if (e.keyCode == 13) {
    process_stdin_command()
  }
})

function process_stdin_command() {
  let commands_chain = active_prompt_input.value.split('|')
  let last_stdout = ''
  let frame_obj = new Frame(FrameTypes.STDOUT)

  commands_chain.forEach((cmd, i) => {
    Object.keys(INSTALLED_BINARIES).forEach((bin, i) => {
      cmd_arr = cmd.trim().split(' ')
      if (cmd_arr[0] == bin) {
        cmd_arr.shift()
        let args = cmd_arr
        let cmd_ret = INSTALLED_BINARIES[bin](last_stdout, args)
        if (cmd_ret.exit_code) {
          console.log(`thing existed with ${cmd_ret.exit_code}`)
        }
        last_stdout = cmd_ret.stdout
        // console.log(cmd_ret.stderr)
        // console.log(last_stdout)
        frame_obj.insert_segment(last_stdout)
      }
    })
  })

  let frame = frame_obj.create()
  terminal.appendChild(frame)
  frames.push(frame)
}

// function update_frames() {
// }
