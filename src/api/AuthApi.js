import GlobalApi from "./GlobalApi"

export const login = async (data) => {
    // This is a placeholder for the actual API call
    const response = await GlobalApi.post("/login", data);
    const token = response.data.token;
    const user = response.data.data; // keep the user object, not role
    // Store token and user role in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    console.log("User token:", token); // Log the user token
    // return response.data;
    return { token, user }; // return the whole user object
}

export const logout = async () => {
    const token = localStorage.getItem("token"); 
    await GlobalApi.post("/logout", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    localStorage.removeItem("token");
    localStorage.removeItem("role");
}