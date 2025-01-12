import { Resend } from "resend";

export default async function sendEmail({
  to,
  subject,
  content,
}: {
  to: string;
  subject: string;
  content: string;
}) {
  const resend = new Resend("re_XUwa4jJ9_2gX5exCK7ZPyCm9FpVTNsVB3");

  resend.emails.send({
    from: "Eclinic@resend.dev",
    to: to,
    subject: subject,
    html: `<h1>${subject}</h1>
    <p>
       ${content}
    </p>`,
  });
}
