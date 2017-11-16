import { TYPE } from './Message';

chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case TYPE.send_report: {
      document.body.innerHTML = message.data;
    }
  }
});
