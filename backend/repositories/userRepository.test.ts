import { describe, it, expect } from "bun:test";
import { getTestDb } from "../database/getTestDb";
import {
  getUser,
  getUserCount,
  getUserSettings,
  loginUser,
  registerUser,
  upsertUserSettings,
} from "./userRepository";

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

  it("should throw error if password is incorrect", async () => {
    const db = getTestDb();
    await registerUser(db, "TestUser", "test");
    expect(loginUser(db, "TestUser", "wrongpassword")).rejects.toThrow(
      "Incorrect password",
    );
  });

  it("should handle getUser for nonexistent user", async () => {
    const db = getTestDb();
    const user = await getUser(db, "NonexistentUser");
    expect(user?.name).toBeUndefined();
  });

  it("should get user count", async () => {
    const db = getTestDb();
    await registerUser(db, "TestUser1", "test");
    await registerUser(db, "TestUser2", "test");
    const count = await getUserCount(db);
    expect(count).toBe(2);
  });

  it("should get default user settings", async () => {
    const db = getTestDb();
    const settings = await getUserSettings(db, "TestUser");
    expect(settings).toEqual({
      placeQuestionMark: false,
      longPressOnDesktop: false,
      showRevealAnimation: true,
      soundEnabled: true,
    });
  });

  it("should upsert user settings - insert", async () => {
    const db = getTestDb();
    const newSettings = {
      placeQuestionMark: true,
      longPressOnDesktop: true,
      showRevealAnimation: false,
      soundEnabled: false,
    };
    await upsertUserSettings(db, "TestUser", newSettings);
    const settings = await getUserSettings(db, "TestUser");
    expect(settings).toEqual(newSettings);
  });

  it("should upsert user settings - update", async () => {
    const db = getTestDb();
    const initialSettings = {
      placeQuestionMark: false,
      longPressOnDesktop: false,
      showRevealAnimation: true,
      soundEnabled: true,
    };
    await upsertUserSettings(db, "TestUser", initialSettings);

    const updatedSettings = {
      placeQuestionMark: true,
      longPressOnDesktop: true,
      showRevealAnimation: false,
      soundEnabled: false,
    };
    await upsertUserSettings(db, "TestUser", updatedSettings);

    const settings = await getUserSettings(db, "TestUser");
    expect(settings).toEqual(updatedSettings);
  });
});
