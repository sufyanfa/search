<template>
<div class="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
  <div class="max-w-lg mx-auto text-center">
    <h1 class="text-2xl font-bold sm:text-3xl">إنشاء حساب جديد</h1>
    <p class="mt-4 text-gray-500">
      أهلا بك في <span class="text-pri">قروبات الجامعة</span> عند تسجيلك في الموقع ستكون قادراً على<br> إضافة القروبات
    </p>
  </div>
  <form v-on:submit="handlUser" class="max-w-md mx-auto mt-8 mb-0 space-y-4">
    <div v-if="sucsses">
        <p class="text-green-500 font-medium my-2 text-center">{{msg}}</p>
    </div>
    <div v-if="error">
        <p class="text-red-500 font-medium my-2 text-center">{{msg}}</p>
    </div>
    <div>
      <label for="email" class="sr-only">البريد الإلكتروني</label>
      <div class="relative">
        <input
          type="email" required v-model="createUser.email"
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
          minlength="6" required v-model="createUser.password"
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
      <span class="text-sm p-2 text-gray-500 mt-2">كلمة المرور تحتوي 6 أحرف</span>
    </div>

    <div class="flex items-center justify-between">
      <button
        type="submit"
        class="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-sec rounded-lg"
      >
        تسجيل
      </button>
      <p class="text-sm text-gray-500">
        يوجد لدي حساب?
        <router-link :to="{name : 'LogIn'}" class="underline">تسجيل الدخول</router-link>
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
        createUser:{
            password: "",
            email :"",
            username : ""
        },
        sucsses : false,
        error : false,
        msg : '',
        passwordFieldType: "password"
    };
  },
    watch: {
        'createUser.email': function (newVal, oldVal){
        this.createUser.username = newVal
     }
    },
  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    },
    handlUser: async function(e) {
      e.preventDefault();
      axios.post('/api/auth/local/register', this.createUser)
      .then(response => {
          this.sucsses = true
          this.msg =  "تم إنشاء الحساب , يرجى تأكيد البريد الإلكتروني من خلال الرسالة المرسلة لبريدك"
        })
        .catch(error => {
          this.error = true
            this.msg = "حصل خطأ يرجى المحاولة لاحقا"
        })
    }
  }
};
</script>