//Solution 1 for exports

// export const add = (a, b) =>  a + b;
// export const name = "Jonas Graae Hansen";

// const square = (x) => x * x;
// export default square;


// Solution 2 for exports
const add = (a, b) =>  a + b;
const name = "Hola Chica!";

const square = (x) => x * x;

export { add, name, square as default }