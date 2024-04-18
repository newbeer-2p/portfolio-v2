import { test } from "vitest";
import { getLanguages, getSoftwares } from "../record";

test("", async () => {
  console.log(await getLanguages());
  console.log(await getSoftwares());
})