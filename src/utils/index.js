export const createUser = async (username, email, pass, setter) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}user`, {
      method: "POST", // all HTTP e.g. get, post, put  methods must be in string and uppercase letters
      headers: { "Content-Type": "application/json" }, // headers should be structured in JSON format
      body: JSON.stringify({
        username: username,
        email: email,
        password: pass,
      }),
    });
    const data = await response.json();
    setter(data.user);
    localStorage.setItem("myToken", data.token);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (username, pass, setter) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: pass,
      }),
    });
    const data = await response.json();
    setter(data.user);
    localStorage.setItem("myToken", data.token);
  } catch (error) {
    console.log(error);
  }
};

export const tokenLogin = async (setter) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}user`, {
      method: "GET",
      headers: { Authorisation: `Bearer ${localStorage.getItem("myToken")}` },
    });
    const data = await response.json();
    setter(data.user);
  } catch (error) {
    console.log(error);
  }
};
