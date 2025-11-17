import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Account, Avatars, Client, Databases, OAuthProvider } from "react-native-appwrite";

WebBrowser.maybeCompleteAuthSession();

export const config = {
  Platform: "com.jsm.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID
};

// --------------------
// Initialize client
// --------------------
export const client = new Client()
  .setEndpoint(config.endpoint!)
  .setProject(config.projectID!)
  .setPlatform(config.Platform!);

export const account = new Account(client);
export const avatar = new Avatars(client);
export const databases = new Databases(client);  

// --------------------
// Save & restore session
// --------------------
const SESSION_KEY = "appwrite_session";

async function saveSession(session: any) {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

async function loadSession() {
  const saved = await AsyncStorage.getItem(SESSION_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

async function clearSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}

// --------------------
// Login with Google
// --------------------
export async function login() {
  try {
    const redirectUri = Linking.createURL("/");
    console.log("Redirect URI:", redirectUri);

    // Get OAuth2 URL from Appwrite
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri,
      redirectUri,
    );

    if (!response) throw new Error("Failed to get OAuth2 token URL");

    // Open browser for Google login
    const browserResult = await WebBrowser.openAuthSessionAsync(
      response.toString(),
      redirectUri,
    );

    if (browserResult.type !== "success") {
      throw new Error("Login cancelled or failed");
    }

    // Extract secret and userId from redirect URL
    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Failed to extract session params");

    // Create session in Appwrite
    try {
      await account.deleteSession("current");
    } catch {} // from try{} to catch{} line 3 lines create a session in appwrite for new user
    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    // Save session locally
    await saveSession(session);
    console.log("Session saved:", session);

    return true;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
}

// --------------------
// Logout
// --------------------
export async function logout() {
  try {
    await account.deleteSession("current");
    await clearSession();
    console.log("Logged out and session cleared");
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}

// --------------------
// Get current user
// --------------------
export async function getCurrentUser() {
  try {
    // Try direct fetch first
    const response = await account.get();
    if (response?.$id) {
      const userAvatar = avatar.getInitials({ name: response.name });
      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.log("No active session, trying restore...");

    // Try restoring saved session if available
    const saved = await loadSession();
    if (saved?.userId && saved?.secret) {
      try {
        const restored = await account.createSession(
          saved.userId,
          saved.secret,
        );
        console.log("Session restored:", restored);

        const response = await account.get();
        const userAvatar = avatar.getInitials({ name: response.name });

        return {
          ...response,
          avatar: userAvatar.toString(),
        };
      } catch (e) {
        console.error("Failed to restore session:", e);
      }
    }

    console.error("Get user error:", error);
    return null;
  }
}
