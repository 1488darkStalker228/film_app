<template>
  <div class="login">
    <el-card class="login__card">
      <h3 class="login__title h3">Sing in</h3>
      <div class="login__error" v-if="errorLogin">
        <span>Неправильный логин или пароль</span>
      </div>

      <el-form class="test" :model="userData" :rules="rules" ref="ruleForm" label-width="120px">

        <el-form-item prop="userName">
          <el-input v-model="userData.userName" placeholder="Имя пользователя"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="userData.password" placeholder="Пароль" type='password'></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="login__btn-login" type="primary" @click="submitForm('ruleForm')">
            <span class="text">Войти</span>
          </el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorLogin: false,

      userData: {
        userName: 'dungeon_master228',
        password: '14881347',
      },

      rules: {
        userName: [
          { required: true, message: 'Введите имя пользователя', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Введите пароль', trigger: 'blur' },
          { min: 4, max: 120, message: 'Минимум 4 символа', trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getSessionId();
        } else {
          return false;
        }
      });
    },

    async getSessionId() {
      this.errorLogin = false;

      const getRequestToken = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.$store.getters.API_KEY}`);
      const requestToken = await getRequestToken.json();

      const validateRequestToken = await fetch(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${this.$store.getters.API_KEY}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: this.userData.userName,
            password: this.userData.password,
            request_token: requestToken.request_token
          })
        }
      );
      const result = await validateRequestToken.json();

      if (result.success) {
        const reqSessionId = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${this.$store.getters.API_KEY}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            request_token: requestToken.request_token
          })
        });
        const sessionId = await reqSessionId.json();

        localStorage.setItem('sessionId', JSON.stringify(sessionId.session_id));

        this.$router.push({name: 'Main'});
      } else {
        this.errorLogin = true;
      }
    }
  },

}
</script>

<style lang='scss'>
  .login {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url("../assets/images/background.jpg");
    background-size: cover;

    &__card {
      width: 354px;
      position: relative;
    }

    &__title {
      text-align: center;
      margin-bottom: 28px;
    }

    &__error {
      position: absolute;
      top: 50px;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      color: #F56C6C;
      span {
        line-height: 22px;
      }
    }

    .el-form-item {
      margin-bottom: 16px;
    }
    .el-form-item__error {
      position: static;
    }

    &__btn-login {
      width: 100%;
      padding: 8px 20px !important;
      font-family: inherit;
    }
    .el-form-item:last-child {
      margin: 0;
    }
  }
</style>