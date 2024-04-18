<script>
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
	import Loading from '@components/Loading.svelte';
	import FormReport from '@components/form/FormReport.svelte';

  export let data, form
  
  $: if (browser && form) goto("/admin/author")
  
  /** @type {import('@components/form/InputForm.svelte').Inputs} */
  $: userInputs = {
      profileImageNo: {
        label: "รูปโปรไฟล์",
        type: "image-text",
        value: data.user.imageURLs[data.user.profileImageNo],
        class: "h-[500px]"
      },
      imageURLs: {
        label: "ลิงก์รูปทั้งหมด",
        type: "lists",
        value: data.user.imageURLs,
        class: "h-[500px]"
      },
      title: {
        label: "คำนำหน้า (ภาษาอังกฤษ)",
        type: "select",
        value: data.user.title,
        data: [
          {name: "Mr.", value: "mr."},
          {name: "Ms.", value: "ms."},
          {name: "Mrs.", value: "mrs."},
        ]
      },
      titleTH: {
        label: "คำนำหน้า (ภาษาไทย)",
        type: "select",
        value: data.user.titleTH,
        data: ["นาย", "นาง", "นางสาว"] 
      },
      firstName: {
        label: "ชื่อ (ภาษาอังกฤษ)",
        type: "text",
        value: data.user.firstName,
      },
      firstNameTH: {
        label: "ชื่อ (ภาษาไทย)",
        type: "text",
        value: data.user.firstNameTH,
      },
      lastName: {
        label: "นามสกุล (ภาษาอังกฤษ)",
        type: "text",
        value: data.user.lastName,
      },
      lastNameTH: {
        label: "นามสกุล (ภาษาไทย)",
        type: "text",
        value: data.user.lastNameTH,
      },
      nickname: {
        label: "นามสกุล (ภาษาอังกฤษ)",
        type: "text",
        value: data.user.nickname,
      },
      nicknameTH: {
        label: "นามสกุล (ภาษาไทย)",
        type: "text",
        value: data.user.nicknameTH,
      },
      birthday: {
        label: "วันเกิด",
        type: "date",
        value: `${data.user.birthday.getFullYear()}-${(data.user.birthday.getMonth() + 1).toString().padStart(2, '0')}-${data.user.birthday.getDate().toString().padStart(2, '0')}`,
      },
      description: {
        label: "คำอธิบาย (ภาษาอังกฤษ)",
        type: "textarea",
        value: data.user.description,
      },
      descriptionTH: {
        label: "คำอธิบาย (ภาษาไทย)",
        type: "textarea",
        value: data.user.descriptionTH,
      },
      moral: {
        label: "คติประจำใจ (ภาษาอังกฤษ)",
        type: "text",
        value: data.user.moral,
      },
      moralTH: {
        label: "คติประจำใจ (ภาษาไทย)",
        type: "text",
        value: data.user.moralTH,
      },
      id: {
        label: "",
        type: "hidden",
        value: data.user._id,
      },
      experiences: {
        label: "ประสบการณ์",
        type: "subforms",
        class: "h-[350px]",
        value: data.user.experiences,
        canMove: true,
        subform: {
          inputs: {
            company: {
              label: "ชื่อบริษัท",
              type: "text",
              required: true,
            },
            position: {
              label: "ตำแหน่ง",
              type: "text",
              required: true,
            },
            yearStart: {
              label: "เริ่มปี",
              type: "number",
              required: true,
            },
            yearEnd: {
              label: "จบปี",
              type: "number"
            },
            worked: {
              label: "ยังคงทำงานอยู่",
              type: "toggle",
            },
            periodMonth: {
              label: "เดิอน",
              type: "number",
            },
            periodYear: {
              label: "ปี",
              type: "number",
            },
            description: {
              label: "รายละเอียด",
              type: "textarea"
            },
          },
          inputLayouts: [
            ["company", "yearStart", "yearEnd", "worked"],
            ["position", "periodYear", "periodMonth"],
            ["description"]
          ]
        }
      },
      contact: {
        label: "การติดต่อ",
        type: "subform",
        value: data.user.contact,
        subform: {
          inputs: {
            phone: {
              label: "เบอร์",
              type: "text"
            },
            email: {
              label: "อีเมล",
              type: "text"
            },
            address: {
              label: "ที่อยู่",
              type: "subform",
              subform: {
                inputs: {
                  houseNo: {
                    label: "บ้านเลขที่",
                    type: "text"
                  },
                  moo: {
                    label: "หมู่",
                    type: "text"
                  },
                  soi: {
                    label: "ซอย",
                    type: "text"
                  },
                  village: {
                    label: "หมู่บ้าน",
                    type: "text"
                  },
                  street: {
                    label: "ถนน",
                    type: "text"
                  },
                  subDistrict: {
                    label: "ตำบล",
                    type: "text"
                  },
                  district: {
                    label: "อำเภอ",
                    type: "text"
                  },
                  province: {
                    label: "จังหวัด",
                    type: "text"
                  },
                  postalCode: {
                    label: "รหัสไปรษณีย์",
                    type: "text"
                  },
                  country: {
                    label: "ประเทศ",
                    type: "text"
                  },
                },
                inputLayouts: [
                  ["houseNo", "moo", "soi", "village"],
                  ["street", "subDistrict", "district"],
                  ["province", "postalCode", "country"],
                ]
              }
            }
          },
          inputLayouts: [
            ["phone", "email"],
            ["address"]
          ]
        }
      },
      skill: {
        label: "สกิล",
        type: "subform",
        value: data.user.skill,
        subform: {
          inputs: [
            {key: "languages", label: "ภาษา/เครื่องมือ"}, 
            {key: "softwares", label: "โปรแกรม"}, 
          ].reduce((obj, config) => {
            obj[config.key] = {
              label: config.label,
              type: "subforms",
              class: "h-[350px]",
              subform: {
                inputs: {
                  name: {
                    label: "ชื่อ",
                    type: "text",
                    required: true
                  },
                  level: {
                    label: "ระดับ",
                    type: "select",
                    data: [
                      {name: "ดีเยี่ยม", value: "excellent"},
                      {name: "ดี", value: "good"},
                      {name: "พื้นฐาน", value: "basic"}],
                    required: true
                  },
                  description: {
                    label: "คำอธิบาย",
                    type: "textarea",
                  }
                },
                inputLayouts: [
                  ["name", "level"],
                  ["description"]
                ]
              }
            }
            return obj
          }, {}),
          inputLayouts: [
            ["languages", "softwares"]
          ]
        }
      }
    }
    /** @type {import('@components/form/InputForm.svelte').InputLayouts}*/
    const userInputFormat = [
      ["profileImageNo", "imageURLs"],
      ["titleTH", "firstNameTH", "lastNameTH", "nicknameTH"],
      ["title", "firstName", "lastName", "nickname"],
      ["descriptionTH", "description"],
      ["moralTH", "moral"],
      ["birthday"],
      ["contact"],
      ["experiences"],
      ["skill"]
    ]


    /** @type {import('@components/form/Form.svelte').ButtonForm}*/
    const button = {
      cancel: {
        text: "ยกเลิก",
        type: "button",
        onClick: () => {
          isEdit = false
        }
      },
      submit: {
        text: "บันทึก",
        action: "update",
        onClick: () => {
          isEdit = false
        },
        reset: true
      },
    }

    /** @type {import('@components/form/InputForm.svelte').InputData}*/
    let userInputData;
    let loading = false
    let isEdit = false
</script>

<Loading {loading} />
<div class="p-4">
  <div class="text-2xl font-medium">บัญชีผู้ใช้</div>
  <FormReport inputs={userInputs} inputLayouts={userInputFormat} bind:data={userInputData} bind:loading formButton={button} bind:isEdit />
</div>