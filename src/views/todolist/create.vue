<template>
     <div class="container-fluid mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>FORM TAMBAH TODO</h4>
                        <router-link :to="{name: 'dashboard'}" class="btn btn-md btn-danger">Dashboard</router-link>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="row">
                                <div class="col-md-10">
                                    <div class="form-group">
                                        <label> Name</label>
                                        <input type="hidden" v-model="data.id" class="form-control" placeholder="Full Name">
                                        <input type="hidden" v-model="data.email" class="form-control" placeholder="Name">
                                        <input type="text" v-model="todo.name" class="form-control" placeholder="Name">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-10">
                                    <div class="form-group">
                                        <label>Start date</label>
                                        <input type="date" v-model="todo.start_date" class="form-control" placeholder="Start Date">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-10">
                                    <div class="form-group">
                                        <label>End date</label>
                                        <input type="date" v-model="todo.end_date" class="form-control" placeholder="End Date">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-10">
                                    <div class="form-group">
                                        <label>proggress</label>
                                        <input type="number" v-model="todo.proggress" class="form-control" placeholder="Proggress">
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Tambah</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     </div>
</template>

<script>
import {reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    
    setup(){

        const todo = reactive({
            name: '',
            start_date: '',
            end_date: '',
            proggress: '',
        })

        const data = reactive({
            id: '',
            email: ''
        })
        //vue router
        const router = useRouter()

        const token = localStorage.getItem('token')

        //vue router
        const route = useRoute()

        // let datauser = ref('')
        // let user = ref('')

        onMounted(() => {
            axios.get(`http://localhost:8000/api/todo/create/${route.params.id}`)
            .then(response => {

                // datauser.value = response.data.data_user
                data.id = response.data.data_user.id

            }).catch(error => {
                console.log(error.response.data)
            })

            // 
             axios.defaults.headers.common.Authorization = `Bearer ${token}`
                axios.get('http://localhost:8000/api/user')
                .then(response => {

                    //console.log(response.data.name)
                    // user.value = response.data
                    data.email = response.data.email
                    console.log(data.email)

                })
                .catch(error => {
                    console.log(error.response.data)
                })
            
        })

        function store(){

            let name        = todo.name
            let start_date  = todo.start_date
            let end_date    = todo.end_date
            let proggress   = todo.proggress
            let create_by   = data.email
            let user_id     = data.id
            
            axios.post('http://localhost:8000/api/todo/store',{

                name        :name,
                start_date  :start_date,
                end_date    :end_date,
                proggress   :proggress,
                create_by   :create_by,
                user_id     :user_id,

            }).then(() => {
                router.push({
                    name: 'dashboard'
                })
            })

        }
        
        return {
                  router,
                  route,
                  data,
                  token,
                  todo,store

              }
    }
}
</script>