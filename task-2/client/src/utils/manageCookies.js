const setCookie = (name, value, time, path = '/') => {
  const expires = new Date(Date.now() + time).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}`;
};

const getCookie = name => document.cookie.split('; ').reduce((r, v) => {
  const parts = v.split('=');
  return parts[0] === name ? decodeURIComponent(parts[1]) : r;
}, '');

const deleteCookie = (name, path = '/') => {
  setCookie(name, '', -1, path);
};


export const cookies = {
  set: setCookie,
  get: getCookie,
  delete: deleteCookie,
};
