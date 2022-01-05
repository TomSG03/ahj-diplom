export default class Chat {
  constructor(domElmt) {
    this.domElmt = domElmt;
  }

  btnTest() {
    const row = this.domElmt.querySelector('.content-row');
    row.scrollTop = row.scrollHeight;

    const button = this.domElmt.querySelector('.buttonAsk');
    button.addEventListener('click', (e) => {
      const ask = document.querySelector('.input-field');
      if (ask.value !== '') {
        const t = `<div class="row mess-user">
               <div class="element el-user">
                  <span>${ask.value}</span>
                </div> 
              </div>`;
        row.innerHTML += t;
        row.scrollTop = row.scrollHeight;
        ask.value = '';
        e.preventDefault();
      }
    });
  }
}
