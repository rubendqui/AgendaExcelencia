<template>
    <div class="auth">
  <div class="auth__header">
    <div class="auth__logo">
      <img height="90" src="../../public/img/logoministerio.jpg" alt="">
    </div>
  </div>
  <div class="auth__body">
    <form class="auth__form" autocomplete="off" @submit.prevent="login">
      <div class="auth__form_body">
        <h3 class="auth__form_title">Ingrese su Usuario</h3>
        <div>
          <div class="form-group">
            <label class="text-uppercase small" >Usuario</label>
            <input type="text" class="form-control" v-model="username" required  placeholder="Enter email">
          </div>
          <div class="form-group">
            <label class="text-uppercase small">Contraseña</label>
            <input type="password" class="form-control" v-model="password" required placeholder="Password">
          </div>
        </div>
      </div>
      <div class="auth__form_actions">
        <button type="submit" class="btn btn-primary btn-lg btn-block btn-blue" on-click="login">
          Iniciar Sesion
        </button>
        <div class="mt-2">
          <a href="#" class="small text-uppercase">
            Recuperar Contraseña
          </a>
        </div>
      </div>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</div>
</template>
<script>
import { ref } from 'vue';
import servicezismed from '../Services/ServiceZismed'
import Swal from "sweetalert2";
import {  useRoute } from 'vue-router'
  export default {
    components:{

    },
    name: 'login',
    setup() {
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');
 const route = useRoute();
    const service = ref(new servicezismed());
    const login = () => {
      Swal.showLoading(Swal.getDenyButton());
        service.value.GetUser(username.value,password.value).then(x=>{
          Swal.hideLoading(Swal.getDenyButton());
          Swal.close();
            if(x.ok){
                
            const [, payloadBase64] = x.token.split('.'); // Extraer la carga útil (payload) del token JWT
                
                const payload = JSON.parse(atob(payloadBase64)); 
                const data = JSON.parse(payload.Data);
                console.log(data)  
                console.log(payload)    
            }
        })
     
    };

    return {
      username,
      password,
      errorMessage,
      login,
    };
  },
  }
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto');
body{
  font-family: 'Roboto', sans-serif;
}
.auth{
  &__header{
    padding: 13vh 1rem calc(11vh + 35px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    background-image: linear-gradient(rgb(54,156,205), rgb(54,156,205));
   //  background-image: url(../../public/img/logoministerio2.jpeg);
    background-size: cover;
    background-position: center center;
    position: relative;
    box-shadow: 0 3px 5px rgba(rgb(51,89,105), 0.3);
    &:before{
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
       background-image: linear-gradient(rgba(#000, 0), rgba(#000, 0.7));
    }
  }
  &__logo{
    position: relative;
    z-index: 18;
    background: #fff;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0 2px 7px rgba(#000, 0.15);
    overflow: hidden;
  }
  &__body{
    padding-bottom: 2rem;
  }
  &__form{
    min-width: 280px;
    max-width: 440px;
    margin: auto;
    margin-top: -40px;
    padding: 0 10px;
    position: relative;
    z-index: 9;
    &_body{
      padding: 0.7rem 1.5rem 35px;
      border-radius: 0.5rem;
      background: #fff;
      border: 1px solid #eee;
      box-shadow: 0 4px 10px rgba(#000, 0.15);
    }
    &_title{
      font-size: 1.3rem;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 1.2rem;
    }
    &_actions{
      text-align: center;
      padding: 0 2rem;
      margin-top: -25px;
      text-decoration-color: #eee;
      .btn{
        border-radius: 30px;
        box-shadow: 0 2px 12px rgba(rgb(54,156,205), 0.5);
      }
    }
  }
  .btn-blue {
  background-color: rgb(54,156,205); /* Cambiar a tu tono de azul deseado */
  text-shadow: #eee;
}
}
</style>