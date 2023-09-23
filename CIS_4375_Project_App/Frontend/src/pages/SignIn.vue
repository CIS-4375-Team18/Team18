<template>
    <div class="signin-container">

        <div class="signin-content">
            <q-btn
                label="Sign in with Google"
                class="gmail-signin-button"
                @click="signInWithGoogle"
            />
        </div>   
    </div>
</template>

<script>
import { initiateOAuth, exchangeCodeForToken, getUserProfile } from '../../googleOAuthService.js';

export default {
    data() {
        return {
            userSignedIn: false,
            userAvatar: ''
        }
    },

    methods: {
        signInWithGoogle() {
            initiateOAuth();
        },

        handleOAuthCallback() {
            const code = this.$route.query.code;
            if (code) {
                exchangeCodeForToken(code)
                    .then((accessToken) => {
                        getUserProfile(accessToken)
                            .then((profile) => {
                                this.userSignedIn = true;
                                this.userAvatar = profile.picture;
                            })
                    })
                    .catch((error) => {
                        console.error('OAuth error: ', error);
                    });
            }
        },
    },

    created() {
        this.handleOAuthCallback();
    }
}
</script>

<style scoped>
.signin-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.signin-content {
    border: 2px solid #666262;
    background-color: #666262;
    padding: 20px;
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.gmail-signin-button {
    background-color: #4285F4;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
}

.gmail-signin-button:hover {
    background-color: #357AE8;
}
</style>