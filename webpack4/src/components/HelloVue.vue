<template>
    <div id = "hello">
        <el-button @click="visible=true">Button</el-button>
        <el-dialog :visible.sync="visible" title="Hello world">
            <p>Try Element</p>
         </el-dialog>
    </div>
    
</template>

<script>
export default {
    name:'HelloVue',
    data:function(){
        return{
            visible:false
        }
    }
}
</script>

<style>

</style>