export const createUser = async (username, email, pass, setter) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}user`, {
      method: "POST", // all HTTP e.g. get, post, put  methods must be in string and uppercase letters
      headers: { "Content-Type": "application/json" }, // headers should be structured in JSON format
      body: JSON.stringify({
        username: username,
        email: email,
        pass: pass,
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
        pass: pass,
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

export const deleteUser = async (user) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_REST_API}user/username/${user}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("myToken")}` },
      }
    );
    localStorage.clear();
    window.location.reload(false);
    await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (username, passUpdate) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("myToken")}`,
      },
      body: JSON.stringify({
        username: username,
        pass: passUpdate,
      }),
    });
    const data = await response.JSON();
    if (!data.msg) {
      throw new Error(data.err);
    }
  } catch (error) {
    console.log();
  }
};



  export const dateUserprofile = async (userimage) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_REST_API}image`, {
        method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("myToken")}` },
      body: JSON.stringify(userimage),
});
return await response.json();
} catch (error) {
    console.log(error);
}
};