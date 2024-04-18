import { createRecord } from '$lib/server/record/record.js';
import { formDataToObject } from '$lib/utils/actions.js';

export const actions = {
  default: async ({ request }) => {
    const data = formDataToObject(await request.formData())
    const record = await createRecord(data)
    return {
      created: true,
      no_: record.no_,
      message: `สร้างผลงานเลขที่ ${record.no_} สำเร็จ`
    }
  }
}