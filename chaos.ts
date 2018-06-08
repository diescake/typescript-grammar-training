const p = <T>(data: T): void => {
    // document.body.innerText += `${data} as ${typeof data}\n`;
    console.log(`${data} as ${typeof data}\n`);
};

const str = 'hoge';
p(str);
p<string>(str);
// p<number>(str); // compile error !!

let a: any = 3;
p(a);

let u: number = 3;
// u = null; // compile error !!

let u2: number | null = 3;
u2 = null; // nullable !!


const value = 'hogefoobar';
const len = (value as string).length;
const len2 = (<string>value).length; // conflict JSX style

p(len);
p(len2);


const fn = (f: () => void): void => {
    f();
};

interface PersonConstructor {
    new (name: string, age: number, length?: number): Person;
};

interface Person {
    name: string;
    age: number;
    length?: number;
};

class Me implements Person {
    constructor(readonly name: string, readonly age: number) {
    }

    print(): void {
        p(`Hello, I'm ${this.name} and ${this.age} years old.`);
    }
}

const printPerson = (person: Person): void => {
    p(`Hello, I'm ${person.name} and ${person.age} years old.`);
};

const me = new Me('diescake', 33);
me.print();
printPerson(me);

p(me.name);

printPerson({
    name: 'hogeramia',
    age: 30,
});

printPerson({
    name: 'hogeramia',
    age: 30,
    length: 170
});

const personObject = {} as Person;
personObject.name = 'ホメオスタシス';
personObject.age = 30;


class Employee {
    private _fullName: string;

    constructor() {
        this._fullName = 'John Doe';
    }

    get fullName(): string {
        return this._fullName;

    }

    set fullName(name: string) {
        this._fullName = name;
    }
}

const employee = new Employee();
p(employee.fullName);
employee.fullName = 'diescake';
p(employee.fullName);


const generics = <T>(arg: T): T => {
    return arg;
}

// const genericsArray = <T>(arg: T[]): T[] => { // both syntaxes are OK
const genericsArray = <T>(arg: Array<T>): Array<T> => {
    arg.length;
    return arg;
}

generics('hoge');
genericsArray(['hoge']);

let myGenerics: <U>(arg: U) => U;
myGenerics = generics;


class GenericValue<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

const gv = new GenericValue<number>();
gv.zeroValue = 0;
gv.add = (x: number, y: number): number => {
    return x + y;
};

const gv2 = new GenericValue<string>();
gv2.zeroValue = '';
gv2.add = (x: string, y: string): string => {
    return x + y;
};

// interface Person {
//     name: string;
//     age: number;
//     length?: number;
// };


class Engineer implements Person {
    name: string;
    age: number;
    language: string;

    constructor(name: string, age: number, language: string) {
        this.name = name;
        this.age = age;
        this.language = language
    }
}

class Sales implements Person {
    name: string;
    age: number;
    company: string;

    constructor(name: string, age: number, company: string) {
        this.name = name;
        this.age = age;
        this.company = company
    }
}

const engineer = new Engineer('diescake', 33, 'javascript');
const sales = new Sales('eigyo', 30, 'NTT');

const showInfo = <T extends Person>(person: T): void => {
    p(`INFO: ${person.name}(${person.age})`);
};

showInfo(engineer);
showInfo(sales);
// showInfo({}); // error
showInfo({} as Person);
showInfo({
    name: 'hoge',
    age: 20
});


const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
    return obj[key];
};

const x = {
    a: 1,
    b: 2,
    c: 3,
};

getProperty(x, 'a');
// getProperty(x, 'd'); // error

const mergeClass = <T, U>(first: T, second: U): T & U => {
    const result = <T & U>{};
    for (const id in first) {
        (<T>result)[id] = first[id];
    }

    for (const id in second) {
        (<U>result)[id] = second[id];
    }

    return result;
}

class Hello {
    sayHello(): void {
        p('hello');
    }
}

const hello = new Hello();
const newMe = mergeClass(me, hello);

newMe.sayHello();


class Fish {
    swim() {
        p('swimming !!!!');
    }
}

class Bird {
    fly() {
        p('flying !!!!');
    }
}

const isFishClass = (pet: Fish | Bird): pet is Fish => {
    p(`type is ${typeof pet}`);
    return (<Fish>pet).swim !== undefined;
};

const isBirdClass = (pet: Fish | Bird): pet is Bird => {
    p(`type is ${typeof pet}`);
    return (<Bird>pet).fly !== undefined;
};

const generateUnknownPet = (): Fish | Bird => {
    return new Fish();
};

const pet = generateUnknownPet();

if (isFishClass(pet)) {
    pet.swim(); // pet type is Fish
} else if (isBirdClass(pet)) {
    pet.fly(); // pet type is Bird
} else {
    // pet.fly // pet type is never
}


const isFishClass2 = (pet: any): pet is Fish => {
    return pet instanceof Fish;
};

const isBirdClass2 = (pet: any): pet is Bird => {
    return pet instanceof Bird;
};

if (isFishClass2(pet)) {
    pet.swim(); // pet type is Fish
} else if (isBirdClass2(pet)) {
    pet.fly(); // pet type is Bird
} else {
    // pet.fly // pet type is never
}

const postfix = (s: string | null): void => {
    p(s!.length);
};

const names = ['a', 'b', 'c', 'd'];

names.forEach((name: string): void => {
    p(name);
});

type forEachNames = (name: string) => void;

const pp = (name: string) => {
    p(name);
};
