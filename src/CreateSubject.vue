<template>
    <div class="container mx-auto flex flex-col items-center">
        <form v-on:submit="createSubject" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <h1 class="font-bold text-lg text-sec text-right md:text-center mb-2">إضافة مقرر</h1>
            <p class="text-sm font-normal mb-4 text-right md:text-center">يجب تحديد معلومات المقرر كاملة</p>
            <div class="-mx-3 md:flex mb-4">
                <div class="md:w-1/2 px-2 py-2 md:py-0">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                        اختر الجامعة 
                    </label>
                    <div class="relative">
                        <select v-model="universityID" id="university" name="university" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option @click="getCollages()" v-for="university in universities" :key="university.id" :value="university.id">{{university.attributes.name}}</option>
                        </select>
                    </div>
                </div>
                
                <div class="md:w-1/2 px-2 py-2 md:py-0">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                        اختر الكلية
                    </label>
                    <div class="relative">
                        <select v-model="collageID" id="college" name="college" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option v-for="college in colleges" :key="college.id" :value="college.id">{{college.attributes.name}}</option>
                        </select>
                    </div>
                </div>  

                <div class="md:w-1/2 px-2 py-2 md:py-0">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                       اختر القسم
                    </label>
                    <div class="relative">
                        <select @click="getSpecialties()" v-model="specialtyID" id="specialty" name="specialty" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option v-for="specialty in specialties" :key="specialty.id" :value="specialty.id">{{specialty.attributes.name}}</option>
                        </select>
                    </div>
                </div>     
            </div>
            <div class="-mx-3 md:flex mb-4">
                <div class="md:w-1/2 px-3 py-2 md:py-0">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        اسم المقرر
                    </label>
                    <input required v-model="subjectData.name" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4" type="text" placeholder="ادخل اسم المقرر">
                </div>
                <div class="md:w-1/2 px-3 py-2 md:py-0">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                    رمز المقرر
                </label>
                <input required v-model="subjectData.code" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="text" placeholder="ادخل رمز المقرر 373عال-4">
                </div>
            </div>
            <p v-if="sucsses" class="text-sm font-normal text-green-500 my-4 text-right md:text-center">{{msg}} - 
            <router-link :to="{name : 'Welcome'}" class="font-bold">العودة للرئيسية</router-link>
            </p>
            <p v-if="error" class="text-sm font-normal text-red-500 my-4 text-right md:text-center">{{msg}} - 
            <router-link :to="{name : 'Welcome'}" class="font-bold">العودة للرئيسية</router-link>
            </p>
            <button type="submit" class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-4 rounded-lg flex items-center justify-center w-auto">إضافة المقرر</button>
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

                universityID : 0,
                collageID :0,
                specialtyID :0,

                subjectData: {
                    name: '',
                    code : '',
                    specialty : [],
                },
                error : false,
                sucsses :false,
                msg : ''
            }
        },
        watch: {
            universityID(value) {
                this.getCollages()
            },
            collageID(value){
                this.getSpecialties()
            },
            specialtyID(value){
                this.subjectData.specialty = [this.specialtyID]
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
    createSubject: async function(e) {
      e.preventDefault();
        try {
            const groupResult = await axios.post('/api/subjects',
            {data : this.subjectData
            },
            { headers: 
                { Authorization : `Bearer ${sessionStorage.getItem("token")}`}}
            )
            this.sucsses = true
            this.msg = "تم إضافة المقرر بنجاح"
            this.subjectData = []
        } catch(error) {
            this.error = true
            this.msg = "حدث خطأ يرجى المحاولة مرة أخرى"
            this.subjectData = []
        }
    }
    }
}
</script>