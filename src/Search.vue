<template>
  <div class="container mx-auto flex flex-col items-center text-center mt-8 md:pt-16">
    <h1 class="text-base font-semibold text-pri tracking-wide uppercase">قروب الجامعة</h1>
    <p class="max-w-3xl my-4 mx-auto text-xl text-gray-500">
      الهدف هو تسهيل عملية البحث لمساعدة الطلاب في الحصول على المعلومة والمساعدة
    </p>
    <div class="mx-auto flex items-center justify-center w-full space-x-2 space-x-reverse">
      <button @click="getGroups()" class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-4 rounded-lg flex items-center justify-center w-auto">قروبات المقررات</button>
      <button @click="getBGroups()" class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-4 rounded-lg flex items-center justify-center w-auto">قروبات عامة</button>
    </div>



    <div v-if="select == 1" class="w-full mx-auto my-4">
        <div class="bg-white shadow-lg rounded-sm border border-gray-200">
            <header class="px-5 py-4 border-b border-gray-100">
                <div class="-mx-3 md:flex mb-2">
                    <div class="md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                            الجامعة
                        </label>
                        <div class="relative">
                            <select v-model="universityID" @click="getUniversites()" id="university" name="university" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option v-for="university in universities" :key="university.id" :value="university.id">{{university.attributes.name}}</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                            الكلية
                        </label>
                        <div class="relative">
                            <select id="college" name="college" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <!-- <option v-for="college in groups.attributes.colleges" :key="college.id" :value="college.id">{{college.attributes.name}}</option> -->
                            </select>
                        </div>
                    </div>  

                    <div class="md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                            القسم
                        </label>
                        <div class="relative">
                            <select id="specialty" name="specialty" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <!-- <option v-for="specialty in groups.attributes.specialties" :key="specialty.id" :value="specialty.id">{{specialty.attributes.name}}</option> -->
                            </select>
                        </div>
                    </div>  
                    <div class="md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                            القسم
                        </label>
                        <div class="relative">
                            <select id="subject" name="subject" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <!-- <option v-for="subject in groups.attributes.subjects" :key="subject.id" :value="subject.id">{{subject.attributes.name}}</option> -->
                            </select>
                        </div>
                    </div>   
                </div>
            </header>
            <div class="p-3">
                <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                        <thead class="text-xs font-semibold text-gray-400 bg-gray-50">
                            <tr>
                                <th class="p-2 text-right">
                                    <div class="font-semibold">اسم القروب</div>
                                </th>
                                <th class="p-2">
                                    <div class="font-semibold">المقرر</div>
                                </th>
                                <th class="p-2">
                                    <div class="font-semibold">الجامعة</div>
                                </th>
                                <th class="p-2">
                                    <div class="font-semibold">عرض</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="glength >= 1" class="text-sm divide-y divide-gray-100">
                            <tr v-for="gr in groups" :key="gr.id">
                                <td class="p-2 font-medium text-right">
                                    <div class="text-gray-800">{{gr.attributes.name}}</div>
                                </td>
                                <td class="p-2">
                                    <div class="text-gray-800">{{gr.attributes.subject.id}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-gray-800">{{gr.attributes.university.id}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-blue-600 hover:text-blue-800">
                                        <a href="">فتح</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else class="text-sm divide-y divide-gray-100">
                            <tr v-for="gr in universityGroups" :key="gr.id">
                                <td class="p-2 font-medium text-right">
                                    <div class="text-gray-800">{{gr.attributes.name}}</div>
                                </td>
                                <td class="p-2">
                                    <div class="text-gray-800">{{gr.attributes.name}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-gray-800">{{gr.attributes.name}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-blue-600 hover:text-blue-800">
                                        <a href="">فتح</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div v-if="select == 2" class="w-full mx-auto my-4">
        <div class="bg-white shadow-lg rounded-sm border border-gray-200">
            <header class="px-5 py-4 border-b border-gray-100 text-right">
                <h2 class="font-semibold text-gray-800">قروبات عامة</h2>
            </header>
            <div class="p-3">
                <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                        <thead class="text-xs text-right font-semibold text-gray-400 bg-gray-50">
                            <tr>
                                <th class="p-2 whitespace-nowrap">
                                    <div>اسم القروب</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div>المقرر</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div>الجامعة</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div>معلومات</div>
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
      select : 0,
      groups : [],
      glength : 0,
      universities : [],
      universityID : 0,
      universityNmae : '',
      universityGroups : [],
      universityLength : 0,
      univlength : 0,
      bglength : 0,
      bgroups : [],

    }
  },
  methods: {
    getGroups(){
      this.select = 1
      axios.get('/api/groups/?populate=*')
            .then((result) => {
                this.groups = result.data.data
                this.glength = result.data.meta.pagination.total
            })
    },
    getBGroups(){
      this.select = 2,
      axios.get('/api/public-groups/?populate=*')
      .then((result) => {
        this.bgroups = result.data.data
        this.bglength = result.data.meta.pagination.total
      })
    },
    getUniversites(){//selectOp
      axios.get('/api/universities/?populate=*')
        .then((result) => {
            this.universities = result.data.data
            if(this.universityID >=1){
                this.getUniversity()
            }
        })
    },
    getUniversity(){
      axios.get(`http://localhost:1337/api/universities/${this.universityID}/?populate[groups][sort][0]=id%3Aasc`)
        .then((result) => {
            this.universityGroups = result.data.data.attributes.groups.data
            this.universityLength = result.data.data.attributes.groups.data.glength
            this.glength = 0
        })
    },

  }
}
</script>
