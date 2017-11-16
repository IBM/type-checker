import Message, { TYPE } from './Message';
import TypeChecker from './TypeChecker';

const typeChecker = new TypeChecker();

chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case TYPE.request_report: {
      // run check here.
      const check = typeChecker.run();

      new Message(TYPE.send_report, JSON.stringify(check))
        .send()
        // .then('Type report sent');
    }
  }
});

