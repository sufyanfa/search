<template>
  <div class="max-w-5xl mx-auto px-4">
    <nav>
      <div class="flex justify-between">
        <div class="flex space-x-4">
          <div>
            <router-link :to="{name : 'Welcome'}" class="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
              <svg class="ml-2" width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.8936 10.6765C19.8406 9.30478 19.245 8.01028 18.2378 7.07764C17.2306 6.14501 15.8942 5.65059 14.5225 5.70313L7.20675 5.98442C6.5195 5.99889 5.84202 6.15009 5.21383 6.42919C4.58564 6.70829 4.01932 7.1097 3.54793 7.61C3.07653 8.11031 2.7095 8.69949 2.46824 9.34316C2.22698 9.98683 2.11632 10.6721 2.14273 11.359C2.16914 12.0459 2.33209 12.7206 2.62206 13.3439C2.91204 13.9671 3.32323 14.5264 3.83165 14.989C4.34008 15.4516 4.93554 15.8084 5.58331 16.0384C6.23108 16.2685 6.91817 16.3672 7.6045 16.3288L9.6191 16.2523" stroke="#F4B41A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.2963 10.8162C13.2727 12.1887 13.7951 13.5144 14.7487 14.5018C15.7023 15.4892 17.009 16.0574 18.3815 16.0815L25.7015 16.2089C26.3885 16.2328 27.0734 16.1197 27.7162 15.8761C28.359 15.6325 28.9468 15.2633 29.4454 14.7901C29.9439 14.3169 30.3433 13.7491 30.6201 13.1199C30.8969 12.4907 31.0456 11.8126 31.0576 11.1253C31.0696 10.438 30.9445 9.75525 30.6898 9.11679C30.435 8.47834 30.0557 7.89701 29.5739 7.40673C29.0921 6.91644 28.5174 6.52703 27.8835 6.2612C27.2496 5.99537 26.5691 5.85845 25.8817 5.85843L23.8659 5.82243" stroke="#143D59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="font-bold">قروبات الجامعة</span>
            </router-link>
          </div>
        </div>

        <div class="flex items-center space-x-2 space-x-reverse">
          <router-link v-if="logined" :to="{name : 'CreatePage'}" class="py-2 px-2 w-16 text-center text-sec font-medium rounded transition duration-300">التحكم</router-link>
          <router-link :to="{name : 'About'}" class="py-2 px-2 w-16 text-center bg-pri text-sec font-medium rounded transition duration-300">عنا</router-link>
        </div>
      </div>
    </nav>
  <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      logined : false
    }
  },
  async mounted() { 
    try {
      if(sessionStorage.getItem("token")){
        this.logined = true
      }
    } catch (error) {
        this.logined = false;
    }
  }
}
</script>