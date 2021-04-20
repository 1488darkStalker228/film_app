<template>
  <div class="dialog">
    <el-button
      class="dialog__button"
      type="primary"
      @click="dialogFormVisible = true"
    >
      <span class="text">
        Создать список
      </span>
    </el-button>
    <el-dialog
      title="Создание списка:"
      :visible.sync="dialogFormVisible"
      center
    >
      <el-form :model="listData" :rules="rules" ref="ruleForm">
        <el-form-item label="Название" prop="name">
          <el-input v-model="listData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Описание">
          <el-input type="textarea" v-model="listData.decsription" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="createList('ruleForm')">
          Создать
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'DialogCreateList',

    data() {
      return {
        dialogFormVisible: false,

        listData: {
          name: '',
          description: '',
        },

        rules: {
          name: [
            { required: true, message: 'Введите название', trigger: 'blur' },
            { max: 50, message: 'Не более 50 символов', trigger: 'blur' }
          ]
        }
      }
    },

    methods: {
      addUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false;
            this.createList();
            this.listData = {};
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      async createList() {
        const sessionId = JSON.parse(localStorage.getItem('sessionId'));
        const url = `https://api.themoviedb.org/3/list?api_key=${this.$store.getters.API_KEY}&session_id=${sessionId}`;
        const req = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': this.listData.name,
            'description': this.listData.description,
            'language': 'en'
          })
        });
        const res = await req.json();
        console.log(res);
        this.dialogFormVisible = false;
      }
    }
  }
</script>

<style lang="scss">
  @import "DialogCreateList";
</style>