import mongoose from "mongoose"
import { DB_URI } from "$env/static/private"

export default await mongoose.connect(DB_URI);
console.log(`Database ${DB_URI} Connected!`);
