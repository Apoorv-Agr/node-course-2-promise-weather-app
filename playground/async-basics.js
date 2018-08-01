console.log('in asyn-basics.js 1');

setTimeout(()=>{
    console.log('In setTimeout 1');
},2000);

setTimeout(()=>{
    console.log('In setTimeout 2');
},0);

console.log('in asyn-basics.js 2')