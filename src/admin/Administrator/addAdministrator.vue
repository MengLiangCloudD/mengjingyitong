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
                    <FormItem label="姓名：">
                        <Input v-model="formInline.user" placeholder="" style="width:200px"/>
                    </FormItem>
                    <FormItem label="电话：">
                        <Input v-model="formInline.tel" placeholder="" style="width:200px"/>
                    </FormItem>
                    <FormItem label="编码：">
                        <Input v-model="formInline.code" placeholder="" style="width:200px"/>
                    </FormItem>
                    <FormItem label="身份证：">
                        <Input v-model="formInline.id" placeholder="" style="width:200px"/>
                    </FormItem>
                    <FormItem label="科室：">
                        <Select v-model="formInline.dep" style="width:200px">
                            <Option v-for="item in cityList5" :value="item.value" :key="item.value">{{item.label }}</Option>
                        </Select>
                    </FormItem>
                    <!-- <FormItem label="性别：">
                        <Select v-model="formInline.sex" style="width:200px">
                            <Option value="nan">男</Option>
                            <Option value="nv">女</Option>
                        </Select>
                    </!--> 
                    <FormItem label="权限：">
                        <Select v-model="formInline.jurisdiction" filterable multiple allow-create @on-create="handleCreate2" style="width:200px">
                            <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <!-- <FormItem label="医生描述：">
                        <Input v-model="formInline.msg" type="textarea"  placeholder="" style="width:200px"/>
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
                biao:'添加医生',
                formInline: {
                    user:'',
                    tel:"",
                    id:"",
                    msg:"",
                    dep:'',
                    code:'',
                    jurisdiction:[]
                },
                cityList4: [
                    {
                        value: '患者管理',
                        label: '患者管理'
                    },
                    {
                        value: '科室管理',
                        label: '科室管理'
                    },
                    {
                        value: '医生管理',
                        label: '医生管理'
                    },
                ],
                cityList5: [
                    {
                        value: '妇科门诊一',
                        label: '妇科门诊一'
                    },
                    {
                        value: '妇科门诊二',
                        label: '妇科门诊二'
                    },
                    {
                        value: '产科门诊一',
                        label: '产科门诊一'
                    },
                    {
                        value: '产科门诊二',
                        label: '产科门诊二'
                    },
                    {
                        value: '儿科门诊一',
                        label: '儿科门诊一'
                    },
                    {
                        value: '儿科门诊二',
                        label: '儿科门诊二'
                    },
                ],
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
                if(this.$route.query.start==0){
                    this.$router.push('/Administrator');
                }else if(this.$route.query.start==1){
                    this.$router.push('/Administrator');
                }
            },
        },
        mounted(){
            if(this.$route.query.start==0){
                this.biao="修改管理员"
            }else if(this.$route.query.start==1){
                this.biao="添加管理员"
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