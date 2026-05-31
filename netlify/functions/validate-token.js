const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
try {

```
const token =
  event.queryStringParameters?.token;

if (!token) {
  return {
    statusCode: 400,
    body: JSON.stringify({
      success: false,
      message: "Missing token"
    })
  };
}

const { data, error } =
  await supabase
    .from("downloads")
    .select("*")
    .eq("token", token)
    .single();

if (error || !data) {
  return {
    statusCode: 404,
    body: JSON.stringify({
      success: false,
      message: "Invalid token"
    })
  };
}

if (data.used) {
  return {
    statusCode: 403,
    body: JSON.stringify({
      success: false,
      message: "Link already used"
    })
  };
}

if (
  new Date() >
  new Date(data.expires_at)
) {
  return {
    statusCode: 403,
    body: JSON.stringify({
      success: false,
      message: "Link expired"
    })
  };
}

const {
  data: signedUrlData,
  error: signedUrlError
} =
  await supabase
    .storage
    .from(process.env.SUPABASE_BUCKET)
    .createSignedUrl(
      "CoreJava-Vinay.pdf",
      300
    );

if (signedUrlError) {
  throw signedUrlError;
}

await supabase
  .from("downloads")
  .update({
    used: true
  })
  .eq("token", token);

return {
  statusCode: 200,
  body: JSON.stringify({
    success: true,
    url: signedUrlData.signedUrl
  })
};
```

} catch (error) {

```
console.error(
  "VALIDATE TOKEN ERROR:",
  error
);

return {
  statusCode: 500,
  body: JSON.stringify({
    success: false,
    error: error.message
  })
};
```

}
};
