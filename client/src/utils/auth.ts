import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Get the decoded profile from the JWT token
  getProfile() {
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token); // Decode the token and return the payload
    }
    return null; // Return null if no token exists
  }

  // Check if the user is logged in by verifying if a token exists in localStorage
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Token must exist and not be expired
  }

  // Check if the provided token is expired
  isTokenExpired(token: string) {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        return true; // Token is expired
      }
      return false; // Token is still valid
    } catch (err) {
      return true; // If decoding fails, consider it expired
    }
  }

  // Retrieve the token from localStorage
  getToken(): string {
    return localStorage.getItem('token') || ''; // Return token if it exists, else return empty string
  }

  // Save the token to localStorage and redirect to home page
  login(idToken: string) {
    localStorage.setItem('token', idToken); // Store the token in localStorage
    window.location.href = '/'; // Redirect to the home page
  }

  // Remove the token from localStorage and redirect to the login page
  logout() {
    localStorage.removeItem('token'); // Remove token from localStorage
    window.location.href = '/login'; // Redirect to the login page
  }
}

export default new AuthService();

