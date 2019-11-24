<template>
    <div style="height:100%;overflow: auto;">
        <div class="titlei">
          <div class="title" style="position: relative;">
            <div class="arrow-icon" @click="tobackdetail">
              <Icon size="30" type="ios-arrow-back" />
            </div>
            添加医生
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
                    <FormItem label="邮箱：">
                        <Input v-model="formInline.email" placeholder="" style="width:200px"/>
                    </FormItem>
                    <FormItem label="身份证：">
                        <Input v-model="formInline.id" placeholder="" style="width:200px"/>
                    </FormItem>
                    <FormItem label="医生描述：">
                        <Input v-model="formInline.msg" type="textarea"  placeholder="" style="width:200px"/>
                    </FormItem>
                    <FormItem label="性别：">
                        <Select v-model="formInline.sex" style="width:200px">
                            <Option value="nan">男</Option>
                            <Option value="nv">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="权限：">
                        <Select v-model="model18" filterable multiple allow-create @on-create="handleCreate2" style="width:200px">
                            <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
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
                formInline: {
                    user:'',
                    sex:"",
                    tel:"",
                    email:"",
                    id:"",
                    msg:""
                },
                cityList4: [
                    {
                        value: '复诊',
                        label: '复诊'
                    },
                    {
                        value: '咨询',
                        label: '咨询'
                    },
                    {
                        value: '出诊',
                        label: '出诊'
                    },
                ],
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
                this.$router.push('/doctormanagement');
            },
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