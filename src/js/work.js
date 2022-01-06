export default class Work {
  static messHTML(obj, time) {
    return `
      <div class="row mess-user">
        <div class="element el-user">
          <div class="mess-user-body data-type=${obj.type}">
            <span>${obj.content}</span>
          </div>   
          <div class="time-stp">
            <span>${time}</span>
          </div> 
        </div> 
      </div>
    `;
  }

  static createLink(str, arrLink) {
    const strArr = str.split(' ');
    console.log(strArr);
    for (let i = 0; i < strArr.length; i += 1) {
      const index = arrLink.indexOf(strArr[i]);
      if (index !== -1) {
        const newStr = `<a href="${arrLink[index]}" class="mess-link" target="_blank">${arrLink[index]}</a>`;
        strArr[i] = newStr;
      }
    }
    return strArr.join(' ');
  }
}
