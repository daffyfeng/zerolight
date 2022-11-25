/**
 * 获取指定格式化的时间
 * @param value 需要格式化的日期数据
 * @param format 时间格式化格式，默认yyyy-MM-dd hh:mm:ss
 * @returns
 */
function formatDate(value: string | number, format = "yyyy-MM-dd hh:mm:ss") {
  const date = new Date(value);
  // 获取年份
  const year = date.getFullYear();

  if (/(y+)/.test(format)) {
    // 获取匹配组的内容
    const content = RegExp.$1;
    format = format.replace(content, year.toString().slice(4 - content.length));
  }

  const o = {
    // y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
  };

  for (const key in o) {
    // 构造动态正则
    const reg = new RegExp(`(${key}+)`);

    if (reg.test(format)) {
      // 获取匹配组的内容
      const content = RegExp.$1;
      const value = o[key as keyof typeof o];
      const k = value >= 10 ? value : content.length == 2 ? "0" + value : value;
      format = format.replace(content, k as string);
    }
  }
  return format;
}

export default formatDate;
