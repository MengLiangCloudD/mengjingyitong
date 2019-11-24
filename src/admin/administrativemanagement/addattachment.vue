<template>
    <div style="height:100%;overflow: auto;">
        <div class="titlei">
          <div class="title" style="position: relative;">
            <div class="arrow-icon" @click="tobackdetail">
              <Icon size="30" type="ios-arrow-back" />
            </div>
            {{biao}}
          </div>
        </div>
        <div class="content">
            <div class="input">
                <Form ref="formInline" :model="formInline"  :label-width="80">
                    <FormItem label="科室名称：">
                        <Input v-model="formInline.user" placeholder="" style="width:200px"/>
                    </FormItem>
                    <FormItem label="科室编码：">
                        <Input v-model="formInline.cold" placeholder="" style="width:200px"/>
                    </FormItem>
                    <FormItem label="科室介绍：">
                        <Input v-model="formInline.msg" type="textarea"  placeholder="" style="width:200px"/>
                    </FormItem>
                    <!-- <FormItem label="权限：">
                        <Select v-model="model18" filterable multiple allow-create @on-create="handleCreate2" style="width:200px">
                            <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem> -->
                    <FormItem>
                        <Button type="primary" long style="width:200px">提交</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
         data () {
            return {
                biao:'添加科室',
                formInline: {
                    user:'',
                    cold:"",
                    msg:""
                },
                model18: []
            }
        },
        methods: {
            handleCreate2 (val) {
                this.cityList4.push({
                    value: val,
                    label: val
                });
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            //返回上一层
            tobackdetail(){
                this.$router.push('/administrativemanagement');
            },
        },
        created(){
            if(this.$route.query.start==0){
                this.biao="修改科室"
            }else if(this.$route.query.start==1){
                this.biao="添加科室"
            }
        }
    }
</script>

<style scoped>
.title {
 background: rgb(0, 187, 187);
  font-size: 20px;
  color: white;
  padding: 10px 0;
  text-align: center;
      position: relative;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 8px;
}
.input{
    width: 80%;
    margin: 20px auto;
}
</style>