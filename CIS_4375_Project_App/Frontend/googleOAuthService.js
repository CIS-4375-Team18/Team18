import axios from 'axios';
import qs from 'qs';


const CLIENT_ID = '384735290750-5cqotls1m9j11iaholnisrcgb4gr5d2t.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:9000';
const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const USER_PROFILE_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

export function initiateOAuth() {
    const queryParams = {
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
        response_type: 'code',
    };
    
    const authURL = `${AUTH_URL}?${qs.stringify(queryParams)}`;
    window.location.href = authURL;
}

export async function exchangeCodeForToken(code) {
    const data = {
        code,
        client_id: CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
    };

    try {
        const response = await axios.post(TOKEN_URL, qs.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return response.data.access_token;
    } catch (error) {
        console.error('OAuth token exchange error: ', error);
        throw error;
    }
}

export async function getUserProfile(accessToken) {
    try {
        const response = await axios.get(USER_PROFILE_URL, {
            headers: {
                Authorization: 'Bearer ${accessToken}',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching user profile: ', error);
        throw error;
    }
}