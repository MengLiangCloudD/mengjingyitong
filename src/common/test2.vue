<template>
  <div>
      test2
      {{$route.fullPath}}
      <button @click="topath">去test1</button>
  </div>
</template>

<script>
export default {
    methods:{
        topath(){
            this.$router.push("/test1")
        }
        
    },
    created(){
        console.log(this.$route)
    }
}
</script>

<style>

</style>