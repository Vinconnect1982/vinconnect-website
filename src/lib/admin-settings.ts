import { createServerFn } from "@tanstack/react-start";

export const signInWithGoogle = createServerFn({ method: "POST" })
  .validator((idToken: string) => idToken)
  .handler(async ({ data }) => {
    const { signInWithGoogle: verify } = await import("./admin-auth.server");
    return verify(data);
  });

export const readAdminAccess = createServerFn({ method: "POST" })
  .validator((input: { password: string }) => input)
  .handler(async ({ data }) => {
    const { adminAccess } = await import("./admin-auth.server");
    return adminAccess(data.password);
  });

export const changeAdminPassword = createServerFn({ method: "POST" })
  .validator((input: { password: string; next: string }) => input)
  .handler(async ({ data }) => {
    const { changeAdminPassword: change } = await import("./admin-auth.server");
    return change(data.password, data.next);
  });

export const resetAdminPassword = createServerFn({ method: "POST" })
  .validator((input: { password: string }) => input)
  .handler(async ({ data }) => {
    const { clearAdminPassword } = await import("./admin-auth.server");
    return clearAdminPassword(data.password);
  });
