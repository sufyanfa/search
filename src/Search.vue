<template>
  <div class="container mx-auto flex flex-col items-center text-center mt-8 md:pt-16">
    <h1 class="font-bold text-lg text-pri tracking-wide">قروبات الجامعة</h1>
    <p class="max-w-3xl my-4 mx-auto text-xl text-gray-500">
      الهدف هو تسهيل عملية البحث لمساعدة الطالب في الحصول على المعلومة.
    </p>
    <div class="mx-auto flex flex-col md:space-x-2 md:space-x-reverse space-y-2 space-y-reverse md:space-y-0 md:flex-row md:items-center md:justify-center">
      <div class="w-full md:w-auto mx-auto flex items-center space-x-2 space-x-reverse mb-2 md:mb-0">
        <button @click="select = true" class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-4 rounded-lg flex items-center justify-center w-auto">
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            قروبات المقررات
        </button>
        <button @click="select = false" class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-4 rounded-lg flex items-center justify-center w-auto">
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            قروبات عامة
        </button>
      </div>
      <router-link :to="{name :'CreatePage'}" class="bg-pri focus:outline-none focus:ring-2 focus:ring-offset-2 text-sec font-semibold h-12 px-4 rounded-lg flex items-center justify-center w-auto">
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        إضافة قروب
      </router-link>
    </div>
    <Groups v-if="select" :groups="groups" />
    <public-groups v-if="!select" :publicGroups="publicGroups" />
    
  </div>
</template>

<script>
import axios from 'axios';
import ModalDirection from './components/Modal.vue';
import Groups from './components/Groups.vue'
import PublicGroups from './components/PublicGroups.vue';
export default{
  data(){
    return{
      select : true,
      universities : [],
      groups : [],
      publicGroups : [],
    }
  },
components:{
    ModalDirection,
    Groups,
    PublicGroups
},
    mounted() { 
        this.getPublicGroups()
    },
  methods: {
    async getPublicGroups(){
        try {
            const response = await axios({
            url: 'graphql',
            method: 'post',
            data: {
                query: `
                query {
  universities (sort : "id:desc"){
      data {
      id
      attributes {
          name
        groups(sort : "id:desc"){
          data{
            attributes{
              name,gender,url,division
              subject{
                data{
                  attributes{
                    name
                  }
                }
              }
              university{
                data{
                  attributes{
                    name
                  }
                }
              }
            }
          }
        }
        public_groups(sort : "id:desc"){
          data{
            attributes{
              name,gender,url
              university{
                data{
                  attributes{
                    name
                  }
                }
              }
              college{
                data{
                  attributes{
                    name
                  }
                }
              }
              specialty{
                data{
                  attributes{
                    name
                  }
                }
              }
              subject{
                data{
                  attributes{
                    name
                  }
                }
              }
            }
          }
        }
      }
      }
  }
}
                `
            }
        })

        this.universities = response.data.data.universities.data
        this.groups= response.data.data.universities.data[0].attributes.groups.data
        this.publicGroups = response.data.data.universities.data[0].attributes.public_groups.data

        } catch (error) {
        }
    }
  }
}
</script>
