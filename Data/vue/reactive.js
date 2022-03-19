import observe from "./observe";

function defineReactiveData(data, key, value) {

    // 当前观察的值也可能是对象时候，需要递归的去观察
    observe(value);
    Object.defineProperty(data, key, {
        get() {
            console.log(`响应式数据获取：`, value);
            return value;
        },
        set(newValue) {
            console.log('响应式数据设置：', newValue);

            // 数据相同不做任何操作
            if (newValue === value) return;

            // 如果设置的新值还是对象时，也需要再去观察
            observe(newValue);
            value = newValue;
        },
    })
}
export default defineReactiveData;