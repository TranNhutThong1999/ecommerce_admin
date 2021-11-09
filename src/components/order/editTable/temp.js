// const name = Object.keys(changedValues);
// const index = Object.keys(changedValues[name]);
// const dataSelect = listSelectKey[changedValues[name][index]];
// const newData = [...data];
// if (dataSelect) {
//     // const dataSelectIndex = Object.keys(dataSelect).map(key=>{             
//     // //    if(columnsDataIndexKey[key]?.editable){
//     //      const newKey = `${key}.${index}`;
//     //     return {[newKey]:dataSelect[key]}
//     // //    }
//     // //    return {[key]:dataSelect[key]}  
//     // }) 
//     // const newTab = dataSelectIndex.reduce((a, b) => Object.assign({}, a, b));
//     newData[index] = {
//         ...newData[index],
//         ...dataSelect,
//         key: (parseInt(index) + 1)
//     }
// } else {
//     newData[index] = {
//         ...newData[index],
//         [name]: changedValues[name][index]
//     }
// }



// const renderDataSource = () => {
//     let data;
//     if (mode === 'single') {
//         data = dataSource.map((item, index) => { return {...item, key: index + 1 } })
//     } else {
//         data = dataSource.map((item, index) => {
//             const dataSelectIndex = Object.keys(item).map(key => {
//                 if (columnsDataIndexKey[key] ? .editable) {
//                     const newKey = `${key}.${index}`;
//                     return {
//                         [newKey]: item[key] }
//                 }
//                 return {
//                     [key]: item[key] }
//             })
//             return dataSelectIndex.reduce((a, b) => Object.assign({}, a, b));
//             // return newTab.map(e=>{return {...e, key:(index+1)}})
//         })
//         form.setFieldsValue(data)
//     }
//     console.log(data);
//     setData(data)
// }