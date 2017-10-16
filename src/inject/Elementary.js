class Elementary {

  /**
   * Creates a namespaced Element object with attributes and children.
   * 
   * @param {string} [namespace=] The namespace of the tag to create. 
   * @param {string} name The name of the tag to create. 
   * @param {Object<string, string|number|function>} [attrs={}] Object of attributes to add to the
   * element.
   * @param {...Element} children All of the children to append to the element.
   * @returns {Element} The newly created object.
   */
  static createElementNS (namespace, name, attrs={}, ...children) {
    const elem = namespace
      ? document.createElementNS(namespace, name)
      : document.createElement(name);
    
    Elementary.setAttrs(elem, attrs);
    Elementary.appendChildren(elem, ...children);
    return elem;
  }

  /**
   * Creates an Element object with attributes and children.
   * 
   * @param {string} name The name of the tag to create. 
   * @param {Object<string, string|number|function>} attrs Object of attributes to add to the
   * element.
   * @param {...Element} children All of the children to append to the element.
   * @returns {Element} The newly created object.
   */
  static createElement (name, attrs = {}, ...children) { 
    return Elementary.createElementNS(null, name, attrs, ...children);
  }

  /**
   * Creates an SVG Element object with attributes and children.
   * 
   * @param {string} name The name of the SVG tag to create. 
   * @param {Object<string, string|number|function>} attrs Object of attributes to add to the
   * element.
   * @param {...Element} children All of the children to append to the element.
   * @returns {Element} The newly created object.
   */
  static createSVGElement (name, attrs = {}, ...children) { 
    return Elementary.createElementNS('http://www.w3.org/2000/svg', name, attrs, ...children);
  }
  
  /**
   * Sets a set of attributes onto the given element.
   * 
   * @param {Element} elem The element to set the attributes to.
   * @param {Object<string, string|number|function>} attrs Object of attributes to set.
   */
  static setAttrs (elem, attrs = {}) {
    Object.keys(attrs).forEach(key => {
      const value = attrs[key];
      
      // If the attribute starts with 'on', then create an event listener for this attribute.
      if (key.substr(0, 2) === 'on') {
        return Elementary.on(elem, key.substr(2), value);
      }
      
      // If the attribute name is 'className' replace the name to 'class'.
      const attr = (key === 'className')
        ? 'class'
        : key;
      elem.setAttribute(attr, value);
    });
  }
  
  /**
   * Appends Elements or strings to the given element as children.
   * 
   * @param {Element} elem The element to append children on to.
   * @param {...Element|*} children The elements to append.
   */
  static appendChildren (elem, ...children) {
    children.forEach(child => {
      const node = !(child instanceof Element)
        ? document.createTextNode(child) 
        : child;
      elem.appendChild(node);
    });
  }
  
  /**
   * Adds an event listener to the given element.
   * 
   * @param {Element} elem Element to add event listener to.
   * @param {string} eventType The type of event to listen to.
   * @param {Function} handler The function to call when the event has been triggered.
   */
  static on (elem, eventType, handler) {
    if (typeof handler !== 'function') {
      throw new TypeError(`${handler} must be to a function`);
    }

    elem.addEventListener(eventType, handler);
  }

  /**
   * Clears an element for all of its children.
   * 
   * @param {Element} parent The element to clear from its children.
   */
  static clear (parent) {
    while(parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}