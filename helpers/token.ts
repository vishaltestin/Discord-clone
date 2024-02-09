"use client"
export const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const userString = localStorage.getItem('authData');
    if (!userString) return null
    const user = JSON.parse(userString);
    return user
  }
  return;
};
