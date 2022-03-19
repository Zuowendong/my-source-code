function proxyData(vm, target, key) {

    /**
     * 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
     * obj：要定义属性的对象，这里是要修改实例对象
     * prop：要定义或修改的属性的名称或 Symbol，这里就是data中每个key的值
     * descriptor：要定义或修改的属性描述符，在get/set里实现拦截
     */
    Object.defineProperty(vm, key, {
        get() {
            //  vm.key === vm['_data'].key
            return vm[target][key];
        },
        set(newValue) {
            vm[target][key] = newValue;
        },
    })
}

export default proxyData;