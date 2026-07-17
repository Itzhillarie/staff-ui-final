export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/users/login/`,
  LOGOUT: `${API_BASE_URL}/users/logout/`,
  CREATE_USER: `${API_BASE_URL}/users/create/`,
  IDEAS: `${API_BASE_URL}/ideas/`,
  PROJECTS: `${API_BASE_URL}/projects/`,
  GAMIFICATION: `${API_BASE_URL}/Gamification/`,
};