<template>
    <div class="w-full mx-auto my-4">
        <div class="bg-white shadow-lg rounded-sm border border-gray-200">
            <header class="px-5 py-4 border-b border-gray-100">

                <div class="relative w-full">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" v-model="search" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 " placeholder="البحث برقم الشعبة">
                </div>

            </header>
            <div class="p-3">
                <div v-if="loading">
                    <div aria-label="جاري التحميل ..." role="status" class="flex items-center space-x-2"><svg class="h-6 w-6 animate-spin stroke-gray-500" viewBox="0 0 256 256"><line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg><span class="text-xs font-medium text-gray-500">جاري التحميل ...</span></div>
                </div>
                <div v-else class="overflow-x-auto">
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
    
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y text-right divide-gray-100">
                            <tr class="cursor-pointer" v-for="group in filteredGroups" :key="group.id">
                                <td class="p-2 whitespace-nowrap">
                                    <a class="font-medium text-blue-500 hover:text-blue-700" v-if="startsWithNumber(group.attributes.url)" :href="`https://wa.me/${group.attributes.url}?text=اود الانضمام لقروب ${group.attributes.name}`">
                                        {{group.attributes.name}}
                                    </a>
                                    <a class="font-medium text-blue-500 hover:text-blue-700" v-else :href="group.attributes.url">
                                        {{group.attributes.name}}
                                    </a>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div>{{group.attributes.subject.data ? group.attributes.subject.data.attributes.name : "-"}}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div v-if="group.attributes.gender == 'Male'">شباب</div>
                                    <div v-else-if="group.attributes.gender == 'Female'">بنات</div>
                                    <div v-else>الجميع</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="font-medium text-green-500">
                                        {{group.attributes.university.data.attributes.name}}
                                    </div>
                                </td>
                            </tr>

                            <tr class="group error" v-if="!filteredGroups.length">
                                <td class="p-2 whitespace-nowrap">
                                    <div>لايوجد نتيجة!</div>
                                </td>
                            </tr>
                        </tbody>        
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['groups','loading'],
  data () {
    return{
        search : ''
    }
  },
  computed: {
    filteredGroups() {
      return this.groups.filter(group => {
        return group.attributes.division.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods : {
    select: function(event) {
        console.log("d")
        window.location.href = group.attributes.url
    },
    startsWithNumber : function(str){
        return /^\d/.test(str);
    }
  }
}
</script>