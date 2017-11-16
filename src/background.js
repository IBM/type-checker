import Message, { TYPE } from './Message';
import Popup from './Popup';

chrome.browserAction.onClicked.addListener(tab => {
  new Popup().create()
  .then(
    new Message(TYPE.request_report)
      .sendToTab(tab)
      .then(console.info('Type report requested'))
  )
});