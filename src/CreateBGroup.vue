<template>
    <div class="container mx-auto flex flex-col items-center">
        <h1 class="font-bold text-lg text-sec text-right md:text-center mb-2">إضافة قروب عام</h1>
        <p class="text-sm font-normal mb-2 text-right md:text-center">إضافة قروب عام للجامعة أو الكلية أو التخصص أو المقرر</p>
        <form v-on:submit="createBGroup" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">    
            <div class="-mx-3 md:flex mb-4">
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                    اسم القروب
                </label>
                <input required v-model="groupData.name" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="اكتب اسم القروب">
                </div>
                <div class="md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                    المشرف
                </label>
                <input v-model="groupData.SupervisorName" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="اكتب اسم المشرف">
                </div>
            </div>
            <div class="-mx-3 md:flex mb-4">
                <div class="md:w-full px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                    رابط القروب
                </label>
                <input required v-model="groupData.url" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="text" placeholder="ألصق رابط القروب">
                </div>
            </div>
            <p class="text-xs font-bold mb-2">القروب متاح لل</p>
              <div class="flex items-center space-x-4 space-x-reverse w-full mb-4">
                <div class="flex items-center">
                  <input required v-model="groupData.gender" name="Gender" value="Male" type="radio" class="h-4 w-4 border-gray-300 text-sec focus:ring-sec">
                  <label for="Gender" class="mr-2 block text-sm font-medium text-gray-700">شباب</label>
                </div>
                <div class="flex items-center">
                  <input v-model="groupData.gender" name="Gender" value="Female" type="radio" class="h-4 w-4 border-gray-300 text-sec focus:ring-sec">
                  <label for="Gender" class="mr-2 block text-sm font-medium text-gray-700">بنات</label>
                </div>
                <div class="flex items-center">
                  <input v-model="groupData.gender" name="Gender" value="Male/Female" type="radio" class="h-4 w-4 border-gray-300 text-sec focus:ring-sec">
                  <label for="Gender" class="mr-2 block text-sm font-medium text-gray-700">الكل</label>
                </div>
              </div>
              <p class="text-sm py-1">يرجى التحديد القروب خاص ب</p>
            <div class="-mx-3 md:flex mb-4">
                <div class="md:w-1/2 px-2 py-2 md:py-0">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                        اختر الجامعة 
                    </label>
                    <div class="relative">
                        <select required v-model="universityID" id="university" name="university" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option v-for="university in universities" :key="university.id" :value="university.id">{{university.attributes.name}}</option>
                        </select>
                    </div>
                </div>
                
                <div class="md:w-1/2 px-2 py-2 md:py-0">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                        اختر الكلية
                    </label>
                    <div class="relative">
                        <select  v-model="collageID" id="college" name="college" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option v-for="college in colleges" :key="college.id" :value="college.id">{{college.attributes.name}}</option>
                        </select>
                    </div>
                </div>  

                <div class="md:w-1/2 px-2 py-2 md:py-0">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                       اختر القسم
                    </label>
                    <div class="relative">
                        <select v-model="specialtyID" id="specialty" name="specialty" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option v-for="specialty in specialties" :key="specialty.id" :value="specialty.id">{{specialty.attributes.name}}</option>
                        </select>
                    </div>
                </div>  
                <div class="md:w-1/2 px-2 py-2 md:py-0">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                        اختر المقرر
                    </label>
                    <div class="relative">
                        <select v-model="subjectID" id="subject" name="subject" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{subject.attributes.name}}</option>
                        </select>
                    </div>
                </div>   
            </div>

            <button type="submit" class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-4 rounded-lg flex items-center justify-center w-auto">إضافة القروب</button>
            <p v-if="sucsses" class="text-sm font-normal text-green-500 my-4 text-right md:text-center">{{msg}} - 
                <router-link :to="{name : 'Welcome'}" class="font-bold">العودة للرئيسية</router-link>
            </p>
            <p v-if="error" class="text-sm font-normal text-red-500 my-4 text-right md:text-center">{{msg}} - 
            </p>
        </form>
    </div>
</template>
<script>
    import axios from 'axios'
    export default{
        data(){
            return{
                universities : [],
                colleges : [],
                specialties : [],
                subjects : [],

                universityID : 0,
                collageID :0,
                specialtyID :0,
                subjectID : 0,

                groupData: {
                    name: '',
                    url : '',
                    gender : 0,
                    university : [],
                    subject: [],
                    specialty : [],
                    college : [],
                },
                error : false,
                sucsses : false,
                msg : ''
            }
        },
        watch: {
            universityID(value) {
                this.getCollages(),
                this.groupData.university = this.universityID
            },
            collageID(value){
                this.getSpecialties(),
                this.groupData.college = this.collageID
            },
            specialtyID(value){
                this.getSubjects(),
                this.groupData.specialty = this.specialtyID
            },
            subjectID(value){
                this.groupData.subject = this.specialtyID
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
        methods: {
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
                this.groupData.subject = this.subjectID
            })
        },

        createBGroup: async function(e) {
            e.preventDefault();
        try {
            const groupResult = await axios.post('/api/public-groups',
            {
                data : this.groupData
            },
            { headers: 
                { Authorization : `Bearer ${sessionStorage.getItem("token")}`}}
            )
            this.sucsses = true,
            this.msg = "تم إضافة القروب بنجاح"

        } catch(error) {
            this.error = true
            this.msg = "حدث خطأ يرجى المحاولة مرة أخرى";
        }
        }
    }
}
</script>