/**
 * 设置缓存
 * @param name localStorage的key
 * @param data localStorage的Value
 * @param expire localStorage的过期小时, 默认是不过期
 */
const localStorageSet = (name: string, data: any, expire: number = 0) => {
  expire =
    expire === 0 ? expire : new Date().getTime() + expire * 60 * 60 * 1000;
  const obj = {
    data,
    expire,
  };
  localStorage.setItem(name, JSON.stringify(obj));
};

//读取缓存
const localStorageGet = (name: string) => {
  const storage = localStorage.getItem(name);
  const time = new Date().getTime();

  let result = {};
  if (storage) {
    const obj = JSON.parse(storage);
    if (obj.expire === 0 || time < obj.expire) {
      result = obj.data;
    } else {
      localStorageRemove(name);
    }
  }
  return result as any;
};

const localStorageClear = () => {
  localStorage.clear();
};

const localStorageRemove = (name: string) => {
  localStorage.removeItem(name);
};

export {
  localStorageSet,
  localStorageGet,
  localStorageClear,
  localStorageRemove,
};
