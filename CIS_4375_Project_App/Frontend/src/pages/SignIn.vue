<template>
    <div class="signin-container">
        <div class="signin-form">
            <form @submit.prevent="login">
                <div class="form-header">
                    <q-icon name="person" size="2em" class="q-mr-sm" />
                    Sign In
                </div>
                <div class="form-group">
                    <label for="email"> Email: </label>
                    <input type="email" id="email" v-model="email" required>
                </div>
                <div class="form-group">
                    <label for="password"> Password: </label>
                    <input type="password" id="password" v-model="password" required>
                </div>
                <div class="button-group">
                    <q-btn
                        @click="login"
                        label="Login"
                        color="blue"
                    ></q-btn>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },

    methods: {
        login() {
            console.log('Login Clicked')
        },
        register() {
            console.log('Register Clicked')
        }

    }
}
</script>

<style scoped>
.signin-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px; 
  width: 450px;
  background-color: gray;
}

.signin-form {
  width: 350px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
}

.form-header{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: medium;
    font-weight: bold;
    padding: 10px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

</style>