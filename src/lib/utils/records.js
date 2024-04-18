export const recordTypes = [
  {
    name: "game",
    nameTH: "เกม",
    color: "green",
    class: "gradient-green"
  },
  {
    name: "website",
    nameTH: "เว็บไซต์",
    color: "blue",
    class: "gradient-blue"
  },
  {
    name: "model",
    nameTH: "โมเดล",
    color: "purple",
    class: "gradient-purple"
  },
  {
    name: "cinematic",
    nameTH: "ภาพยนตร์",
    color: "grey",
    class: "gradient-yellow"
  },
]

/**
 * @param {string} name 
 * @returns 
 */
export function getRecordType(name) {
  return recordTypes.find(type => type.name == name)
}

/**
 * @param {import('$lib/server/record/record.js').M_Record} record
 */
export function toRecordCard(record){
  const obj = {
    href: `/records/${record.no_}`,
    coverURL: `${record.posterURL}`,
    header: record.recommended ?`<div class="absolute right-2 top-2 bg-gradient-to-r from-warning-300 to-warning-500 px-3 py-1 rounded-full">แนะนำ</div>` : "",
    headerClasses: "h-80 relative",
    content: `<div class="text-2xl font-bold mb-2">${record.name}</div><div class="text-gray-700">${record.description}</div>`,
    contentClasses: "",
    footer: ``,
    footerClasses: "",
    classes: "hover:scale-[103%] transition-all"
  }
  return obj
}

/**
 * @param {import("$lib/server/record/record").M_Record|object} record 
 * @returns 
 */
export const getRecordInput = (record={}) => {
  const config = {
    id: {
      label: "",
      type: "hidden",
      value: record.id,
      disabled: true,
    },
    // no_: {
    //   label: "เลขลำดับ",
    //   type: "hidden",
    //   value: record.no_,
    // },
    name: {
      label: "ชื่อ",
      type: "text",
      value: record.name,
      required: true,
    },
    types: {
      label: "ประเภท",
      type: "checkbox",
      data: recordTypes.map(type => ({name: type.nameTH, value: type.name})),
      value: record.types,
    },
    year: {
      label: "ปีการศีกษา",
      type: "number",
      value: record.year,
    },
    subjects: {
      label: "วิชา",
      type: "lists",
      value: record.subjects
    },
    posterURL: {
      label: "โปสเตอร์",
      type: "image-text",
      value: record.posterURL,
      class: "h-80",
      required: true
    },
    project: {
      label: "โปรเจค?",
      type: "toggle",
      value: record.project
    },
    description: {
      label: "รายละเอียด",
      type: "textarea",
      value: record.description,
      rows: 12,
      required: true
    },
    languages: {
      label: "ภาษา/เครื่องมือ",
      type: "lists",
      value: record.languages,
      required: true
    },
    softwares: {
      label: "โปรแกรม",
      type: "lists",
      value: record.softwares,
      required: true
    },
    roles: {
      label: "หน้าที่",
      type: "lists",
      value: record.roles,
      required: true
    },
    demoURL: {
      label: "ลิงก์เดโม่",
      type: "link",
      value: record.demoURL
    },
    githubURL: {
      label: "GitHub",
      type: "link",
      value: record.githubURL
    },
    linkURL: {
      label: "ลิงก์",
      type: "link",
      value: record.linkURL
    },
    config: {
      label: "",
      type: "subform",
      subform: {
        inputs: {
          no_: {
            label: "เลขที่",
            type: "text",
            readonly: true,
            value: record.no_,
          },
          shown: {
            label: "แสดง?",
            type: "toggle",
            value: record.shown ?? true,
          },
          recommended: {
            label: "แนะนำ?",
            type: "toggle",
            value: record.recommended,
          },
        },
        inputLayouts: [
          ["no_", "recommended", "shown"]
        ]
      }
    },
    header: {
      label: "มหาลัย",
      type: "header",
    }
    // shown: {
    //   label: "แสดง?",
    //   type: "toggle",
    //   value: record.shown ?? true,
    // },
    // recommended: {
    //   label: "แนะนำ?",
    //   type: "toggle",
    //   value: record.recommended
    // },
  }
  return config
}

export const getRecordLayout = () => ([
  // ["name", "", "shown", "recommended"],
  ["name", "config"],
  ["posterURL", "description", "types"],
  // ["project", "year"],
  // ["languages", "softwares", "roles", "subjects"],
  ["languages", "softwares", "roles"],
  ["demoURL", "githubURL", "linkURL"],
  ["header"],
  ["project", "year", "subjects"],
])