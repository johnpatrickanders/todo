function updateOptions(options) {
  const update = { ...options };
  if (localStorage.token) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.token}`,
    };
  }
  return update;
}

export default async function fetcher(url, options) {
  console.log(url);
  console.log(options);
  const res = await fetch(url, updateOptions(options));
  // const data = await res.json();
  if (url === "logout") {
    console.log("reroute");
    return res;
  } else {
    return res;
  }
}
