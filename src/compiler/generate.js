function genProps(attrs) {
  let str = "";

  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];

    // console.log(attr); // {name: 'style', value: 'color: red; font-size: 20px'}
    if (attr.name === "style") {
      let obj = {};
      // 'color: red; font-size: 20px'
      attr.value.split(";").forEach((item) => {
        let [key, val] = item.split(":");
        obj[key] = val;

        // console.log(obj); // {color: ' red', " font-size": ' 20px'}
      });
      attr.value = obj;
    }
    // console.log(attr); // {name: "style", value: {color: 'red', "font-size": '20px'}}

    // 拼接
    str += `${attr.name}:${JSON.stringify(attr.value)},`;
  }

  // console.log(str); // id:"app",style:{"color":" red"," font-size":" 20px"},
  return `{${str.slice(0, -1)}}`; // 去除末尾的 ,
}

export function generate(ast) {
  // console.log(ast);
  let code = `_c(${ast.tag},${
    ast.attrs.length ? `${genProps(ast.attrs)}` : "null"
  })`;

  console.log(code);
}
