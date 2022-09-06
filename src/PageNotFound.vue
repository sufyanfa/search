<template>
<main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
	<h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
	<div class="bg-pri px-2 text-sm rounded rotate-12 absolute">
		الصفحة غير موجودة
	</div>
	<button class="mt-5">
      <a
        class="relative inline-block text-sm font-medium text-pri group active:text-pri focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-pri group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span class="relative block px-8 py-3 bg-sec border border-current">
          <router-link to="/">العودة للرئيسية</router-link>
        </span>
      </a>
    </button>
</main>
</template>