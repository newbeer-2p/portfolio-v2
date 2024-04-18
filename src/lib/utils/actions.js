/**
 * 
 * @param {FormData} formData 
 * @returns {Record<string, *>}
 */
export function formDataToObject(formData) {
  const entries = Object.fromEntries(formData.entries())
  const keys = Object.keys(entries);
  return keys.reduce((obj, key) => {
    const d = formData.getAll(key);
    if (d.length == 1) {
      const value = d[0].toString()
      try {
        if (value == "false")
          obj[key] = false
        else if (value == "on")
          obj[key] = true
        else if (d[0] instanceof File)
          obj[key] = d[0]
        else
          obj[key] = JSON.parse(value)
      } catch (err) {
        obj[key] = value
      }
    }
    else obj[key] = d
    return obj;
  }, {});
}
