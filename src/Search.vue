<template>
  <div class="container mx-auto flex flex-col items-center mt-8 md:pt-24">
    <h1 class="text-base font-semibold text-pri tracking-wide uppercase">قروب الجامعة</h1>
    <p class="max-w-3xl mt-5 mx-auto text-xl text-gray-500">
      الهدف هو تسهيل عملية البحث لمساعدة الطلاب في الحصول على المعلومة والمساعدة
    </p>
    <div class="mx-auto flex items-center justify-center space-x-2 space-x-reverse my-4">
      <button @click="getGroups()" class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">قروبات المواد</button>
      <button @click="getBGroups()" class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">قروبات عامة</button>
    </div>


    <div v-if="glength >= 1" class="w-full mx-auto">
        <div class="bg-white shadow-lg rounded-sm border border-gray-200">
            <header class="px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800">قروبات المقررات</h2>
            </header>
            <div class="p-3">
                <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">اسم القروب</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">المقرر</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">الجامعة</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">معلومات</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-100">
                            <tr v-for="gr in groups" :key="gr.id">
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="font-medium text-gray-800">{{gr.attributes.name}}</div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left">{{gr.attributes.subject.data.attributes.name}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left font-medium text-green-500">الجامعة</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-lg text-center">عرض</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div v-if="bglength >= 1" class="w-full mx-auto">
        <div class="bg-white shadow-lg rounded-sm border border-gray-200">
            <header class="px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800">قروبات عامة</h2>
            </header>
            <div class="p-3">
                <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">اسم القروب</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">المقرر</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">الجامعة</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">معلومات</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-100">
                            <tr v-for="gr in bgroups" :key="gr.id">
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="font-medium text-gray-800">{{gr.attributes.name}}</div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left">{{gr.attributes.url}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left font-medium text-green-500">الجامعة</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-lg text-center">عرض</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
export default{
  data(){
    return{
      groups : [],
      glength : 0,
      bglength : 0,
      bgroups : []
    }
  },
  methods: {
    getGroups(){
      this.bgroups = 0
      axios.get('/api/groups/?populate=*')
            .then((result) => {
                this.groups = result.data.data
                this.glength = result.data.meta.pagination.total
            })
    },
    getBGroups(){
      this.glength = 0
      axios.get('/api/public-groups/?populate=*')
      .then((result) => {
        this.bgroups = result.data.data
        this.bglength = result.data.meta.pagination.total
      })
    },
  }
}
</script>
