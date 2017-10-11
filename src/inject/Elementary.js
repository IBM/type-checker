class Elementary {
  static createElement (name, attrs = {}, ...children) { 
    const elem = document.createElement(name);
    Elementary.setAttrs(elem, attrs);
    Elementary.appendChildren(elem, ...children);
    return elem;
  }
  
  static setAttrs (elem, attrs = {}) {
    Object.keys(attrs).forEach(key => {
      const value = attrs[key];
      
      if (key.substr(0, 2) === 'on') {
        return Elementary.on(elem, key.substr(2), value);
      }
      
      const attr = (key === 'className')
        ? 'class'
        : key;
      elem.setAttribute(attr, value);
    });
  }
  
  static appendChildren (elem, ...children) {
    children.forEach(child => {
      const node = (typeof child === 'string')
        ? document.createTextNode(child) 
        : child;
      elem.appendChild(node);
    });
  }
  
  static on (elem, eventType, handler) {
    if (typeof handler !== 'function') {
      throw new TypeError(`${handler} must be to a function`);
    }

    elem.addEventListener(eventType, handler);
  }
}