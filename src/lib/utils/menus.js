export const defaultMenus = [
  {
    name: "หน้าแรก",
    to: "/",
    icon: `<i class="fa-solid fa-circle-user"></i>`,
  },
  {
    name: "ประวัติส่วนตัว",
    to: "/profile",
    icon: `<i class="fa-solid fa-circle-user"></i>`,
  },
  {
    name: "ผลงาน",
    to: "/records",
    icon: `<i class="fa-solid fa-clipboard-list w-4 h-4"></i>`
  },
  {
    name: "แอดมิน",
    to: "/admin",
    icon: `<i class="fa-solid fa-user w-4 h-4"></i>`,
    layout: "bottom",
  }
]

export const adminMenus = [
  {
    name: "แดชบอร์ด",
    to: "/admin/dashboard",
    icon: `<i class="fa-solid fa-gauge w-4 h-4"></i>`,
  },
  {
    name: "บัญชีผู้ใช้",
    to: "/admin/author",
    icon: `<i class="fa-solid fa-user w-4 h-4"></i>`,
  },
  {
    name: "ผลงาน",
    to: "/admin/records",
    icon: `<i class="fa-solid fa-folder-open"></i>`,
  },
  {
    name: "กลับหน้าหลัก",
    to: "/",
    icon: `<i class="fa-solid fa-house w-4 h-4"></i>`,
    layout: "bottom"
  }
]