
export default {
  filters: {
    format(val) {
      if (typeof val === 'string') {
        const num = val.slice(1);
        return val.slice(0, 1) + (+num).toLocaleString()
      } else {
        return val.toLocaleString();
      }
    }
  }
}