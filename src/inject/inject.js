(function (window) {
  /**
   * The class prefix for all CSS classes in the UI.
   * 
   * @type {String}
   */
  const CLASS_PREFIX = 'ibm_type-checker';

  /**
   * The base font size of the document.
   * 
   * @type {Number}
   */
  const BASE_FONT_SIZE = (
    parseFloat(window.getComputedStyle(document.documentElement).fontSize, 10) || 16
  );

  /**
   * Set of added IBM IDs.
   * 
   * @type {String[]}
   */
  let GENERATED_IDS = [];

  /**
   * The types of alerts.
   * 
   * @enum {String}
   */
  const ALERT_TYPE = {
    error: 'error',
    warning: 'warning',
  };

  /**
   * The class name used to apply error styles.
   * 
   * @type {String}
   * @const
   */
  const ERROR_CLASS_NAME = `${CLASS_PREFIX}__error`;
  
  /**
   * The class name used to apply warning styles.
   * 
   * @type {String}
   * @const
   */
  const WARNING_CLASS_NAME = `${CLASS_PREFIX}__warning`;
  
  /**
   * Set of established breakpoints for minimum window widths in pixels.
   * 
   * @enum
   */
  const BREAKPOINTS = {
    SM: 320,
    MD: 640,
    LG: 1056,
    MAX: 1650,
  };
  
  /**
   * Base type scale in ems.
   * 
   * @type {Number[]}
   * @const
   */
  const BASE_EMS_SCALE = [0, .75, .875, 1, 1.125, 1.25, 1.5, 1.75, 2, 2.25, 2.625, 3, 3.375, 3.75, 
    4.25, 4.75, 5.25, 5.75, 6.375, 7, 7.625, 7.25, 9, 9.75, 10.5];
    
  /**
   * Static type scale in pixels.
   * 
   * @type {Number[]}
   * @const
   */
  const STATIC_SCALE = BASE_EMS_SCALE.map(remToPx);
    
  /**
   * An array of type size objects that contain information about how different type sizes adjust
   * based on how wide the window is.
   * 
   * @type {Object[]}
   */
  const FLUID_SCALE = [
    // A
    {
      BASE: BASE_EMS_SCALE[1],
      SM: function () { return remToPx(this.BASE); },
      MD: function () { return remToPx(this.BASE); },
      LG: function () { return fluidType(this.BASE, this.MAX, BREAKPOINTS.LG, BREAKPOINTS.MAX); },
      MAX: BASE_EMS_SCALE[3],
    },
    
    // B
    {
      BASE: BASE_EMS_SCALE[1],
      SM: function () { return remToPx(this.BASE); },
      MD: function () { return remToPx(this.BASE); },
      LG: function () { return fluidType(this.BASE, this.MAX, BREAKPOINTS.LG, BREAKPOINTS.MAX); },
      MAX: BASE_EMS_SCALE[3],
    },
    
    // C
    {
      BASE: BASE_EMS_SCALE[2],
      SM: function () { return remToPx(this.BASE); },
      MD: function () { return remToPx(this.BASE); },
      LG: function () { return fluidType(this.BASE, this.MAX, BREAKPOINTS.LG, BREAKPOINTS.MAX); },
      MAX: BASE_EMS_SCALE[4],
    },
    
    // D
    {
      BASE: BASE_EMS_SCALE[3],
      SM: function () { return remToPx(this.BASE); },
      MD: function () { return remToPx(this.BASE); },
      LG: function () { return fluidType(this.BASE, this.MAX, BREAKPOINTS.LG, BREAKPOINTS.MAX); },
      MAX: BASE_EMS_SCALE[4],
    },
    
    // E
    {
      BASE: BASE_EMS_SCALE[3],
      SM: function () { return remToPx(this.BASE); },
      MD: function () { return remToPx(this.BASE); },
      LG: function () { return fluidType(this.BASE, this.MAX, BREAKPOINTS.LG, BREAKPOINTS.MAX); },
      MAX: BASE_EMS_SCALE[5],
    },
    
    // F
    {
      BASE: BASE_EMS_SCALE[4],
      SM: function () { return fluidType(this.BASE, BASE_EMS_SCALE[5], BREAKPOINTS.SM, BREAKPOINTS.MD); },
      MD: function () { return remToPx(BASE_EMS_SCALE[5]) },
      LG: function () { return fluidType(BASE_EMS_SCALE[5], this.MAX, BREAKPOINTS.LG, BREAKPOINTS.MAX); },
      MAX: BASE_EMS_SCALE[6],
    },
    
    // G
    {
      BASE: BASE_EMS_SCALE[5],
      SM: function () { return fluidType(this.BASE, BASE_EMS_SCALE[6], BREAKPOINTS.SM, BREAKPOINTS.MD); },
      MD: function () { return remToPx(BASE_EMS_SCALE[6]) },
      LG: function () { return fluidType(BASE_EMS_SCALE[6], this.MAX, BREAKPOINTS.LG, BREAKPOINTS.MAX); },
      MAX: BASE_EMS_SCALE[8],
    },
    
    // H
    {
      BASE: BASE_EMS_SCALE[6],
      SM: function () { return remToPx(this.BASE); },
      MD: function () { return fluidType(this.BASE, BASE_EMS_SCALE[7], BREAKPOINTS.MD, BREAKPOINTS.LG); },
      LG: function () { return fluidType(BASE_EMS_SCALE[7], this.MAX, BREAKPOINTS.LG, BREAKPOINTS.MAX); },
      MAX: BASE_EMS_SCALE[8],
    },
    
    // I
    {
      BASE: BASE_EMS_SCALE[7],
      SM: function () { return fluidType(this.BASE, BASE_EMS_SCALE[8], BREAKPOINTS.SM, BREAKPOINTS.MD); },
      MD: function () { return fluidType(BASE_EMS_SCALE[8], BASE_EMS_SCALE[9], BREAKPOINTS.MD, BREAKPOINTS.LG); },
      LG: function () { return fluidType(BASE_EMS_SCALE[9], this.MAX, BREAKPOINTS.LG, BREAKPOINTS.MAX); },
      MAX: BASE_EMS_SCALE[10],
    },
    
    // J
    {
      BASE: BASE_EMS_SCALE[7],
      SM: function () { return fluidType(this.BASE, BASE_EMS_SCALE[9], BREAKPOINTS.SM, BREAKPOINTS.MD); },
      MD: function () { return fluidType(BASE_EMS_SCALE[9], BASE_EMS_SCALE[10], BREAKPOINTS.MD, BREAKPOINTS.LG); },
      LG: function () { return fluidType(BASE_EMS_SCALE[10], this.MAX, BREAKPOINTS.LG, BREAKPOINTS.MAX); },
      MAX: BASE_EMS_SCALE[13],
    },
    
    // K
    {
      BASE: BASE_EMS_SCALE[10],
      SM: function () { return fluidType(this.BASE, BASE_EMS_SCALE[14], BREAKPOINTS.SM, BREAKPOINTS.MD); },
      MD: function () { return fluidType(BASE_EMS_SCALE[14], BASE_EMS_SCALE[23], BREAKPOINTS.MD, BREAKPOINTS.LG); },
      LG: function () { return fluidType(BASE_EMS_SCALE[23], this.MAX, BREAKPOINTS.LG, BREAKPOINTS.MAX); },
      MAX: BASE_EMS_SCALE[24],
    },
    
    // L
    {
      BASE: BASE_EMS_SCALE[10],
      SM: function () { return fluidType(this.BASE, BASE_EMS_SCALE[14], BREAKPOINTS.SM, BREAKPOINTS.MD); },
      MD: function () { return fluidType(BASE_EMS_SCALE[14], BASE_EMS_SCALE[23], BREAKPOINTS.MD, BREAKPOINTS.LG); },
      LG: function () { return fluidType(BASE_EMS_SCALE[23], this.MAX, BREAKPOINTS.LG, BREAKPOINTS.MAX); },
      MAX: BASE_EMS_SCALE[24],
    },
  ];

  /**
   * Close icon SVG.
   * 
   * @type {Element}
   */
  const CLOSE_ICON = Elementary.createSVGElement('svg', {
    viewBox: '0 0 28 28',
  }, Elementary.createSVGElement('path', {
    d: `M14 2c6.6 0 12 5.4 12 12s-5.4 12-12 12S2 20.6 2 14 7.4 2 14 2zm0-2C6.3 0 0 6.3 0 
    14s6.3 14 14 14 14-6.3 14-14S21.7 0 14 0z M19.7 9.7l-1.4-1.4-4.3 4.3-4.3-4.3-1.4 1.4 4.3 
    4.3-4.3 4.3 1.4 1.4 4.3-4.3 4.3 4.3 1.4-1.4-4.3-4.3`,
  }));
    
  /**
   * State for whether the type size errors are displayed.
   * 
   * @type {Boolean}
   */
  let appIsActive = false;

  let scrollAnimation;

  /* ==============
  FUNCTIONS
  ============== */
    
  const debounceRefresh = debounce(refreshApp, 100);
    
  /**
   * Activates the type checker by checking the font sizes of all of the text on the document body
   * and displaying any type size related alerts.
   */
  function activateApp () {
    showTypeSizeAlerts(document.body);
      
    // Listen to window resizing to re-calculate the fluid type scales since they are dependent on 
    // the window size.
    window.addEventListener('resize', debounceRefresh);

    window.addEventListener('keyup', evt => {
    });

    console.log('IBM Type Checker is now active');
    appIsActive = true;
  }

  /**
   * Deactivates the type checker by removing all of the warning styles applied to the document.
   */
  function deactivateApp () {
    removeTypeSizeAlerts(document.body);

    // Removes the resize listener since the user is no longer using the type checker.
    window.removeEventListener('resize', debounceRefresh);

    console.log('IBM Type Checker is now inactive');
    appIsActive = false;
  }

  /**
   * Refreshes the alerts displayed on the document by removing the existing ones and re-checking 
   * the document for type size related alerts. This is used to handle the resizing of the window
   * because the fluid type scale is dependent on the window width.
   */
  function refreshApp () {
    const { body } = document;
    removeTypeSizeAlerts(body);
    showTypeSizeAlerts(body);
  }

  /**
   * Calculates the fluid type size in pixels based on the window width that will be used to compare 
   * against when checking if text on the document is compliant with the fluid type scale.
   * 
   * @param {Number} minSize The minimum size the font-size can be.
   * @param {Number} maxSize The maximum size the font-size can be.
   * @param {Number} minViewport The minimum window width from a given breakpoint.
   * @param {Number} maxViewport The maximum window width from the same given breakpoint.
   * @returns {Number} The calculated fluid type size in pixels.
   */
  function fluidType(minSize, maxSize, minViewport, maxViewport) {
    const width = window.innerWidth;
    return (
      (minSize * BASE_FONT_SIZE) + 
      ((maxSize - minSize) * BASE_FONT_SIZE / (maxViewport - minViewport)) * 
      (width - minViewport)
    );
  }

  /**
   * Searches for type size related alerts of font sizes that are either not using the fluid type
   * scale or the static scale at all. Not following either scale will be displayed as an error, and
   * following the static scale but not the fluid one will be displayed as a warning.
   * 
   * @param {HTMLElement} root The HTML element to find type size related alerts within.
   */
  function showTypeSizeAlerts (root) {
    const alerts = findSizingAlerts(root);
    createUI(root, alerts);
    alerts.error.forEach(styleAsError);
    alerts.warning.forEach(styleAsWarning);
  }

  /**
   * Create the UI elements and appends it to the given root.
   * 
   * @param {Element} root The HTML element to create the UI in.
   * @param {{ warning: Element[], error: Element[] }} alerts Object of alerts to highlight in
   * UI.
   */
  function createUI (root, alerts) {
    let x = 0, 
    y = 0,
    offsetX = 0,
    offsetY = 0,
    windowWidth = 0,
    windowHeight = 0,
    uiWidth = 0,
    uiHeight = 0;

    const closeButton = Elementary.createElement('button', {
      className:  `${CLASS_PREFIX}__close`,
      onclick: deactivateApp,
    }, 'Close IBM Type Checker', CLOSE_ICON);

    const header = Elementary.createElement('header', {
      className: `${CLASS_PREFIX}__drag-area`,
    }, 'IBM Type Checker', closeButton);

    const report = Elementary.createElement('div', {
      className: `${CLASS_PREFIX}__report`,
    }, 
      createReportList(alerts.error, ALERT_TYPE.error, root), 
      createReportList(alerts.warning, ALERT_TYPE.warning, root)
    );

    const ui = Elementary.createElement('div', {
      className: `${CLASS_PREFIX}__ui ${!appIsActive ? `${CLASS_PREFIX}__ui--animate`: ''}`,
    }, header, report);
    
    const container = Elementary.createElement('div', {
      className: CLASS_PREFIX,
    }, ui);
    
    // Event handlers
    const startDrag = ({ pageX, pageY }) => {
      const { top, left, width, height } = ui.getBoundingClientRect();
      const { innerWidth, innerHeight } = window;
      offsetX = pageX - left;
      offsetY = pageY - top;
      uiWidth = width;
      uiHeight = height;
      windowWidth = innerWidth;
      windowHeight = innerHeight;
      
      container.addEventListener('mousemove', drag);
      container.addEventListener('mouseup', endDrag);
    };
    
    const drag = ({ pageX, pageY }) => {
      ui.style.left = `${Math.max(0, Math.min((pageX - offsetX), (windowWidth - uiWidth)))}px`;
      ui.style.top = `${Math.max(0, Math.min((pageY - offsetY), (windowHeight - uiHeight)))}px`;
    };
    
    const endDrag = evt => { 
      container.removeEventListener('mousemove', drag);
      container.removeEventListener('mouseup', endDrag);
    };
    
    // Add initial event listener.
    header.addEventListener('mousedown', startDrag);

    // Append all of the extension UI to the root.
    root.appendChild(container);
  }

  /**
   * Creates a report list for a given type of element alerts.
   * 
   * @param {Elements[]} elements The elements to make a violation alert from. 
   * @param {ALERT_TYPE} alertType The type of alerts this report is going to have.
   * @param {Element} root The HTML element to create the report in.
   * @returns {Element} The container element that has all of the element alerts listed out.
   */
  function createReportList(elements, alertType, root) {
    const title = Elementary.createElement('h2', {
      className: `${CLASS_PREFIX}__section-title`,
    }, `${alertType}s: ${elements.length}`);

    const alerts = elements.map(element => {
      const elementText = Elementary.createElement('span', { 
        className: `${CLASS_PREFIX}__alert-text` 
      }, element.textContent);
      
      const metaContent = getElementMeta(element);
      const elementMeta = Elementary.createElement('div', { 
        className: `${CLASS_PREFIX}__alert-meta`,
      }, metaContent);

      const id = element.id || generateId();
      element.id = id;
      
      return Elementary.createElement('li', {
        className: `${CLASS_PREFIX}__item`,
      }, Elementary.createElement('a', {
        className: `${CLASS_PREFIX}__link ${CLASS_PREFIX}__link--${alertType}`,
        onmouseover: () => {
          root.classList.add(`${CLASS_PREFIX}--focus`);
          element.classList.add(`${CLASS_PREFIX}__${alertType}--active`);
        },
        onmouseleave: () => {
          root.classList.remove(`${CLASS_PREFIX}--focus`);
          element.classList.remove(`${CLASS_PREFIX}__${alertType}--active`);
        },
        onclick: evt => {
          evt.preventDefault();

          const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
          const { top } = element.getBoundingClientRect();
          const { innerHeight } = window;
          const middle = Math.round(innerHeight / 2);
          const targetPosition = Math.round((top + scrollTop) - middle);

          scrollTo(targetPosition);
        },
        href: `#${id}`,
      }, elementText, elementMeta));
    }
    );

    const list = Elementary.createElement('ul', {
      className: `${CLASS_PREFIX}__list`,
    }, ...alerts);

    const container = Elementary.createElement('section', { 
      className: `${CLASS_PREFIX}__section`,
    }, title, list)

    return container;
  }

  /**
   * Generates an ID string to add to any HTML element.
   * 
   * @returns {String} The generated ID.
   */
  function generateId () {
    const id = `${CLASS_PREFIX}-${Math.round(Date.now() * Math.random())}`;
    GENERATED_IDS.push(id);
    return id;
  }

  /**
   * Creates a string of Emmet style meta data of an element.
   * 
   * @param {Element} element The element to get meta data from.
   * @returns {String} The meta data of the element.
   */
  function getElementMeta (element) {
    let meta = '';
    
    if (element.className && element.className.length > 0) {
      meta += `.${element.className.split(' ').join('.')}`;
    }
    
    if (element.id && element.id.length > 0) {
      meta +=`#${element.id}`;
    }

    return meta;
  }

  /**
   * Scrolls the page to the given target position.
   * 
   * @param {number} targetPosition The position to scroll to.
   */
  function scrollTo (targetPosition) {
    if (scrollAnimation) {
      window.cancelAnimationFrame(scrollAnimation);
    }

    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    let currentScrollPosition = scrollTop;
    let distanceToScroll = targetPosition - currentScrollPosition;
    let easing;

    function step () {
      easing = 0.1 * distanceToScroll;
      currentScrollPosition += easing;
      distanceToScroll = targetPosition - currentScrollPosition;

      document.body.scrollTop = currentScrollPosition;
      document.documentElement.scrollTop = currentScrollPosition;
        
      if (Math.abs(currentScrollPosition - targetPosition) > 3) {
        scrollAnimation = window.requestAnimationFrame(step);
      }
    }

    if (distanceToScroll !== 0) {
      scrollAnimation = window.requestAnimationFrame(step);
    }
  }

  /**
   * Removes the UI, generated IDs, and styles of type scale errors revealed.
   * 
   * @param {HTMLElement} root The HTML element to remove type size related alerts within.
   */
  function removeTypeSizeAlerts (root) {
    // Remove the UI.
    const uis = Array.from(root.querySelectorAll(`.${CLASS_PREFIX}`))
      .forEach(ui => ui.parentNode.removeChild(ui));

    // Remove any generated IDs that have been added to the page.
    GENERATED_IDS.forEach(id => {
      const element = root.querySelector(`#${id}`);
      if (element) element.removeAttribute('id');
    });
    GENERATED_IDS = [];

    Array.from(root.querySelectorAll(`.${ERROR_CLASS_NAME}`))
      .forEach(el => {
        el.classList.remove(ERROR_CLASS_NAME);
        el.title = '';
      });

    Array.from(root.querySelectorAll(`.${WARNING_CLASS_NAME}`))
      .forEach(el => {
        el.classList.remove(WARNING_CLASS_NAME);
        el.title = '';
      });

    root.classList.remove(`${CLASS_PREFIX}--focus`);
  }

  /**
   * Gets the proper active breakpoint name based on the given width value.
   * 
   * @param {Number} width The width to check within which breakpoint it falls in.
   * @returns {String} The breakpoint name.
   */
  function getBreakpointName (width) {
    if (width < BREAKPOINTS.SM) return 'BASE';
    if (width < BREAKPOINTS.MD) return 'SM';
    if (width < BREAKPOINTS.LG) return 'MD';
    if (width < BREAKPOINTS.MAX) return 'LG';
    return 'MAX';
  }

  /**
   * From a given breakpoint create a function that takes in a font size object to determine the
   * proper font sizes given the current breakpoint.
   *
   * @param {String} breakpoint The breakpoint name to get a size of.
   * @return {(Object) => Number} A function that takes in a font size object and gets the
   * calculated fluid font size.
   */
  function getFontSizes (breakpoint) {
    return function (sizeObject) {
      switch(breakpoint) {
        case 'MAX':
          return remToPx(sizeObject.MAX);
        case 'LG':
          return (typeof sizeObject.LG === 'function') ? sizeObject.LG() : remToPx(sizeObject.LG);
        case 'MD':
          return (typeof sizeObject.MD === 'function') ? sizeObject.MD() : remToPx(sizeObject.MD);
        case 'SM':
          return (typeof sizeObject.SM === 'function') ? sizeObject.SM() : remToPx(sizeObject.SM);
        case 'BASE':
        default:
          return remToPx(sizeObject.BASE);
      };
    };
  }

  /**
   * Finds all of the elements that contains text that is not sized in accordance to IBM's Type 
   * Scales.
   * 
   * @param {HTMLElement} root The root element to check for type sizing alerts.
   * @returns {{ warning: HTMLElement[], error: HTMLElement[] }} An object containing separate lists
   * for elements to be presented as warnings and the others as errors.
   */
  function findSizingAlerts (root) {
    if (!root) throw ReferenceError('A root element must be supplied to check for sizing errors');

    const breakpoint = getBreakpointName(document.documentElement.clientWidth); 
    const currentTypeScale = FLUID_SCALE.map(getFontSizes(breakpoint));

    return Array.from(root.querySelectorAll('*'))

      // Flatten lists of child nodes into a flat array. All children in this array should be 
      // distinct HTML elements. This makes it easier to make calculations with all of the children.
      .reduce((allChildren, el) => allChildren.concat(Array.from(el.childNodes)), [])

      // Filter down to get the text nodes in the document that contain non-whitespace text.
      .filter(child => child.nodeType === 3)
      .filter(textNode => textNode.textContent.match(/\S/))

      // Get the text node's parent Element which will allow us to check for the text's computed font
      // size to test against the accepted type sizes.
      .map(textNode => textNode.parentNode)


      // Filter down to the elements that contain text that is not compliant with IBM's type scales.
      .reduce((report, el) => {
        const style = window.getComputedStyle(el);
        const fontSize = parseFloat(style.fontSize, 10);

        // Make sure that the current element is visible to the user.
        const isVisible = (
          (style.display !== 'none') 
          && (style.visibility !== 'hidden') 
          && (style.opacity > 0) 
          && (
            (parseInt(style.width, 10) > BASE_FONT_SIZE)
            && (parseInt(style.height, 10) > BASE_FONT_SIZE)
            && (style.overflow !== 'hidden')
          )
          && (typeof style.clip === 'string')
        );

        // Check if there is a fluid type scale match for the current window size.
        const fluidMatch = (
          currentTypeScale.filter(size => Math.abs(size - fontSize) < 0.25).length > 0
        );

        // Also check if there is a type scale match for the static type scale.
        const staticMatch = (STATIC_SCALE.indexOf(fontSize) > -1);

        if (isVisible && !fluidMatch) {
          // Warnings are for type sizes that are in the static type scale, but not in the fluid
          // one. Errors are for type sizes that are in neither.
          (staticMatch) ? report.warning.push(el) : report.error.push(el);
        }

        return report;
      }, { warning: [], error: [] });
  }

  /**
   * Translate a rem measurement into pixel.
   * 
   * @param {Number} size The rem measurement to translate.
   * @returns {Number} The translated pixel measurement.
   */
  function remToPx (size) {
    return (size * 16);
  }

  /**
   * Styles the element so that it stands out to warn the extension user that the element contains
   * text that is not sized according to IBM's Type scale specifications.
   * 
   * @param {HTMLElement} element 
   */
  function styleAsWarning (element) {
    // Add style to the wrongly sized text element.
    element.classList.add(WARNING_CLASS_NAME);
    element.title = `Computed font-size: ${window.getComputedStyle(element).fontSize}.`;
  }

  /**
   * Styles the element so that it stands out to warn the extension user that the element contains
   * text that is not sized according to IBM's Type scale specifications.
   * 
   * @param {HTMLElement} element 
   */
  function styleAsError (element) {
    // Add style to the wrongly sized text element.
    element.classList.add(ERROR_CLASS_NAME);
    element.title = `Computed font-size: ${window.getComputedStyle(element).fontSize}.`;
  }

  /**
   * Initialize app.
   */
  function init () {
    window.addEventListener('keydown', evt => {
      const { ctrlKey, keyCode } = evt;

      // Check if the user pressed ctrl and T.
      if (ctrlKey && (keyCode === 84)) {
        // Style this element in a way to warn the user that this text node is not compliant if the
        // application has just been activated. Otherwise remove existing clear error styles.
        (appIsActive === false) ? activateApp() : deactivateApp();
      }

      // Check if user pressed ESC.
      if ((appIsActive === true) && (evt.keyCode ===  27)) {
        deactivateApp();
      }
    });
  }

  init();
})(window);