export const setStorageContent = (key: string, content: string) => {
  saveContent(key, content);
};

function saveContent(key: string, content: string) {
  sessionStorage.setItem(key, content);
}

export const getStorageContent = (key: string) => {
  return recoverContent(key);
};

function recoverContent(key: string) {
  return sessionStorage.getItem(key);
}

export const removeStorageContent = (key: string) => {
  return removeContent(key);
};

function removeContent(key: string) {
  return sessionStorage.removeItem(key);
}
