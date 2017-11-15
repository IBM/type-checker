/**
 * @file Message constants.
 * @author Diego Hernandez <diego.hernandez@ibm.com>
 * @copyright IBM Design 2017.
 */

/**
 * Types of messages to send.
 * @enum {string}
 * @typedef Message.Type
 */
export const TYPE = {
  // Request type check report.
  request_report: 'request_report',

  // Send type check report.
  send_report: 'send_report',

  // Send node to highlight.
  highlight_node: 'highlight_node',

  // Send node to remove highlight.
  remove_highlight_node: 'remove_highlight_node',
};

export default {
  TYPE,
};