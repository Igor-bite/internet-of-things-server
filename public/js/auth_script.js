async function sign_in_up() {
  const response = await fetch(document.location.origin + "/api/auth" + "/authorisationurl?thirdPartyId=github",
    {
      method: "GET",
      headers: {
        rid: "thirdparty"
      }
    }
  );
  const url = (await response.json()).url
  let urlObj = new URL(url);
  urlObj.searchParams.append("redirect_uri", document.location.origin + "/api/auth" + "/callback/github");

  window.location.href = urlObj.toString();
}