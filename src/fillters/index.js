/**
 * 公共过滤器（调用及可能调用多次的过滤器）
 * 所有公用的过滤方法在此处自定义并且导出
 */


//例：
let formDate = time => {
  if(time) {
    return time.slice(5,16);
  }
}


//导出过滤器中自定义方法
export {
  formDate
}
