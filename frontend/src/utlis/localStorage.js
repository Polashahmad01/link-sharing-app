export const addToLocalStorage = (keyName, data) => {
  if (!localStorage.getItem(keyName)) {
    return localStorage.setItem(keyName, JSON.stringify(data));
  }
};

export const getFromLocalStorage = (keyName) => {
  return JSON.parse(localStorage.getItem(keyName));
};

export const clearFromLocalStorage = (keyName) => {
  return localStorage.removeItem(keyName);
};
