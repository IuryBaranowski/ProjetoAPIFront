<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <nav class="nav-wrapper blue darken-1">
      <a href="# class="brand-logo"">Cadastro de itens</a>
    </nav>

    <img alt="Vue logo" src="./assets/logo.png">

    <form @submit.prevent="saveAndUpdateItem">
      <div>
        <input type="text" v-model="item.name" placeholder="Digite o nome do Item" required>
      </div>

      <div>
        <input type="text" v-model="item.power"placeholder="Digite o poder do item" required>
      </div>
      <button class="waves-effect waves-light btn-small">Salvar</button>
    </form>

    <div v-show="findItem.id">
      <h1>Item encontrado</h1>
      <p>
        Código: {{findItem.id}} <br>
        Nome do item: {{findItem.id}} <br>
        Poder do item: {{findItem.id}} <br>
      </p>

    </div>

    <p>Quantidade de itens {{items.lenght}}</p>

    <table v-show="items.length > 0">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Poder</th>
          <th>Quantidade de poder</th>
          <th>Excluir</th>
          <th>Atualizar</th>
        </tr>
      </thead>
      <tfoot>
        <th>Código</th>
        <th>Nome</th>
        <th>Poder</th>
        <th>Excluir</th>
        <th>Atualizar</th>
      </tfoot>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.power}}</td>
          <td>{{item.powerValue}}</td>
          <td>
            <button @click="deleteItem(item)" class="waves-effect waves-light btn-small">Excluir</button>
          </td>
          <td>
            <button @click="updateItem(item)" class="wave-effect waves-light btn-small">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import ItemServices from './service/itemservices'
export default {
  data() {
    return {
      item: {
        id: '',
        itemName: '',
        power: '',
        powerValue: ''
      },
      findItem: {
        id: '',
        itemName: '',
        power: '',
        powerValue: ''
      },
      items []
    }
  },
  name: 'App',
  components: {
  },
  mounted() {
    this.listItems();
  },
  methods: {
    listItems() {
      ItemServices.findAll().then(response => {
        this.items = response.data;
      });
    },
    saveAndUpdateItem() {
      if(!this.item.id) {
        ItemServices.save(this.item).then(response => {
          this.item = {};
          this.listItems();
          alert("Item cadastrado com sucesso!")
          return response; //Gambi para utilizar o response
        });

      } else {

        ItemServices.update(this.item).then(response => {
          this.item = {};
          this.listItems();
          alert("Item excluido com sucesso!");
          return response; //Gambi para utilizar o response

      }
    },
    deleteItem(item) {
      console.log(`id: ${item.id}`);
      ItemServices.delete(item).then(response => {
        this.listItems();
        alert("Item atualizado com sucesso");
        return response; //Gambi para utilizar o response
    });
  },
  findById() {
    ItemServices.findById(this.item).then(response => {
      this.findItem = response.data;
    });
  },
  updateItem(item) {
    this.item = item;
  }
}
</script>

<style>

*{
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
