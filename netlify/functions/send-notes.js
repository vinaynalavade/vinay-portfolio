const { Resend } = require("resend");
const fs = require("fs");
const path = require("path");

const resend =
  new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {

  try {

    const {
      fullName,
      email,
      phone,
      paymentId
    } = JSON.parse(event.body);

    if (
      !fullName ||
      !email ||
      !paymentId
    ) {

      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Missing required fields"
        })
      };

    }

    const pdfPath = path.join(
      process.cwd(),
      "assets",
      "notes",
      "CoreJava-Vinay.pdf"
    );

    const pdfBuffer =
      fs.readFileSync(pdfPath);

    await resend.emails.send({

      from:
        "Vinay QA <onboarding@resend.dev>",

      to: email,

      subject:
        "Your Core Java Notes - Vinay.QA",

      html: `
        <h2>Hello ${fullName},</h2>

        <p>
        Thank you for purchasing the
        Core Java Notes.
        </p>

        <p>
        Your notes are attached to this email.
        </p>

        <p>
        Payment ID:
        ${paymentId}
        </p>

        <p>
        Happy Learning 🚀
        </p>

        <p>
        Vinay.QA
        </p>
      `,

      attachments: [

        {
          filename:
            "CoreJava-Vinay.pdf",

          content:
            pdfBuffer.toString("base64")
        }

      ]

    });

    return {

      statusCode: 200,

      body: JSON.stringify({
        success: true
      })

    };

  } catch (error) {

    console.error(error);

    return {

      statusCode: 500,

      body: JSON.stringify({
        success: false,
        error: error.message
      })

    };

  }

};