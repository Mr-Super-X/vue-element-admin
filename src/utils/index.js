//util公共配置方法入口文件

export default {
  //方法定义在此处，例如：

  // 处理价格 2位小数
  handlePricePlus(value) {
    let sNum = value.toString(); //先转换成字符串类型
    if (sNum.indexOf('.') == 0) { //第一位就是 .
      console.log('first str is .')
      sNum = '0' + sNum
    }
    sNum = sNum.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
    sNum = sNum.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    sNum = sNum.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    sNum = sNum.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
    //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    if (sNum.indexOf(".") < 0 && sNum != "") {
      sNum = parseFloat(sNum);
    }
    return sNum
  },

  // 验证身份证
  checkID(ID) {
    if (typeof ID !== 'string') return '非法字符串';
    let city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
    let birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
    let d = new Date(birthday);
    let newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
    let currentTime = new Date().getTime();
    let time = d.getTime();
    let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let sum = 0,
      i, residue;

    if (!/^\d{17}(\d|x)$/i.test(ID)) return '非法身份证';
    if (city[ID.substr(0, 2)] === undefined) return "非法地区";
    if (time >= currentTime || birthday !== newBirthday) return '非法生日';
    for (i = 0; i < 17; i++) {
      sum += ID.substr(i, 1) * arrInt[i];
    }
    residue = arrCh[sum % 11];
    if (residue !== ID.substr(17, 1)) return '非法身份证哦';
    let info = city[ID.substr(0, 2)] + "," + birthday + "," + (ID.substr(16, 1) % 2 ? " 男" : "女")
    return true
  },

  // 验证邮箱
  isEmail(val) {
    let myreg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/
    return myreg.test(val)
  },
}
