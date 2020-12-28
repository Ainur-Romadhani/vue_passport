<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Todo List {{datauser.name}}</h4>
                        <hr>
                        <router-link :to="{name: 'todolist.create', params:{id: datauser.id }}" class="btn btn-md btn-success">Create Todo</router-link>
                        <router-link :to="{name: 'todolist.tongsampah', params:{id: datauser.id }}" class="btn btn-md btn-danger" style="margin-left: 15px">Tong Sampah</router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Start_date</th>
                                    <th scope="col">End_date</th>
                                    <th scope="coll">Proggress</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(todo, index) in datatodo" :key="index">
                                    <td>{{todo.name}}</td>
                                    <td>{{todo.start_date}}</td>
                                    <td>{{todo.end_date}}</td>
                                    <td>{{todo.proggress}} %</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'todolist.edit', params:{id: todo.id_todos }}" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button @click.prevent="todoDelete(todo.id_todos)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

    export default {

        setup(){

        let datatodo = ref([ ])
        let datauser = ref('')

        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

              onMounted(() => {

                  axios.get(`http://localhost:8000/api/todo/index/${route.params.id}`)
                  .then(response => {

                    datauser.value = response.data.data_user  
                    response.data.data_todo.map(res => datatodo.value.push(res));
                    //  datatodo.value = response.data.data
                    //   console.log(datauser.value)

                  }).catch(error => {
                      console.log(error.response.data)
                  })
              }

              )

              function todoDelete(id_todos){

                  let delete_by   = datauser.value.email
                  
                  axios.post(`http://localhost:8000/api/todo/softdelete/${id_todos}`,{

                      delete_by : delete_by

                  }).then(() => {
                      datatodo.value.splice(datatodo.value.indexOf(id_todos),1);

                  }).catch(error => {
                      console.log(error.response.data)
                  })
              }

              return {
                  datatodo,
                  router,
                  route,
                  datauser,
                  todoDelete

              }

        }
    
}
</script>

