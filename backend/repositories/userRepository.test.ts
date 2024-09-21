import { describe, it, expect } from "bun:test";
import { getTestDb } from "../database/getTestDb";
import { getUser, loginUser, registerUser } from "./userRepository";

describe("UserRepository", () => {
  it("should register a user", async () => {
    const db = getTestDb();
    await registerUser(db, "TestUser", "test");
    const user = await getUser(db, "TestUser");
    expect(user).toEqual({
      name: "TestUser",
      password: undefined,
    });
  });

  it("should throw an error if user already exists register", async () => {
    const db = getTestDb();
    await registerUser(db, "TestUser", "test");
    expect(registerUser(db, "TestUser", "test")).rejects.toThrow(
      "User already exists",
    );
  });

  it("should throw an error if user already exists register case insensitive", async () => {
    const db = getTestDb();
    await registerUser(db, "TestUser", "test");
    expect(registerUser(db, "TESTUSER", "test")).rejects.toThrow(
      "User already exists",
    );
  });

  it("should throw an error if user does not exist on login", async () => {
    const db = getTestDb();
    expect(loginUser(db, "TestUser", "test")).rejects.toThrow(
      "User does not exist",
    );
  });

  it("should login a user", async () => {
    const db = getTestDb();
    await registerUser(db, "TestUser", "test");
    const user = await loginUser(db, "TestUser", "test");
    expect(user).toEqual({
      name: "TestUser",
      password: undefined,
    });
  });
});
