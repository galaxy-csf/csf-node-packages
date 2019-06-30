function isArrayOrObject(obj) {
  return Array.isArray(obj) || (typeof obj === 'object');
}

class Masker {
  constructor(strategy) {
    this.strategy = strategy;
  }

  mask(object) {
    if (object) {
      const cloneObj = JSON.parse(JSON.stringify(object));
      this.maskObj(cloneObj);
      return cloneObj;
    }
    return {};
  }

  maskObj(obj) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        if (isArrayOrObject(item)) {
          this.maskObj(item);
        }
      });
    } else if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (isArrayOrObject(value)) {
          this.maskObj(value);
        } else {
          obj[key] = this.maskItem(key, value); // eslint-disable-line
        }
      });
    }
  }

  maskItem(key, value) {
    if (Object.prototype.hasOwnProperty.call(this.strategy, key)) {
      return String(value).replace(this.strategy[key], x => '*'.repeat(x.length));
    }
    return value;
  }
}

export default Masker;
