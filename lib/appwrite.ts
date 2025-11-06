import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

export const config = {
    Platform: 'com.jsm.restate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectID!)
    .setPlatform(config.Platform!)

export const avatar = new Avatars(client);  // Fixed typo: avater -> avatar
export const account = new Account(client);

export async function login() {
    try {
        // Create a deep link for YOUR app, not Appwrite's URL
        const redirectUri = Linking.createURL( '/');  // This creates: exp://yourapp/ or yourapp://
        
        console.log('Redirect URI:', redirectUri);  // Debug log

    
        // hasssan code     const { url: authUrl } =  await account.createOAuth2Token(
  const response = await account.createOAuth2Token(
    OAuthProvider.Google,
    redirectUri,
    // redirectUri
);

console.log('Auth URL:', response);  // optional line edited

// // const browserResult = await WebBrowser.openAuthSessionAsync(
// //     authUrl,
// //     redirectUri
// );


if(!response) throw new Error('Failed to login');

const browserResult = await WebBrowser.openAuthSessionAsync(
    response.toString(),
    redirectUri
)

if(browserResult.type  !== 'success') throw new Error('Failed to login ')

    const url = new URL(browserResult.url);
        
    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();

    if(!secret || !userId) throw new Error('Failed to login');

    // const session = await account.createSession(userId, secret);     // GPT

    // if(!session) throw new Error('Failed to create a seesion');     // GPT

    return true;


        // if (browserResult.type !== 'success') {
        //     throw new Error('Failed to login: Browser session not successful');
        // }
        
        // const url = new URL(browserResult.url);
        // const secret = url.searchParams.get('secret');
        // const userId = url.searchParams.get('userId');
        
        // if (!secret || !userId) {
        //     throw new Error('Failed to login: Missing secret or userId');
        // }
        
        // console.log('Creating session...');  // Debug log
        
        // // Create session with the tokens
        // const session = await account.createSession(userId, secret);
        // console.log('Auth URL:', authUrl);
        // const sentRedirect = decodeURIComponent(new URL(authUrl).searchParams.get('redirect_uri') || '');
        // console.log('redirect_uri sent to Google:', sentRedirect);
        // if (!session) {
        //     throw new Error('Failed to create a session');
        // }
        
        // return true;
        
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}

export async function logout() {
    try {
        await account.deleteSession({ sessionId: 'current' });
        return true;
    } catch (error) {
        console.error('Logout error:', error);
        return false;
    }
}

export async function getCurrentUser() {
    try {
        const response = await account.get();
        
        if (response.$id) {
            const userAvatar = avatar.getInitials({ name: response.name });        // updated      (response.name);
            
            return {
                ...response,
                avatar: userAvatar.toString(),
            }
        }
        
        // return null;
        
    } catch (error) {
        console.error('Get user error:', error);
        return null;
    }
}