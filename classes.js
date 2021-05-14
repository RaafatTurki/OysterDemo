class Segment {
  constructor(content, id, prefix, disabled) {
    this.content = content
    this.id = id
    this.prefix = prefix
    this.disabled = disabled
  }

  create() {
    let segment = document.createElement('div')
    segment.classList.add('segment')

    let prompt_prefix = document.createElement('span')
    prompt_prefix.classList.add('prompt_prefix')
    prompt_prefix.innerText = this.prefix

    let input = document.createElement('input')
    input.setAttribute('type', 'textarea')
    input.setAttribute('value', this.content)
    input.disabled = this.disabled

    let id_label = document.createElement('span')
    id_label.classList.add('id_label')
    id_label.innerText = this.id

    segment.appendChild(prompt_prefix)
    segment.appendChild(input)
    segment.appendChild(id_label)

    return segment
  }
}

class Frame {
  constructor(frame_type) {
    this.frame_type = frame_type
    this.segments_arr = []
    this.id = frames.length
  }

  insert_segment(content) {
    let seg_id = `${this.id}${SEGMENT_ID_NAMES[this.segments_arr.length]}`
    let seg_disabled = true

    switch (this.frame_type) {
      case FrameTypes.STDIN:
        seg_disabled = false
        // TODO: disable segments inputs if frametype is not active STDIN
        break
      case FrameTypes.STDOUT:
        break
      case FrameTypes.STDERR:
        break
      default:
        console.log('Invalid FrameType')
    }

    let seg_prefix = this.segments_arr.length ? '|' : ''
    let seg = new Segment(content, seg_id, seg_prefix, seg_disabled).create()
    this.segments_arr.push(seg)
    return seg
  }

  create() {
    let frame = document.createElement('div')
    frame.classList.add('frame')

    switch (this.frame_type) {
      case FrameTypes.STDIN:
        frame.classList.add(this.frame_type)
        break
      case FrameTypes.STDOUT:
        frame.classList.add(this.frame_type)
        break
      case FrameTypes.STDERR:
        frame.classList.add(this.frame_type)
        break
      default:
        console.log('Invalid FrameType')
    }

    this.segments_arr.forEach((seg, i) => {
      frame.appendChild(seg)
    })

    return frame
  }
}

class CommandReturn {
  stdout = ''
  stderr = ''
  exit_code = 0

  set_stdout(content) {
    this.stdout = content
    return this
  }

  set_stderr(content) {
    this.stderr = content
    return this
  }

  set_exit_code(code) {
    this.exit_code = code
    return this
  }
}
