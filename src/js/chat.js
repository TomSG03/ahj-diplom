import Data from './data';
import Work from './work';

export default class Chat {
  constructor(domElmt) {
    this.domElmt = domElmt;
    this.message = {};
  }

  btnTest() {
    const row = this.domElmt.querySelector('.content-row');
    row.scrollTop = row.scrollHeight;

    const button = this.domElmt.querySelector('.buttonAsk');
    button.addEventListener('click', (e) => {
      const ask = document.querySelector('.input-field');
      if (ask.value !== '') {
        const url = Data.findURL(ask.value);
        if (url !== null) {
          this.message.type = 'link';
          this.message.content = Work.createLink(ask.value, url);
        } else {
          this.message.type = 'text';
          this.message.content = ask.value;
        }
        row.innerHTML += Work.messHTML(this.message, Data.getTime());
        row.scrollTop = row.scrollHeight;
        ask.value = '';
        e.preventDefault();
      }
    });
  }
}
