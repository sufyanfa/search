<template>
    <div id="team" class="section relative pt-20 pb-8 md:pt-16 bg-white">
    <div class="container xl:max-w-6xl mx-auto px-4">
        <div class="text-center mx-auto mb-12">
          <div class="mb-8">
            <h2 class="text-base mb-4 font-semibold text-pri">قروب الجامعة</h2>
            <p class="text-3xl mb-4 font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">
                {{info.descripison}}        
            </p>
            <p class="max-w-xl mx-auto text-xl text-gray-500">
                الهدف هو تسهيل عملية البحث لمساعدة الطلاب في الحصول على المعلومة والمساعدة.
            </p>
          </div>
        </div>
        <div class="flex flex-wrap flex-row -mx-4 justify-center">
            <div class="flex-shrink max-w-full px-4 w-2/3 sm:w-1/2 md:w-5/12 lg:w-1/4 xl:px-6">
                <div class="relative overflow-hidden bg-white mb-12 hover-grayscale-0 fadeInUp">
                    <div class="relative overflow-hidden px-6">
                        <img src="https://pbs.twimg.com/profile_images/1511438467657617415/Dg-BdiNK_400x400.jpg" class="max-w-full h-auto mx-auto rounded-full bg-gray-50" :alt="info.adminNmae">
                    </div>
                    <div class="pt-6 text-center">
                        <p class="text-lg text-sec leading-normal font-bold mb-1">{{info.adminNmae}}</p>
                        <div class="mt-4 mb-5 space-x-2">
                            <a class="px-4 py-3 bg-pri text-xs cursor-pointer text-sec font-semibold rounded hover:bg-gray-800 hover:text-white" :href="info.adminTwitterURL">تابعني</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-shrink max-w-full px-4 w-2/3 sm:w-1/2 md:w-5/12 lg:w-1/4 xl:px-6">
                <div class="relative overflow-hidden bg-white mb-12 hover-grayscale-0 fadeInUp">
                    <div class="relative overflow-hidden px-6">
                        <img src="https://pbs.twimg.com/profile_images/1422620479743987713/H9RwWyUD_400x400.png" class="max-w-full h-auto mx-auto rounded-full bg-gray-50" :alt="info.adminNmae1">
                    </div>
                    <div class="pt-6 text-center">
                        <p class="text-lg text-sec leading-normal font-bold mb-1">{{info.adminNmae1}}</p>
                        <div class="mt-4 mb-5">
                            <a class="px-4 py-3 bg-pri text-xs cursor-pointer text-sec font-semibold rounded hover:bg-gray-800 hover:text-white" :href="info.adminTwitterURL1">تابعني</a>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="w-full mx-auto text-center">
            <p class="text-xl text-gray-500 mb-4">للإستفسارات أو الإبلاغ عن قروب يرجى التواصل معنا</p>
            <a href="mailto:admin@groupsedu.com?subject= - قروبات الجامعة" class="px-4 py-3 bg-slate-900 hover:bg-slate-700 text-xs cursor-pointer text-white font-semibold rounded">التواصل معنا</a>

        </div>
    </div>
</div>
</template>
<script>
    import axios from 'axios'
    export default{
        data() {
            return {
                info : []
            }
        },
        beforeMount() {
            axios({
                url:'/api/abute-us',
                method: 'get',
            }).then((result) => {
                this.info = result.data.data.attributes
            })
        }
    }
</script>