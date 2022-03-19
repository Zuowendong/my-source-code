import Observer from "./observer";

function observe(data) {
    // 观察的不是对象直接退出
    if (typeof data !== "object" || data === null) return
    return new Observer(data);
}

export default observe;