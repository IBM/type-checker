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
   * @param {*} data Data to send in message.
   */
  constructor(type, data) {
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
   * @return {Promise}
   */
  send() {
    new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(this.toJSON(), (error, result) => {
        if (error) reject(error);
        resolve(result);
      })
    });
  }
}

export default Message;