<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TONG SAMPAH</h4>
                        <router-link :to="{name: 'dashboard'}" class="btn btn-md btn-danger">Dashboard</router-link>
                        <hr>
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
                                <tr v-for="(todo, index) in data_todo" :key="index">
                                    <td>{{todo.name}}</td>
                                    <td>{{todo.start_date}}</td>
                                    <td>{{todo.end_date}}</td>
                                    <td>{{todo.proggress}}</td>
                                    <td>
                                        <button @click.prevent="todorestore(todo.id_todos)" class="btn btn-sm btn-primary ml-1">RESTORE</button>
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

        let data_todo = ref ([])
        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

        onMounted(() => {

            axios.get(`http://localhost:8000/api/todo/tongsampah/${route.params.id}`)
            .then(response => {

                 response.data.data_todo.map(res => data_todo.value.push(res));
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function todorestore(id_todos){

            axios.post(`http://localhost:8000/api/todo/restore/${id_todos}`)
            .then(() => {

                data_todo.value.splice(data_todo.value.indexOf(id_todos),1);

            }).catch(error => {
                console.log(error.response.data)
            })
        }

        function todoDelete(id_todos){

            axios.post(`http://localhost:8000/api/todo/delete/${id_todos}`)
            .then(() => {

                data_todo.value.splice(data_todo.value.indexOf(id_todos),1);

            }).catch(error => {
                console.log(error.response.data)
            })
        }

        return{

            data_todo,
            router,route,todorestore,todoDelete

        }
    }
    
    
}
</script>