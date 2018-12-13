export default {
  bind(el, binding, vNode) {
    // Provided expression must evaluate to a function.
    if (typeof binding.value !== "function") {
      const compName = vNode.context.name;
      let warn = `[Click-outside:] provided expression '${
        binding.expression
      }' is not a function, but has to be`;
      if (compName) {
        warn += `Found in component '${compName}'`;
      }

      console.warn(warn);
    }

    el.__ClickOutsideHandler__ = event => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener("click", el.__ClickOutsideHandler__);
  },
  unbind(el) {
    document.body.removeEventListener("click", el.__ClickOutsideHandler__);
    delete el.__ClickOutsideHandler__;
  }
};
