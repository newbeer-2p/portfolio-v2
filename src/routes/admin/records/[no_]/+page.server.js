import { deleteRecord, updateRecord } from '$lib/server/record/record.js'
import { formDataToObject } from '$lib/utils/actions.js'
import { getRecord } from '@applayer'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
  const record = await getRecord({no_: params.no_})
  if (record == undefined) throw error(404)
  return {
    record
  }
}

export const actions = {
  submit: async ({ request }) => {
    try {
      const formData = await request.formData()
      let data = formDataToObject(formData)
      await updateRecord(data.id, data)
      return {
        success: true,
        message: `บันทึกผลงานเลขที่ ${data.no_} เรียบร้อย`
      }
    } catch (err) {
      console.log("submit err:", err);
      return {
        success: false,
        message: "บันทึกข้อมูลผิดพลาด กรุณาลองใหม่"
      }
    }
  },
  delete: async ({ request }) => {
    const data = formDataToObject(await request.formData())
    const record = await deleteRecord(data.id)
    return {
      deleted: true,
      message: `ลบผลงานเลขที่ ${record.no_} เรียบร้อย`
    }
  }
}