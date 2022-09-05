<template>
<div class="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
  <div class="max-w-lg mx-auto text-center">
    <h1 class="text-2xl font-bold sm:text-3xl">مرحباً بك في قروبات الجامعة</h1>
    <p class="mt-4 text-gray-500">
      الصفحة المخصصة لإضافة القروبات, قبل إضافة القروب يرجى التأكد من عدم وجوده
    </p>
  </div>

    <div class="flex items-center justify-center space-x-4 space-x-reverse my-4">
        <router-link :to="{name : 'CreateGroup'}"  class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-4 rounded-lg flex items-center justify-center w-auto">إضافة قروب مقرر</router-link>
        <router-link :to="{name : 'CreateBGroup'}" class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-4 rounded-lg flex items-center justify-center w-auto">إضافة قروب عام</router-link>
    </div>
  </div>
</template>