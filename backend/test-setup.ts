import { afterAll } from "bun:test";
import { clearTestDbs } from "./database/getTestDb";

afterAll(() => {
  clearTestDbs();
});
