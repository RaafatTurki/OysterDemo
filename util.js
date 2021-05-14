function attach_event_listener(el, type, event_handler) {
  el.addEventListener(type, event_handler)
}

function exec(bin_name, args) {
  return INSTALLED_BINARIES[bin_name](args)
}
