<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        Socket io with nodejs and vuejs
                    </div>
                    <div class="card-body">
                        <div class="row mb-2">
                            <div class="col-smd-12">
                                <div class="card">
                                    <div class="card-header">
                                        Socket fire event to all client
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group mb-2">
                                            <input
                                                type="text"
                                                v-model="input1"
                                                class="form-control w-100"
                                            />
                                        </div>
                                        <button
                                            @click="onSendEventToAllClient"
                                            type="button"
                                            class="btn btn-sm btn-success"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-2">
                            <div class="col-smd-12">
                                <div class="card">
                                    <div class="card-header">
                                        Socket fire event to all client without
                                        current user
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group mb-2">
                                            <input
                                                type="text"
                                                v-model="input2"
                                                class="form-control w-100"
                                            />
                                        </div>
                                        <button
                                            @click="onSendEventToAllClientWithoutCurrent"
                                            type="button"
                                            class="btn btn-sm btn-success"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-smd-12">
                                <div class="card">
                                    <div class="card-header">
                                        Socket fire event to private (current) client
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group mb-2">
                                            <input
                                                type="text"
                                                v-model="input3"
                                                class="form-control w-100"
                                            />
                                        </div>
                                        <button
                                            @click="onSendEventToCurrent"
                                            type="button"
                                            class="btn btn-sm btn-success"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-smd-12">
                                <div class="card">
                                    <div class="card-header">
                                        Socket working with Laravel Broadcast Event
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group mb-2">
                                            <input
                                                type="text"
                                                v-model="title"
                                                placeholder="Enter message title"
                                                class="form-control w-100"
                                            />
                                        </div>
                                        <div class="form-group mb-2">
                                            <input
                                                type="text"
                                                v-model="body"
                                                 placeholder="Enter message body"
                                                class="form-control w-100"
                                            />
                                        </div>
                                        <button
                                            @click="onSendByLaravelBroadcast"
                                            type="button"
                                            class="btn btn-sm btn-success"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { io } from "socket.io-client";
const socket = io("ws://127.0.0.1:3001");

socket.on("connect", () => {
    console.log(`${socket.id} connected`);
});

socket.on("disconnect", () => {
    console.log("disconnected");
});

export default {
    data() {
        return {
            input1: "",
            input2: "",
            input3: "",
            title: "",
            body: "",
        };
    },
    created() {
        socket.on("fireEventToClient", (data) => {
            console.log("-----fireEventToClient ");
            console.log(data);
            console.log("-----fireEventToClient ");
        });
    },
    methods: {
        onSendEventToAllClient() {
            if (this.input1) {
                socket.emit("fireToServer", this.input1);
            }
        },
        onSendEventToAllClientWithoutCurrent() {
            if (this.input2) {
                socket.emit("broadcastToServer", this.input2);
            }
        },
        onSendEventToCurrent() {
            if (this.input3) {
                socket.emit("privateEventToServer", this.input3);
            }
        },
        onSendByLaravelBroadcast(){
            console.log(this.title, this.body);
        }
    },
};
</script>
