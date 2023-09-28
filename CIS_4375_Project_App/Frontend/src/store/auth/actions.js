import axios from 'axios'

export const login = async ({ commit }, { email, password }) => {
    try {
        const response = await axios.post(`http://localhost:8001/api/login`, 
        { END_USER_EMAIL: email, 
        END_USER_PASSWORD: password });

        if (response) {
            // Successful login
            const userData = {
                isAuthenticated: true,
                userFirstName: response.data.END_USER_FIRST_NAME,
                userEmail: response.data.END_USER_EMAIL,
                userRole: response.data.USER_ROLE_ID,
            };

            commit('SET_STATE', userData)
        }

    } catch (error) {
        console.error('API request failed:', error);
    }
}

