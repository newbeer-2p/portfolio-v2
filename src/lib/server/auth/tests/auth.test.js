import { describe, expect } from "vitest"
import { login, signUp } from "../auth"
describe
test.skip("[signUp] without username", async () => {
    const username = "newbeer"
    const password = "nb-portfolio"
    const result = await signUp(username, password)
    return expect(result).toBeDefined()
})

test("[signUp] with username exists", async () => {
    const username = "newbeer"
    const password = "nb-portfolio"
    const result = await signUp(username, password)
    return expect(result).toBeUndefined()
})

test("[login] valid user", async () => {
    const username = "newbeer"
    const password = "nb-portfolio"
    const result = await login(username, password)
    return expect(result).toBeDefined()
})

test("[login] invalid user", async () => {
    const username = "invalid"
    const password = "nb-invalid"
    const result = await login(username, password)
    return expect(result).toBeUndefined()
})