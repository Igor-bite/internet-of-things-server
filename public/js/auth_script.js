async function sign_in_up() {
  const response = await fetch("http://localhost:3000/api/auth/authorisationurl?thirdPartyId=github",
    {
      method: "GET",
      headers: {
        rid: "thirdparty"
      }
    }
  );
  const url = (await response.json()).url
  let urlObj = new URL(url);
  urlObj.searchParams.append("redirect_uri", "http://localhost:3000/api/auth/callback/github");

  const toRedirect = urlObj.toString();
  window.location.href = toRedirect;
}