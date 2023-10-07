import axios from 'axios'

export const login = async ({ commit }, { email, password }) => {
    try {
        const response = await axios.post(`http://localhost:8001/api/login`, 
        { END_USER_EMAIL: email, 
        END_USER_PASSWORD: password });

        if(response && response.data.ACTIVE_STATUS_ID === 1) {
            const userData = {
                isAuthenticated: true,
                userFirstName: response.data.END_USER_FIRST_NAME,
                userEmail: response.data.END_USER_EMAIL,
                userRole: response.data.USER_ROLE_NAME,
                userId: response.data.END_USER_ID
            }
            commit('SET_STATE', userData)
            return userData;
        } else {
            console.error('Credentials not valid.')
        };

    } catch(error) {
        console.error('API request failed:', error);
    }
}

export const logout = ({ commit }) => {
    commit('LOGOUT')
}

