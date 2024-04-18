import { expect, test } from "vitest";
import { dashboard } from "../dashboard";

test("dashboard: now", () => {
    const now = new Date()
    const date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()))
    return expect(date).toEqual(dashboard.date)
})

test("getDashboard(): have Date", () => {
    
})