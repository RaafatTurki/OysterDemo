// constans and enums
const SEGMENT_ID_NAMES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const FrameTypes = {
  STDIN: 'stdin',
  STDOUT: 'stdout',
  STDERR: 'stderr',
}

const INSTALLED_BINARIES = {
  echo: (stdin, args) => new CommandReturn().set_stdout(args.join(' ')),
  sort: (stdin, args) => new CommandReturn().set_stdout(stdin.split(' ').sort().join(' ')),
  head: (stdin, args) => new CommandReturn().set_stdout(stdin.split(' ').slice(0, 10).join(' ')),
  tail: (stdin, args) => new CommandReturn().set_stdout(stdin.split(' ').slice(-10).join(' ')),
  rev: (stdin, args) => new CommandReturn().set_stdout(stdin.split('').reverse().join('')),
  date: (stdin, args) => {
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let d = new Date()
    return new CommandReturn().set_stdout(
      `${DAYS[d.getDay()]} ${MONTHS[d.getMonth()]} ${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
    )
  },
  grep: (stdin, args) => {
    new CommandReturn().set_stdout(
      stdin
        .split(' ')
        .filter(x => x.match(new RegExp(args)))
        .join(' ')
    )
  },
  sed: (stdin, args) => {
    const result = args.join('').match(/s\/(.*)\/(.*)\/(.*)/)
    if (result) {
      const [_, left, right, flags] = result
      const right_fixed = right.replace(/\\(\d)/, '$$1')
      return new CommandReturn().set_stdout(
        stdin
          .split('\n')
          .map(line => line.replaceAll(new RegExp(left, flags), right_fixed))
          .join('\n')
      )
    } else {
      return new CommandReturn().set_stdout("sed: Expression invalid, don't know what do to :<")
    }
  },
  // "figlet": (stdin, args) => figlet((stdin || args), (_, _) => {}),
}
