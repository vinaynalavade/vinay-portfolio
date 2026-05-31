const { Resend } = require("resend");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  try {
    const {
      fullName,
      email,
      phone,
      paymentId
    } = JSON.parse(event.body);

    if (!fullName || !email || !paymentId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Missing required fields"
        })
      };
    }

    const token = crypto
      .randomBytes(32)
      .toString("hex");

    const expiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );

    const { error: insertError } =
      await supabase
        .from("downloads")
        .insert([
          {
            full_name: fullName,
            email: email,
            phone: phone,
            payment_id: paymentId,
            token: token,
            used: false,
            expires_at: expiresAt.toISOString()
          }
        ]);

    if (insertError) {
      throw insertError;
    }

    const downloadLink =
      `https://vinaynalavade.netlify.app/download.html?token=${token}`;

    await resend.emails.send({
      from: "Vinay QA <noreply@vinaynalavade.in>",
      to: email,
      subject: "Your Core Java Notes",

      html: `
        <h2>Hello ${fullName},</h2>

        <p>
          Thank you for purchasing Core Java Notes.
        </p>

        <p>
          Click the button below to access your notes.
        </p>

        <p>
          <a
            href="${downloadLink}"
            style="
              background:#00e5a0;
              color:#000;
              padding:12px 20px;
              text-decoration:none;
              border-radius:8px;
              font-weight:bold;
              display:inline-block;
            "
          >
            Access Notes
          </a>
        </p>

        <p>
          This link:
        </p>

        <ul>
          <li>Works only once</li>
          <li>Expires after 24 hours</li>
        </ul>

        <p>
          Payment ID: ${paymentId}
        </p>

        <p>
          Vinay.QA
        </p>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true
      })
    };
  } catch (error) {
    console.error("SEND NOTES ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
