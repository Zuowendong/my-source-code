import Vue from "vue";

let vm = new Vue({
    el: "#app",
    data() {
        return {
            title: "Student List",
            classNum: 1,
            total: 2,
            teachers: ["Mrs.Wang", "Mis.Chen"],
            students: [
                { id: 1, name: "jack" },
                { id: 2, name: "tom" },
            ]
        }
    }
})

console.log("Test: ", vm.classNum);
