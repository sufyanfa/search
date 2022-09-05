<template>
    <div class="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
      <div class="max-w-lg mx-auto text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">تسجيل الدخول</h1>
        <p class="mt-4 text-gray-500">
          أهلا بك من جديد في <span class="text-pri">قروبات الجامعة</span>
        </p>
      </div>
      <form v-on:submit="handleSubmit" class="max-w-md mx-auto mt-8 mb-0 space-y-4">
        <div v-if="error">
            <p class="text-red-500 font-medium my-2 text-center">{{msError}}</p>
        </div>
        <div>
          <label for="identifier" class="sr-only">البريد الإلكتروني</label>
          <div class="relative">
            <input
              type="email" required v-model="userData.identifier"
              class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="أدخل بريدك الشخصي"
            />
    
            <span class="absolute inset-y-0 inline-flex items-center right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>
    
        <div>
          <label for="password" class="sr-only">كلمة المرور</label>
          <div class="relative">
            <input
              :type="passwordFieldType"
              minlength="6" required v-model="userData.password"
              class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="ادخل كلمة مرور"
            />
    
            <span @click="switchVisibility" class="absolute inset-y-0 inline-flex items-center right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>
    
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-sec rounded-lg"
          >
            دخول
          </button>
          <p class="text-sm text-gray-500">
            ليس لدي حساب ؟ 
            <router-link :to="{name : 'SignUp'}" class="underline">تسجيل  جديد</router-link>
          </p>
        </div>
      </form>
    </div>
    </template>
    <script>
    import axios from 'axios';
    export default {
      data() {
        return {
            userData:{
                identifier :"",
                password : ""
            },
            error : false,
            msError : "",
            passwordFieldType: "password"
        };
      },
      methods: {
        switchVisibility() {
          this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
        },
        handleSubmit: async function(e) {
          e.preventDefault();
          try {
            const response = await axios.post('/api/auth/local', this.userData)
            sessionStorage.setItem('token', response.data.jwt)
            router.push({name:'CreateGroup'})
          } catch(error) {
            this.error = true,
            this.msError = "يرجى التأكد من معلومات الدخول";
          }
        }
      }
    };
    </script>