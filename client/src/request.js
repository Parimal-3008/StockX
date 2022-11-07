import Cookies from "js-cookie";
const request = async (url, data, _method = "GET") => {
  try {
    const u = Cookies.get('name');
    const token = Cookies.get('jwtoken');
    const id = Cookies.get('id');
    return await fetch(url, {
      method: _method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({u, token, id, ...data}),
    }).then(r=>r.json());
  } catch (err) {
    console.error(err);
  }
};

export default request