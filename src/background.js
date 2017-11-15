import Message, { TYPE } from './Message';

console.log(TYPE);

chrome.browserAction.onClicked.addListener(data => {
  console.log(data);
  new Message(TYPE.request_report).send();
});