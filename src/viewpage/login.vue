<template>
<div class="hello">
    <h1 class="title">
    统一资源管理平台
    </h1>
    <div class="login">
        <i-form ref="formInline" :model="formInline" :rules="ruleInline">
            <Form-item prop="user">
                <Input v-model="formInline.user">
                  <Icon type="person" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="password">
                <Input v-model="formInline.password" type="password">
                  <Icon type="locked" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item>
                <Button class="submit-button" type="success" @click.native="handleSubmit('formInline')">登录</Button>
                <Button class="reset-button" type="info" @click="handleReset('formInline')">重置</Button>
            </Form-item>
        </i-form>
    </div>
</div>

</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      formInline: {
          user: '',
          password: '',
      },
      ruleInline: {
          user: [{
              required: true,
              message: '请填写用户名',
              trigger: 'blur'
          }],
          password: [{
              required: true,
              message: '请填写密码',
              trigger: 'blur'
          }, {
              type: 'string',
              min: 6,
              message: '密码长度不能小于6位',
              trigger: 'blur'
          }]
      }
    }
  },
  methods: {
      handleSubmit(name) {
          this.$refs[name].validate((valid) => {
                console.log(valid);
                  if (valid) {
                      this.$Message.success('提交成功!');
                      this.$router.push('/Mainpage');
                  } else {
                      this.$Message.error('表单验证失败!');
                  }
              })
          },
      handleReset(name) {
          this.$refs[name].resetFields();
      }
      

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
    /* position: relative; */
    width: 100%;
    height: 100%;
    padding-top: 150px;
    padding-bottom: 200px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #141a48;
    background-image: url("../assets/images/banner_slide_02.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
}
.hello > h1{
  margin-right: 13%;
  text-align: right;
  vertical-align: middle;
  margin-bottom: 20px;
  color: #000;
}
.login {
    /* margin: 0 auto; */
    padding: 200px auto;
    width: 250px;
    height: auto;
    margin-right: 10%;
    float: right;
    /* border:1px solid #000; */
}
.submit-button{
  width: 40%;
  margin-left: 5px;
}
.reset-button{
  width: 40%;
  float: right;
  margin-right: 5px;
}
</style>
