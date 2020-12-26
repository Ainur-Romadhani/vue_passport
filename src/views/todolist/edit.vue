<template>
     <div class="container-fluid mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>FORM EDIT TODO</h4>
                        <router-link :to="{name: 'dashboard'}" class="btn btn-md btn-danger">Dashboard</router-link>
                        <hr>
                        <form @submit.prevent="update">
                            <div class="row">
                                <div class="col-md-10">
                                    <div class="form-group">
                                        <label> Name</label>
                                        <input type="hidden" v-model="data.email" class="form-control" placeholder="Name">
                                        <input type="text" v-model="data.name" class="form-control" placeholder="Name">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-10">
                                    <div class="form-group">
                                        <label>Start date</label>
                                        <input type="date" v-model="data.start_date"  class="form-control" placeholder="Start Date">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-10">
                                    <div class="form-group">
                                        <label>End date</label>
                                        <input type="date" v-model="data.end_date" class="form-control" placeholder="End Date">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-10">
                                    <div class="form-group">
                                        <label>proggress</label>
                                        <input type="number" v-model="data.proggress" class="form-control" placeholder="Proggress">
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Update</button>
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

        const data = reactive({

            email: '',
            name: '',
            start_date: '',
            end_date: '',
            proggress: '',
        })

         //vue router
        const router = useRouter()

        const token = localStorage.getItem('token')

        //vue router
        const route = useRoute()

        onMounted(() => {
            
            axios.get(`http://localhost:8000/api/todo/edit/${route.params.id}`)
            .then(response => {

                data.name       = response.data.data_todo.name
                data.start_date = response.data.data_todo.start_date
                data.end_date   = response.data.data_todo.end_date
                data.proggress  = response.data.data_todo.proggress

            }).catch(error => {
                console.log(error.response.data)
            })

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

        function update(){

            let name        = data.name
            let start_date  = data.start_date
            let end_date    = data.end_date
            let proggress   = data.proggress
            let update_by   = data.email

            axios.put(`http://localhost:8000/api/todo/update/${route.params.id}`,{

                name        :name,
                start_date  :start_date,
                end_date    :end_date,
                proggress   :proggress,
                update_by   :update_by,
                
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
                  update

              }
    }
    
}
</script>