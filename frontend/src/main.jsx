import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import axios from "axios";
import store from "./store/store.js";
import { setUser } from "./store/authSlice.js";
import App from "./App.jsx";
import "./index.css"; // Tailwind styles

/**
 * Initialize system theme (dark/light) based on OS preference
 * and update automatically when the preference changes.
 */
function initSystemTheme() {
  try {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (isDark) => {
      document.documentElement.classList.toggle("dark", isDark);
    };

    // initial preference
    applyTheme(mediaQuery.matches);

    // future changes
    const listener = (e) => applyTheme(e.matches);
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", listener);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(listener);
    }
  } catch {
    document.documentElement.classList.add("dark");
  }
}

initSystemTheme();

/**
 * ✅ Auto Login / Auth Check
 * When app starts → check if user is authenticated from cookie
 */
async function initAuth() {
  try {
    const res = await axios.get("http://localhost:3000/api/auth/me", {
      withCredentials: true,
    });
    store.dispatch(setUser(res.data.user));
  } catch {
    store.dispatch(setUser(null));
  }
}

initAuth();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
