import { writeFileSync } from "node:fs";

const status = { hooked: false, reason: "skipped" };
if (process.env.NETLIFY) {
  const token =
    process.env.NETLIFY_AUTH_TOKEN ||
    process.env.NETLIFY_API_TOKEN ||
    process.env.NETLIFY_TOKEN ||
    "";
  const keys = Object.keys(process.env).filter((key) => /NETLIFY|TOKEN|SMTP|MAIL|GMAIL/i.test(key));
  console.log("form-email env keys:", keys.join(",") || "none");
  if (!token) {
    status.reason = "no-token";
  } else {
    const res = await fetch("https://api.netlify.com/api/v1/hooks", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        site_id: "78dcc3dd-a98b-4eb6-a0d7-e2c31ddf1042",
        form_id: "6ab26d0107e94000084e245f",
        type: "email",
        event: "submission_created",
        data: { email: "vince@vinconnect.com.au" },
      }),
    });
    status.hooked = res.ok;
    status.reason = String(res.status);
    console.log("form-email hook status", res.status);
  }
}
writeFileSync("public/form-email-status.json", JSON.stringify(status));
