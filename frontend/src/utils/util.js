export const setActiveToFalse = (obj, id) => {
  Object.keys(obj).forEach((key) => {
    if (key === 'id' && obj[key] === id) {
      obj.active = false;
    } else if (typeof obj[key] === 'object') {
      setActiveToFalse(obj[key], id);
    }
  });
};
