import db from "$lib/server/db";

const authSchema = new db.Schema({
  username: String,
  password: String
});

authSchema.set("toObject", { getters: true, flattenObjectIds: true, versionKey: false })

function getAuthModel() {
  if (db.models["auths"]) db.deleteModel("auths")
  return db.model('auths', authSchema)
}

export const AuthModel = getAuthModel()