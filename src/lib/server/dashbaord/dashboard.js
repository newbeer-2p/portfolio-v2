import { DashboardModel } from "$lib/server/models";

const now = new Date()
const date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()))

let dashboard = await DashboardModel.findOne({date})
if (!dashboard) dashboard = await DashboardModel.create({date})

function getDashboard(date) {
    
}

export {
    dashboard
}