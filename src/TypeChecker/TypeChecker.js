/**
 * @file Type checker.
 * @author Diego Hernandez <diego.hernandez@ibm.com>
 * @copyright IBM Design 2017.
 */

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
 * The variance value to account for calculation rounding differences for fluid type scale.
 * 
 * @type {number}
 */
const FLUID_TEST_VARIANCE = 0.25;

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
 * Translate a rem measurement into pixel.
 * 
 * @param {Number} size The rem measurement to translate.
 * @returns {Number} The translated pixel measurement.
 */
function remToPx (size) {
  return (size * 16);
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

class TypeChecker {
  /**
    * Finds all of the elements that contains text that is not sized in accordance to IBM's Type 
    * Scales.
    * 
    * @param {HTMLElement} root The root element to check for type sizing alerts.
    * @returns {{ warning: HTMLElement[], error: HTMLElement[] }} An object containing separate lists
    * for elements to be presented as warnings and the others as errors.
    */
  run(root = document.body) {
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
        const { fontFamily } = style;

        // Check that the font is not sans-serif or mono-spaced.
        const isSerif = !(!!(fontFamily.match(/sans/i)) || !!(fontFamily.match(/mono/i)));

        // Account for the fact that Plex serif fonts have to be 1px smaller than the others due to
        // optical inconsistencies.
        // TODO: Remove Serif patch once Plex has been updated with fixed optical consistency. 
        const fontSize = parseFloat(style.fontSize, 10) + (isSerif ? 1 : 0);

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
          currentTypeScale.filter(size => Math.abs(size - fontSize) < FLUID_TEST_VARIANCE).length > 0
        );

        // Also check if there is a type scale match for the static type scale.
        const staticMatch = (STATIC_SCALE.indexOf(fontSize) > -1);

        if (isVisible && !fluidMatch) {
          // Warnings are for type sizes that are in the static type scale, but not in the fluid
          // one. Errors are for type sizes that are in neither.
          (staticMatch) ? report.setError.push(el) : report.scaleError.push(el);
        } else {
          report.ok.push(el);
        }

        return report;
      }, { setError: [], scaleError: [], ok: [] });
  }
}

export default TypeChecker;