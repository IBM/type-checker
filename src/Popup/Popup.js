class Popup {
  constructor(options) {
    this.options = Object.assign(Popup.defaultOptions, options);
    return this;
  }

  create() {
    return new Promise((resolve, reject) => {
      try {
        chrome.windows.create(this.options, result => resolve(result));
      } catch (error) {
        reject(error);
      }
    });
  }

  static get defaultOptions () {
    return {
      width: 400,
      height: 300,
      url: './Popup/popup.html',
      type: 'panel',
    }
  }
}

export default Popup;