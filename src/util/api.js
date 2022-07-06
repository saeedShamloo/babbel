const API_URL = "http://localhost:8000/api";

const get = async (url) => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    return { error };
  }
};

const post = async (url, params) => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    return await response.json();
  } catch (error) {
    return { error };
  }
};

export const Api = {
  get,
  post,
};
