<template>
              <div class="container">
                    
                    <m-toptemp></m-toptemp>
                   
                  
                    <div class="container-link">
                           <a href="http://www.front527.com/">Blog</a>
                           <a href="https://github.com/ysz1686048631">Github</a>
                    </div>
                     
                   
              </div>
</template>

<script>
import toptemp from './toptemp/top';


export default {
   name:'home',
   mounted(){
         let date = '大道至简，知易行难。从今天开始改变，这是对平庸生活最好的回击'
          let a = 'background: #606060; color: #fff; border-radius: 3px 0 0 3px;'
          let b = 'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;'
          console.log(`%c Tell : %c ${date} `, a, b)
   },
   components:{
         "m-toptemp":toptemp,
       
   }
}
</script>
<style lang="less" scoped>
 .container-link{
     text-align: center;
 }
 

</style>