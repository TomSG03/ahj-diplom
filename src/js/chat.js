import Data from './data';
import Work from './work';

export default class Chat {
  constructor(domElmt) {
    this.domElmt = domElmt;
    this.message = {};
    this.row = this.domElmt.querySelector('.content-row');
  }

  btnTest() {
    this.row.addEventListener('click', (e) => {
      if (e.target.classList.contains('mess-img') && (e.target.dataset.type === 'image' || e.target.dataset.type === 'video')) {
        e.target.classList.toggle('big-img');
      }
    });

    this.domElmt.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    this.domElmt.addEventListener('drop', (e) => {
      e.preventDefault();
      e.target.style.cursor = '';
      for (let i = 0; i < e.dataTransfer.files.length; i += 1) {
        const reader = new FileReader();
        reader.readAsDataURL(e.dataTransfer.files[i]);
        reader.onloadend = () => {
          const img = document.createElement('img');
          img.className = 'mess-img';
          img.dataset.type = 'img';
          img.src = reader.result;
          this.message.type = 'img';
          this.message.content = img;
          const elm = Work.createElm(this.message, Data.getTime());
          this.row.append(elm);
          this.row.scrollTop = this.row.scrollHeight;
        };
      }
    });

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
        this.row.innerHTML += Work.messHTML(this.message, Data.getTime());
        this.row.scrollTop = this.row.scrollHeight;
        ask.value = '';
        e.preventDefault();
      }
      this.row.scrollTop = this.row.scrollHeight;
    });

    const clip = this.domElmt.querySelector('.clip');
    clip.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'audio/*, image/*, video/*';
      input.click();
      input.oninput = (e) => {
        const reader = new FileReader();
        const type = e.target.files[0].type.slice(0, 5);
        const typeElm = type === 'image' ? 'img' : type;

        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
          const media = document.createElement(typeElm);
          media.className = 'mess-img';
          media.dataset.type = type;
          media.src = reader.result;
          if (type !== 'image') {
            media.controls = true;
          }
          this.message.type = type;
          this.message.content = media;
          const elm = Work.createElm(this.message, Data.getTime());
          this.row.append(elm);
          this.row.scrollTop = this.row.scrollHeight;
        };
      };
    });
  }
}
