<template>
    <div class="container mx-auto flex flex-col items-center">
        <form v-on:submit="createGroup" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <h1 class="font-bold text-lg text-sec text-right md:text-center mb-2">إنشاء قروب لمقرر</h1>
            <p class="text-sm font-normal mb-2 text-right md:text-center">يجب تحديد معلومات المقرر كاملة</p>
            <p class="text-sm font-normal mb-4 text-right md:text-center">إذا لم يكن المقرر موجود يرجى إضافته عن طريق الرابط
                <router-link :to="{name : 'CreateSubject'}" class="text-pri font-bold hover:text-sec">إضافة مقرر</router-link>
            </p>
            <div class="-mx-3 md:flex mb-4">
                <div class="md:w-1/2 px-2 py-2 md:py-0">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                        اختر الجامعة 
                    </label>
                    <div class="relative">
                        <select required v-model="universityID" id="university" name="university" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option @click="getCollages()" v-for="university in universities" :key="university.id" :value="university.id">{{university.attributes.name}}</option>
                        </select>
                    </div>
                </div>
                
                <div class="md:w-1/2 px-2 py-2 md:py-0">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                        اختر الكلية
                    </label>
                    <div class="relative">
                        <select required v-model="collageID" id="college" name="college" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option v-for="college in colleges" :key="college.id" :value="college.id">{{college.attributes.name}}</option>
                        </select>
                    </div>
                </div>  

                <div class="md:w-1/2 px-2 py-2 md:py-0">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                       اختر القسم
                    </label>
                    <div class="relative">
                        <select required @click="getSpecialties()" v-model="specialtyID" id="specialty" name="specialty" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option v-for="specialty in specialties" :key="specialty.id" :value="specialty.id">{{specialty.attributes.name}}</option>
                        </select>
                    </div>
                </div>  
                <div class="md:w-1/2 px-2 py-2 md:py-0">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                        اختر المقرر
                    </label>
                    <div class="relative">
                        <select required @click="getSubjects()" v-model="subjectID" id="subject" name="subject" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{subject.attributes.name}}</option>
                        </select>
                    </div>
                </div>   
            </div>
            <div class="-mx-3 md:flex mb-4">
                <div class="md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        اسم القروب
                    </label>
                    <input required v-model="groupData.name" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4" type="text" placeholder="ادخل اسم القروب">
                </div>
                <div class="md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                    رمز الشعبة
                </label>
                <input required v-model="groupData.code" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="tel" placeholder="ادخل رقم الشعبة">
                </div>
            </div>
            <div class="-mx-3 md:flex mb-4">
                <div class="md:w-full px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    رابط القروب
                </label>
                <input required v-model="groupData.url" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="text" placeholder="ألصق رابط القروب">
                </div>
            </div>
            <p class="text-xs font-bold mb-2">القروب متاح لل</p>
            <div class="flex items-center space-x-4 space-x-reverse w-full mb-4">
            <div class="flex items-center">
                <input required v-model="groupData.Gender" name="Gender" value="Male" type="radio" class="h-4 w-4 border-gray-300 text-sec focus:ring-sec">
                <label for="Gender" class="mr-2 block text-sm font-medium text-gray-700">شباب</label>
            </div>
            <div class="flex items-center">
                <input v-model="groupData.Gender" name="Gender" value="Female" type="radio" class="h-4 w-4 border-gray-300 text-sec focus:ring-sec">
                <label for="Gender" class="mr-2 block text-sm font-medium text-gray-700">بنات</label>
            </div>
            <div class="flex items-center">
                <input v-model="groupData.Gender" name="Gender" value="Male/Female" type="radio" class="h-4 w-4 border-gray-300 text-sec focus:ring-sec">
                <label for="Gender" class="mr-2 block text-sm font-medium text-gray-700">الكل</label>
            </div>
            </div>
            <button type="submit" class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-4 rounded-lg flex items-center justify-center w-auto">إضافة القروب</button>
            <p v-if="sucsses" class="text-sm font-normal text-green-500 my-4 text-right md:text-center">{{sucsses}} - 
            <router-link :to="{name : 'CreatePage'}" class="font-bold">العودة للرئيسية</router-link>
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
                    description: '',
                    url : '',
                    subject: 0,
                    university : 0,
                    Gender : 0
                },
                error : '',
                sucsses : ''
            }
        },
        watch: {
            universityID(value) {
                this.getCollages(),
                this.groupData.university = this.universityID
            },
            collageID(value){
                this.getSpecialties()
            },
            specialtyID(value){
                this.getSubjects()
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

    createGroup: async function(e) {
      e.preventDefault();
        try {
            const groupResult = await axios.post('/api/groups',
            {
                data : this.groupData
            },
            { headers: 
                { Authorization : `Bearer ${sessionStorage.getItem("token")}`}}
            )
            this.sucsses = "تم إضافة القروب بنجاح"
        } catch(error) {
            this.error = "حدث خطأ يرجى المحاولة مرة أخرى";
        }
    }
    }
}
</script>