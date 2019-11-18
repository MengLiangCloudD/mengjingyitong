<template>
    <div class="shortcutenter">
        <div class="item">
            <a  id="d1" ></a>
            <p class="d1" @click="scrollto(1)">
                <a  class="ad1" >
                    <img src="@/assets/cursor.png" alt="">
                </a>
                <!-- <span>请点击服务选择患者挂号</span> -->
            </p>
            <img src="@/assets/help/register/register-1.jpg" alt="">
        </div>
        <div class="item">
            <a  id="d2" >
               
            </a>
            <p class="d2" @click="scrollto(2)">
                <a class="ad2" >
                     <img src="@/assets/cursor.png" alt="">
                </a>
                <!-- <span>请选择医生</span> -->
            </p>
            <img src="@/assets/help/register/register-2.jpg" alt="">
        </div>
        <div class="item">
            <a  id="d3" ></a>
            <p class="d3" @click="scrollto(3)">
                <a class="ad3" >
                    <img src="@/assets/cursor.png" alt="">
                </a>
                <!-- <span>请选择预约</span> -->
            </p>
            <img src="@/assets/help/register/register-3.jpg" alt="">
        </div>
        <div class="item">
            <a  id="d4" ></a>
            <p class="d4" @click="scrollto(4)">
                <a class="ad4" >
                    <img src="@/assets/cursor.png" alt="">
                </a>
                <!-- <span>点击确认挂号</span> -->
            </p>
            <img src="@/assets/help/register/register-4.jpg" alt="">
        </div>
        <div class="item">
            <a  id="d5" ></a>
            <p class="d5" @click="scrollto(5)">
                <a class="ad5" >
                    <img src="@/assets/cursor.png" alt="">
                </a>
                <!-- <span>请选择立即支付进行付费</span> -->
            </p>
            <img src="@/assets/help/register/register-5.jpg" alt="">
        </div>
        <div class="item">
            <a  id="d6" ></a>
            <p class="d6"  @click="scrollto(6)">
                <a class="ad6" >
                    <img src="@/assets/cursor.png" alt="">
                </a>
                <!-- <span>点击我的进入个人中心</span> -->
            </p>
            <img src="@/assets/help/register/register-2.jpg" alt="">
        </div>
        <div class="item">
            <a  id="d7" ></a>
            <p class="d7" @click="scrollto(7)">
                <a class="ad7" >
                    <img src="@/assets/cursor.png" alt="">
                </a>
                <!-- <span>选择我的挂号</span> -->
            </p>
            <img src="@/assets/help/register/register-7.jpg" alt="">
        </div>
        <div class="item">
            <a  id="d8" ></a>
            <p class="d8">
                <a class="ad8" >
                    <!-- <img src="@/assets/cursor.png" alt=""> -->
                </a>
                <!-- <span>我的挂号订单，也可以在这里进行支付</span> -->
            </p>
            <img src="@/assets/help/register/register-6.jpg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    methods:{
        scrollto(index){
            var container =document.getElementsByClassName("shortcutenter")[0];
            container.scrollTop=+window.innerHeight*index
        }
    },
    created(){
    }
}
</script>

<style scoped>
#d1,#d2,#d3,#d4,#d5,#d6,#d7{
    position: absolute;
    top: 0;
}
.shortcutenter{
    height: 100%;
    overflow: auto;
}
.shortcutenter img{
    width: 100vw;
    height: 100vh;
    
}
.shortcutenter .item{
    width: 100vw;
    height: 100vh;
    position: relative;
}
.shortcutenter .d1{
    position: absolute;
    top: 70vh;
    right: 30vw;
    width: 30vw;
    color: red;
    text-align: center;
}
.ad1{
    display: inline-block;
    width: 120px;
    height: 40px;
    /* border: 1px solid red; */
    margin-bottom: 5px;
    position: relative;
}
.ad1 img{
    position: absolute;
    top: 3vh;
    right: 7vw;
    width: 15vw;
    height: 15vw;
    color: red;
    text-align: center;
}
.shortcutenter .d2{
    position: absolute;
    top: 56vh;
    right: 10vw;
    width: 120px;
    color: red;
    text-align: center;
}
.ad2{
    display: inline-block;
    width: 120px;
    height: 40px;
    /* border: 1px solid red; */
    margin-bottom: 5px;
    position: relative;
}
.ad2 img{
    position: absolute;
    top: 3vh;
    right: 7vw;
    width: 15vw;
    height: 15vw;
    color: red;
    text-align: center;
}
.shortcutenter .d3{
    position: absolute;
    top: 62vh;
    right: 55vw;
    width: 40vw;
    color: red;
    text-align: center;
}
.ad3{
    display: inline-block;
    width: 100%;
    height: 40px;
    /* border: 1px solid red; */
    margin-bottom: 15px;
}
.ad3 img{
    position: absolute;
    top: 1vh;
    right: 10vw;
    width: 15vw;
    height: 15vw;
    color: red;
    text-align: center;
}
.shortcutenter .d4{
    position: absolute;
    top: 68vh;
    right: 0;
    width: 100%;
    color: red;
    text-align: center;
}
.ad4{
    display: inline-block;
    width: 100%;
    height: 40px;
    /* border: 1px solid red; */
    margin-bottom: 5px;
}
.ad4 img{
    position: absolute;
    top: 2vh;
    right: 40vw;
    width: 15vw;
    height: 15vw;
    color: red;
    text-align: center;
}
.shortcutenter .d5{
    position: absolute;
    top: 77vh;
    right: 100px;
    width: 180px;
    color: red;
    text-align: center;
}
.ad5{
    display: inline-block;
    width: 100%;
    height: 30px;
    /* border: 1px solid red; */
    margin-bottom: 5px;
}
.ad5 img{
    position: absolute;
    top: 2vh;
    right: 15vw;
    width: 15vw;
    height: 15vw;
    color: red;
    text-align: center;
}
.shortcutenter .d6{
    position: absolute;
    top: 87vh;
    right: 2vw;
    width: 20vw;
    color: red;
    text-align: center;
}
.ad6{
    display: block;
    width: 20vw;
    height: 30px;
    /* border: 1px solid red; */
    margin-bottom: 5px;
    position: relative;
}
.ad6 img{
    position: absolute;
    top: 1vh;
    right: 1vw;
    width: 15vw;
    height: 15vw;
    color: red;
    text-align: center;
}
.shortcutenter .d7{
    position: absolute;
    top: 36vh;
    right: 0px;
    width: 100%;
    color: red;
    text-align: center;
}
.ad7{
    display: inline-block;
    width: 100%;
    height: 30px;
    /* border: 1px solid red; */
    margin-bottom: 5px;
}
.ad7 img{
    position: absolute;
    top: 1vh;
    right: 60vw;
    width: 15vw;
    height: 15vw;
    color: red;
    text-align: center;
}
.shortcutenter .d8{
    position: absolute;
    top: 25vh;
    right: 0px;
    width: 100%;
    color: red;
    text-align: center;
}
.ad8{
    display: inline-block;
    width: 100%;
    height: 50vh;
    /* border: 1px solid red; */
    margin-bottom: 5px;
}
.ad8 img{
    position: absolute;
    bottom: 5vh;
    right: 6vw;
    width: 15vw;
    height: 15vw;
    color: red;
    text-align: center;
}
</style>