export const getToken = () => {
  return localStorage.getItem("token");
};

export const getAuthHeaders = () => {
    return {"Authorization": `Bearer ${getToken()}`}
}
