async function sign_in_up() {
  const response = await fetch(process.env.API_DOMAIN + process.env.API_BASE_PATH + "/authorisationurl?thirdPartyId=github",
    {
      method: "GET",
      headers: {
        rid: "thirdparty"
      }
    }
  );
  const url = (await response.json()).url
  let urlObj = new URL(url);
  urlObj.searchParams.append("redirect_uri", process.env.API_DOMAIN + process.env.API_BASE_PATH + process.env.GITHUB_CALLBACK_PATH);

  window.location.href = urlObj.toString();
}