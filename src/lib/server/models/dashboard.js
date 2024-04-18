import db from "$lib/server/db"

const dashboardSchema = new db.Schema({
    date: Date,
    view: Number
})

dashboardSchema.set("toObject", { getters: true, flattenObjectIds: true, versionKey: false })

function getDashboardModel() {
if (db.models["dashboards"]) db.deleteModel("dashboards")
return db.model('dashboards', dashboardSchema)
}
  
  export const DashboardModel = getDashboardModel()