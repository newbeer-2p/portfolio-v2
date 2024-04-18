import { getAuthor, updateUser } from '$lib/server/user/user.js';
import { formDataToObject } from '$lib/utils/actions.js';

export async function load() {
  const author = await getAuthor()
  return {
    user: author
  };
}

export const actions = {
  update: async ({ request }) => {
    try {
      let data = formDataToObject(await request.formData());
      data.profileImageNo = data.imageURLs.indexOf(data.profileImageNo)
      console.log(data);
      // @ts-ignore
      await updateUser(data.id, data)
      return {
        success: true
      };
    } catch (err) {
      console.log("update err:", err)
      return {
        success: false
      }
    }
  },
};
