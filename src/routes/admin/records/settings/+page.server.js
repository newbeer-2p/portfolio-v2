import { formDataToObject } from "$lib/utils/actions.js";
import { getLanguages, getSoftwares, writeFile } from "@applayer";
import axios from "axios";

export async function load() {
  const languages = await getLanguages()
  const softwares = await getSoftwares()

  return {
    languages,
    softwares
  }
}

export const actions = {
  save: async ({ request }) => {
    const data = formDataToObject(await request.formData())
    let dataURL = ""
    let fileName = ""
    if (data.type == "upload") {
      dataURL = data.dataURL
      fileName = `${data.name}.${data.fileType.split("/")[1]}`
    }
    else if (data.type == "link") {
      const response = await axios.get(data.link, {
        responseType: 'arraybuffer',
        responseEncoding: 'binary'
      })
      const mimeType = response.headers["content-type"]
      fileName = `${data.name}.${mimeType.split("/")[1]}`
      dataURL = "data:" + mimeType + ";base64," + Buffer.from(response.data).toString('base64')
    }
    if (dataURL !== "") {
      writeFile(fileName, dataURL, `/${data.path}`)
    }
  }
}