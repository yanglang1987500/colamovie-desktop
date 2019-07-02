export const type = <T>(obj: T) => {
  const type = Object.prototype.toString.call(obj);
  return type.substring(8, type.length - 1);
};

export const getParam = (key: string) => {
  const paramstr = location.href.split('?')[1];
  if (!paramstr) return null;
  const value = paramstr.split('&')
  .reduce((prev: any, current) => {
    const arr = current.split('=');
    prev[arr[0]] = arr[1];
    return prev;      
  }, {})[key];
  return value ? decodeURIComponent(value) : value;
};

export const isMac = () => /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);