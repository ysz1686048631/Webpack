<template>
        <div class="header">
                 <div class="header_con">
                      
                      <div class="test">
                           <span>Webpack+Vue</span>
                           <span>
                               <p>/*</p>
                               <p>{{textArr}}</p>
                               <p class="light">|</p>
                               <p>*/</p>
                           </span> 
                      </div>
                      
                 </div>
        </div>
</template>

<script>
export default {
  name:'toptemp',
  data(){
       return {
             text:[
                  '    I THINK THIS IS THE ONE, ❤IT.      ',
                  '    ALL GOOD THINGS WILL COME.      '
             ],
             textArr:''
       }
  },
  mounted(){
        this.showtext();
  },
  methods:{
        showtext(){
              let num2= 0;
              let count = 0;              
              let num = 1;
              setInterval(()=>{
                    let len = this.text[num2].length
                    if(count>len-1){
                         let len2 = this.textArr.length-1;
                         this.textArr = this.textArr.substring(0,len2);
                         num2=len2<0?num2+1:num2;
                         num2=this.text.length-1<num2?0:num2;
                         count=len2<0?len2+1:count;
                    }else{
                         count=count+num;
                        
                         this.textArr+=this.text[num2][count-1]
                    }
                    
              },100)
        }
  }
}
</script>
<style lang="less" scoped>
 .header{
     
      font-family: "Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1";
      width: 100%;
      &_con{
           width: 100%;
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-content: center;
           align-items: center;
           padding-top: 2rem;
           &>div{

                &:nth-of-type(1){
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    span{
                         margin: 3rem auto;
                         font-family: 'Century Gothic','TeXGyreAdventor',"STHeiti",sans-serif;
                         &:nth-of-type(1){
                             font-size:2.5rem;
                         }
                         &:nth-of-type(2){
                              font-size: .8rem;
                              color: #900;
                              
                              p{
                                   display: inline-block;
                                   letter-spacing:6px
                              }
                         }
                    }
                }
           }
      }
 }
 .light{
      font-weight: bold;
      animation: hides 1.2s linear infinite;
      
 }
 @keyframes hides {
       10%,50%,70%,90%,100%{
            opacity: 1;
       }
        30%,80%{
            opacity: 0;
       }

 }
</style>