import { createUser } from "~/models/user.server";

describe("User model", () => {
  test("should create a user", async ({ integration }) => {
    const user = await integration.createNormalUser({
      email: "test@email.com",
      username: "Test",
    });

    const result = await createUser({
      email: "test@email.com",
      username: "Test",
      role: "USER",
    });

    expect(result.email).toBe(user.email);
    expect(result.role).toBe(user.role);
  });
});
