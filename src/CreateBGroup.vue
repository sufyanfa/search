<template>
    <div class="container mx-auto flex flex-col items-center">
        <h1 class="my-6">إنشاء قروب عام</h1>
        <form v-on:submit="createGroup" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <div class="-mx-3 md:flex mb-6">
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                    اسم القروب
                </label>
                <input v-model="groupData.name" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="اكتب اسم القروب">
                </div>
                <div class="md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                    رمز المادة
                </label>
                <input v-model="groupData.code" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="اكتب">
                </div>
            </div>
            <div class="-mx-3 md:flex mb-6">
                <div class="md:w-full px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                    رابط القروب
                </label>
                <input v-model="groupData.URL" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="text" placeholder="ألصق رابط القروب">
                </div>
            </div>
            <div class="-mx-3 md:flex mb-2">
                <div class="md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                        الجامعة
                    </label>
                    <div class="relative">
                        <select v-model="selectID.universityID" id="university" name="university" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option v-for="university in universities" :key="university.id" :value="university.id">{{university.attributes.name}}</option>
                        </select>
                    </div>
                </div>
                
                <div class="md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                        الكلية
                    </label>
                    <div class="relative">
                        <select @click="getCollages()" v-model="selectID.collageID" id="college" name="college" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option v-for="college in colleges" :key="college.id" :value="college.id">{{college.attributes.name}}</option>
                        </select>
                    </div>
                </div>  

                <div class="md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                        القسم
                    </label>
                    <div class="relative">
                        <select @click="getSpecialties()" v-model="selectID.specialtyID" id="specialty" name="specialty" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option v-for="specialty in specialties" :key="specialty.id" :value="specialty.id">{{specialty.attributes.name}}</option>
                        </select>
                    </div>
                </div>  
                <div class="md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                        القسم
                    </label>
                    <div class="relative">
                        <select @click="getSubjects()" v-model="selectID.subjectID" id="subject" name="subject" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{subject.attributes.name}}</option>
                        </select>
                    </div>
                </div>   
            </div>

            <input type="submit" value="Submit">
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
                selectID :{
                    universityID : 0,
                    collageID :0,
                    specialtyID :0,
                    subjectID : 0
                },
                groupData: {
                    name: '',
                    description: '',
                    subject: 0,
                },
                error : '',
                sucsses : ''
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
                url:`/api/universities/${this.selectID.universityID}/?populate=*`,
                method: 'get',
            }).then((result) => {
                this.colleges = result.data.data.attributes.colleges.data
            })
        },
        getSpecialties(){
            axios({
                url:`/api/colleges/${this.selectID.collageID}/?populate=*`,
                method: 'get',
            }).then((result) => {
                this.specialties = result.data.data.attributes.specialties.data
            })
        },
        getSubjects(){
            axios({
                url:`/api/specialties/${this.selectID.specialtyID}/?populate=*`,
                method: 'get',
            }).then((result) => {
                this.subjects = result.data.data.attributes.subjects.data
                this.groupData.subject = this.selectID.subjectID
            })
        },

        createGroup: async function(e) {
      e.preventDefault();
        try {
            const groupResult = await axios.post('/api/groups',{
                data:this.groupData
            })
            this.sucsses = "تم إنشاء القروب"
        } catch(error) {
            this.error = error;
        }
    }
    }
}
</script>