export default{
    state:{ //单个state的变化
        show:false
    },
    getters:{
        not_show(state){ //这里的state是对应的上面的state
            return !state.show;
        }
    },
    mutations:{ //多个state的变化
        switch_dialog(state){
            state.show = state.show?false:true
        }
    },
    actions:{//多个mutations的变化
        switch_dialog(context){
            context.commit('switch_dialog'); //出发switch_dialog 的mutations方法
        }
    }
}