/**
 * @file Message class.
 * @author Diego Hernandez <diego.hernandez@ibm.com>
 * @copyright IBM Design 2017.
 */

/**
 * Class to create consistent messages for communication between different scripts.
 * @class
 */
class Message {
  /**
   * Constructor for Message class.
   * @param {Message.Type} type Type of message to create.
   * @param {*} [data=''] Data to send in message.
   */
  constructor(type, data = '') {
    this.type = type;
    this.data = data;
    return this;
  }

  /**
   * Get a JSON representation of the message.
   * @returns {{ type: Message.Type, data: * }} The object representation of the Message.
   */
  toJSON() {
    return {
      type: this.type,
      data: this.data,
    }
  }

  /**
   * Sends message.
   */
  send() {
    return new Promise((resolve, reject) => {
      try {
        chrome.runtime.sendMessage(null, this.toJSON(), data => resolve(data));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Sends message to active tab.
   */
  sendToTab(tab) {
    return new Promise((resolve, reject) => {
      try {
        chrome.tabs.sendMessage(tab.id, this.toJSON(), data => resolve(data));
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default Message;