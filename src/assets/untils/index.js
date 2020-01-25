
  export function UrlSearch() {
    let name, value, str = location.href,
      num = str.indexOf("?"); //取得整个地址栏
    str = str.substr(num + 1); //取得所有参数 stringvar.substr(start [, length ]
    let arr = str.split("&"); //各个参数放到数组里
    for (let i = 0; i < arr.length; i++) {
      num = arr[i].indexOf("=");
      if (num > 0) {
        name = arr[i].substring(0, num);
        value = arr[i].substr(num + 1);
        this[name] = value;
      }
    }
  }
  
   // 时间戳转换成时间
   export function timestampToTime(time) {
    var date = new Date(time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    var D = date.getDate() + ' '
    var h = date.getHours() + ':'
    var m = date.getMinutes() + ':'
    var s = date.getSeconds()
    return Y+M+D+h+m+s
  }


