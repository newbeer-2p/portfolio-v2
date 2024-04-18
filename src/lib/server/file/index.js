import fs from "fs"

/**
 * @param {string} name 
 * @param {string} dataURL 
 * @param {string} destination 
 */
export function writeFile(name, dataURL, destination="/.") {
  fs.writeFileSync(`static${destination}/${name}`, Buffer.from(dataURL.split(",")[1], 'base64'))
}