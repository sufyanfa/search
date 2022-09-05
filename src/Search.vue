<template>
  <div class="container mx-auto flex flex-col items-center text-center mt-8 md:pt-16">
    <h1 class="font-bold text-lg text-pri tracking-wide">قروبات الجامعة</h1>
    <p class="max-w-3xl my-4 mx-auto text-xl text-gray-500">
      الهدف هو تسهيل عملية البحث لمساعدة الطالب في الحصول على المعلومة.
    </p>
    <div class="mx-auto flex items-center justify-center w-full space-x-2 space-x-reverse">
      <button @click="getGroups()" class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-4 rounded-lg flex items-center justify-center w-auto">قروبات المقررات
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </button>
      <button @click="getBGroups()" class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-4 rounded-lg flex items-center justify-center w-auto">قروبات عامة
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </button>
      <router-link :to="{name :'CreatePage'}" class="bg-pri focus:outline-none focus:ring-2 focus:ring-offset-2 text-sec font-semibold h-12 px-4 rounded-lg flex items-center justify-center w-auto">
        إضافة قروب
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
      </router-link>
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
                            <select v-model="universityID" id="university" name="university" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option @click="getCollages()" v-for="university in universities" :key="university.id" :value="university.id">{{university.attributes.name}}</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                            الكلية
                        </label>
                        <div class="relative">
                            <select v-model="collageID" id="college" name="college" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option v-for="college in colleges" :key="college.id" :value="college.id">{{college.attributes.name}}</option>
                            </select>
                        </div>
                    </div>  

                    <div class="md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                            القسم
                        </label>
                        <div class="relative">
                            <select v-model="specialtyID" id="specialty" name="specialty" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option v-for="specialty in specialties" :key="specialty.id" :value="specialty.id">{{specialty.attributes.name}}</option>
                            </select>
                        </div>
                    </div>  
                    <div class="md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                            المقرر
                        </label>
                        <div class="relative">
                            <select v-model="subjectID" id="subject" name="subject" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{subject.attributes.name}}</option>
                            </select>
                        </div>
                    </div>   
                </div>
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
                                    <div> المقرر</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div>متاح للـ</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div>الجامعة</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div>معلومات</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="!glength == 0" class="text-sm divide-y text-right divide-gray-100">
                            <tr v-for="gr in groups" :key="gr.id">
                                <td class="p-2 whitespace-nowrap">
                                    <div>{{gr.attributes.name}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div>{{gr.attributes.subject.data.attributes.name}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div>{{gr.attributes.Gender}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="font-medium text-green-500">{{gr.attributes.university.data.attributes.name}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div>
                                        <a :href="gr.attributes.URL">فتح</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-if="glength == 0" class="text-sm divide-y text-right divide-gray-100">
                            <tr v-for="gr in universityGroups" :key="gr.id">
                                <td class="p-2 whitespace-nowrap">
                                    <div>{{gr.attributes.id}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div>re</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div>name</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="font-medium text-green-500">r</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div>
                                        <a :href="edk">فتح</a>
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
            <header class="px-5 py-4 border-b border-gray-100">
                <div class="-mx-3 md:flex mb-2">
                    <div class="md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                            الجامعة
                        </label>
                        <div class="relative">
                            <select v-model="universityID" id="university" name="university" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option @click="getCollages()" v-for="university in universities" :key="university.id" :value="university.id">{{university.attributes.name}}</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                            الكلية
                        </label>
                        <div class="relative">
                            <select v-model="collageID" id="college" name="college" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option v-for="college in colleges" :key="college.id" :value="college.id">{{college.attributes.name}}</option>
                            </select>
                        </div>
                    </div>  

                    <div class="md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                            القسم
                        </label>
                        <div class="relative">
                            <select v-model="specialtyID" id="specialty" name="specialty" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option v-for="specialty in specialties" :key="specialty.id" :value="specialty.id">{{specialty.attributes.name}}</option>
                            </select>
                        </div>
                    </div>  
                    <div class="md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                            المقرر
                        </label>
                        <div class="relative">
                            <select v-model="subjectID" id="subject" name="subject" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{subject.attributes.name}}</option>
                            </select>
                        </div>
                    </div>   
                </div>
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
                                    <div>متاح للـ</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div>الجامعة</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div>معلومات</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y text-right divide-gray-100">
                            <tr v-for="gr in bgroups" :key="gr.id">
                                <td class="p-2 whitespace-nowrap">
                                    <div>{{gr.attributes.name}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div>{{gr.attributes.Gender}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="font-medium text-green-500">{{gr.attributes.university.data.attributes.name}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div>
                                        <a :href="gr.attributes.URL">فتح</a>
                                    </div>
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

      colleges : [],
      specialties : [],
      subjects :[],

      collageID : 0,
      specialtyID : 0,
      subjectID : 0

    }
  },
  async mounted() { 
        try {
            const response = await axios({
            url: 'graphql',
            method: 'post',
            data: {
                query: `
                query {
                    universities {
                        data {
                        id
                        attributes {
                            name
                        }
                        }
                    }
                }`
            }
        })
        this.universities = response.data.data.universities.data
        } catch (error) {
            this.error = error;
        }
    },
    watch: {
        universityID(value) {
            this.getCollages(),
            this.getUniversity()

        },
        collageID(value){
            this.getSpecialties()
        },
        specialtyID(value){
            this.getSubjects()
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
    getUniversites(){
      axios.get('/api/universities/?populate=*')
        .then((result) => {
            this.universities = result.data.data
            if(this.universityID >=1){
                this.getUniversity()
            }
        })
    },
    getCollages(){
            axios({
                url:`/api/universities/${this.universityID}/?populate=*`,
                method: 'get',
            }).then((result) => {
                this.colleges = result.data.data.attributes.colleges.data
            })
    },
    getSpecialties(){
        axios({
            url:`/api/colleges/${this.collageID}/?populate=*`,
            method: 'get',
        }).then((result) => {
            this.specialties = result.data.data.attributes.specialties.data
        })
    },
    getSubjects(){
        axios({
            url:`/api/specialties/${this.specialtyID}/?populate=*`,
            method: 'get',
        }).then((result) => {
            this.subjects = result.data.data.attributes.subjects.data
            this.subject = this.subjectID
        })
    },

    getUniversity(){
      axios.get(`/api/universities/${this.universityID}/?populate[groups][sort][0]=id%3Aasc`)
        .then((result) => {
            this.universityGroups = result.data.data
            console.log(this.universityGroups)
            this.universityLength = result.data.data.attributes.groups.data.glength
            this.glength = 0
        })
    },

  }
}
</script>
