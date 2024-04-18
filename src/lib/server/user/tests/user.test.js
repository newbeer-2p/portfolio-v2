import { test } from "vitest";
import { user } from "../user";

test.skip("User:", () => {
    console.log(user.fullNameTH);
})