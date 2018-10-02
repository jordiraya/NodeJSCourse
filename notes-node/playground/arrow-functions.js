// statement syntax for arrow functions
var square1 = (x) => {
    var result = x * x;
    return result;
};

// expression syntax for arrow functions
var square2 = (x) => x * x;
var square3 = x => x * x;

console.log(square1(9));
console.log(square2(9));
console.log(square3(9));
console.log(`---`);

// normal functions vs arrow functions in objects
var user = {
    name: 'Andrew',
    sayHi: () => {
        console.log(`global arguments`);
        console.log(arguments);
        console.log(`(refers to parent function: undefined) Hi. I'm ${this.name}`);        
    },
    sayHiAlt() {
        console.log(`function arguments`);
        console.log(arguments);
        console.log(`(refers to parent object: Andrew) Hi. I'm ${this.name}`);
    }    
}

user.sayHi(1,2,3);
console.log(`---`);
user.sayHiAlt(1,2,3);