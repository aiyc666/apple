'use strict';

function run(fun, flag) {
    if (flag !== false) fun();
}

var log = console.log,
    err = console.error,
    info = console.info;

// ==================> 1. 简介 <===========================
run(function () {
    // ES 5
    // ES 5.1
    // ES 6
    // ES 2015
    // ES 2016
});

// ==================> 2. let const <======================
run(function() {

    for (let i = 0; i < 3; i++) {
        let i = 'abc';
        console.log(i);
    }

    // console.log(i);

    /*let x = do */
    {
        let i = 1;
        {
            // let i = 3;
            // i = 3; // TDZ
            let i = 4;
            console.log(i);
            // let i = 2;
            if (true) {
                let i = 5;
                console.log(i);
            }
        }
    }

    // console.log(x);

    function a(x = 1, y = 2) {
        return [x, y];
    }
    console.log('a:' + a());


    // 2: const
    const aa = 1;
    err(aa);
    // a = 2;
    const obj = {};
    obj.a = 'aa';
    err(obj.a);
    // obj = {};

    Object.freeze(obj);
    // obj.b = 'bbb';

}, false);
// var g = 'ggg';
// let g = 'g22';
// err(window.g);
// err(self.g);
// err(global.g);


// ==================> 3. 变量的解构赋值 <=====================
run(function () {
    // 1: 数组
    let [a, b, c] = [1, 2, 3];
    log(a, b, c);
    // 默认值、嵌套

    // 2: 对象
    let {o1, o2} = {o1: 111, o2: 222};
    // let {o1: o1, o2: o2} = {o1: 111, o2: 222};
    log(o1, o2);

    // 3: 字符串
    const [s1, s2, s3] = 'boy';
    log(s1, s2, s3);
    let {length} = [1, 2];
    log('length:' + length);
    let {add} = new Set();
    log('add:' + add);

    // 4: Number , Boolean

    // 5: 函数参数

    // 6: 圆括号 parentheses
    // let [(p)] = [1];

    // 7: 用途
    // swap
    let x = 1, y = 2;
    [x, y] = [y, x];
    log(x, y);

    // 从函数返回多个值

    // 函数参数的定义

    // 提取JSON数据

    // 函数参数的默认值

    // 遍历Map结构

    // 输入模块的指定方法

}, false);



// =================> 4. 字符串扩展 <======================
run(function() {
    // integer
    // 0nnn...  : octal
    // 0xnnn... : hex

    // \nnn   : octal literals
    // \xnn   : hex literals
    // \unnnn : unicode literals
    // log('\z, \172, \x7A, \u007A, \u{7A}');

    log('\u{20BB7}');
    log("\u{41}\u{42}\u{43}");
    log("\u{1F680}");
    log("\u1F680");
    log("\uD83D");
    log('\uDE80');
    log('\u{1F680}' === '\uD83D\uDE80');
    log('\u{20BB7}');

    log('\u2661 \u2764 \u32a5 \u263a \u263b \u266b \u266c');
    log(`
    \u{1F407} \u{1F409} \u{1F41C}
    \u{1F466} \u{1F467} \u{1F46B} \u{1F4A9}
    \u{1F600} \u{1F603} \u{1F60A}
    \u{20000} \u{20115} \u{20BB7} \u{2000b} \u{2f888}
`);

    let s = "𠮷";
    log(s.length);
    log(s.charAt(0));
    log(s.charAt(1));
    log(s.charCodeAt(0));
    log(s.charCodeAt(1));
    log(s.charCodeAt(2));
    log(s.codePointAt(0));
    log(s.codePointAt(1));

    for (let ch of s) {
        log(ch);
    }

    // 1: codePointAt();
    function is32Bit(c) {
        return c.codePointAt(0) > 0xFFFF;
    }

    // 2: fromCodePoint();
    log(String.fromCodePoint(0x78, 0x1F680, 0x79));

    // log('\u{20BB7}'.at(0))

    // 3: normalize()

    // 4: includes() , startsWith() , endsWith()

    // 5: padStart() , padEnd()

    // 6: repeat()
    log('0'.repeat(16));

    // 7: 模板字符串
    let i = 0;
    log(`
        <ul>
            <li>${++i}</li>
            <li>${++i}</li>
            <li>${++i}</li>
        </ul>
    `);

    // 8: 标签模板

    // 9: String.raw()

}, false);


// ==================> 5. 正则的扩展 <===================
run(function () {
    // 1: RegExp构造函数

    // 2: 字符串的正则方法

    // 3: u修饰符
    log(/ ^.$/.test("𠮷"));
    log(/^.$/u.test("𠮷"));

    // 4: y修饰符

    // 5: sticky属性

    // 6: flags属性

    // 7: RegExp.escape()

    // 8: s修饰符，dotAll模式
    let str = "a\nb";
    log(/a.b/.test(str));
    log(/a[^]b/.test(str));
    // log(/a.b/s.test(str));

    // 9: 后行断言，反向预查
    log(/\d(?=%)/.exec("8% 9a"));
    log(/\d(?!%)/.exec("8% 9a"));
    // log(/(?<=\$)\d/.exec("$8"));
    // /(?<!\$)\d+/.exec('it’s is worth about €90');

    // 10: Unicode属性类

}, false);


// ==================> 6. 数值扩展 <=========================
run(function () {
    // 1: 二进制和八进制表示法
    log(0b110);
    log(0o10);

    // 2: Number.isFinite() , Number.isNaN()
    log(isNaN('3a'));
    log(Number.isNaN('3a'));
    log(Number.isNaN('3'));
    log(Number.isNaN(3));

    // 3: Number.parseInt() , Number.parseFloat()

    // 4: Number.isInteger()
    log(Number.isInteger(5));
    log(Number.isInteger(5.0));
    log(Number.isInteger(5.1));

    // 5: Number.EPSILON

    // 6: 安全整数和Number.isSafeInteger()

    // 7: Math扩展
    log('---- Math -----');
    log(Math.trunc(1.234));
    log(Math.sign(2));
    log(Math.sign(-2));
    log(Math.sign(0));
    log(Math.sign(+0));
    log(Math.sign(-0));
    log(Math.log2(8));
    log(Math.log10(100));

    // 8: Math.signbit()

    // 9: 指数运算符
    // log(2 ** 3);
    // let p = 3;
    // log(p **= 3);

}, false);


// ===========================> 7. 数组扩展 <=====================
run(function () {
    // 1: Array.from()
    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 4
    };

    debugger;

    // ES5
    let arr1 = [].slice.call(arrayLike);

    // ES6
    let arr2 = Array.from(arrayLike);

    // 2: Array.of()
    let arr3 = Array.of(1, 2, 3, '4', true, {}, [1]);


    // 3: copyWithin()

    // 4: find() , findIndex()
    [1, 4, 8, 9, 11].find((n) => {
        return n > 8;
    });

    // 5: fill()
    log([1, 2, 3, 4, 5].fill('-', 3));

    // 6: entries() , keys() , values() , 均返回Iterator对象，可用for of 遍历
    let arr4 = [1, '2', false, null, , {o: 11}, [0]];
    for(let [idx, val] of arr4.entries()) {
        debugger;
        log(idx, val);
    }

    // 7: includes()

    // 8: 数组的空位



}, false);


// ========================> 8. 函数扩展 <=========================
run(function () {
    // 1: 函数参数默认值
    function f1(a = 1, b = 2) {
        log(a, b);
    }
    f1(3);

    // function fp(a, a) {};

    function f2(e, [a, b = 2, c = 3] = [], d) {
        log(a, b, c);
    }
    f2(3, [1], 5);
    log('f2 params:' + f2.length);

    function f3({a = 1, b = 2}) {
        log(a , b);
    }
    f3({a: 'aa', c: 'cc'});
    log('f3 params:' + f3.length);

    // 作用域
    // let fn = () => x;
    // function fs(x, y = fn) {
    function fs(x, y = () => x) {
        return y;
    }

    let y1 = fs(1);
    let y2 = fs(2);

    log('y1 === y2 : ', y1 === y2); // false
    log('y1: ', y1());  // 1
    log('y2: ', y2());  // 2


    // 2: rest参数
    function r(a, ...b) {
        log(a, b);
        log(a, ...b);
    }
    r(1, 2, 3);

    log('--------- ... ----------');
    // 3: 扩展运算符
    let arr1 = [1, 2, 5],
        arr2 = ['a', 'b'],
        arr3 = [...arr1, ...arr2];
    log(arr3);
    arr2.push(8, 8, ...arr1, 8, 8, ...arr2);
    log(arr2);
    log(...'hello');

    log(Math.max.apply(null, arr1));
    log(Math.max(...arr1));
    const [a, ...b] = arr1;
    log(a, b);

    // 4: 严格模式
    function strictFn(x = 1) {
        // 'use strict';
        log('strict', 11);
    }
    strictFn();

    log('--------- name ---------');
    // 5: name属性
    // 具名函数、匿名函数
    log(function fn() {}.name);
    log(function() {}.name);
    let fn2;
    log((fn2 = function(){}).name);
    log((fn2 = function f22() {}).name);
    log(function(){}.bind({}).name);
    log(function f3(){}.bind({}).name);
    log((new Function).name);

    log('------------> ');
    // 6: 箭头函数 , 箭头函数中的this指向定义Scope中的this，且不可改变，故call, apply, bind 不起作用
    let sqr = x => x * x;
    log(sqr(5));
    log([1, 2, 3].map((n) => ({a: n})));


    // 7: 绑定this
    // let bfn = ::Math.max;
    // bfn(1, 2);

    // 8: 尾调用优化 ，尾递归节省内存不会溢出

    // 阶乘
    function factorial(n) {
        if (n == 1)
            return 1;
        return n * factorial(n - 1);
    }

    function factorial2(n, value) {
        'use strict';
        if (n == 1)
            return value;
        return factorial2(n - 1, n * value);
    }

    // 斐波那契
    function fib(n) {
        if (n == 0) return 0;
        if (n == 1) return 1;
        return fib(n - 1) + fib(n - 2);
    }

    // fib(50);

    function fib2(n) {
        if (n == 0) return 0;
        if (n == 1) return 1;

        let [_sum, sum] = [0, 1];
        for (let i = 0; i < n - 1; i++) {
            [_sum, sum] = [sum, _sum + sum];
        }
        return sum;
    }

    function fib3(n = 0, [s1 = 0, s2 = 1] = []) {
        if (n == 0) return s1;
        if (n == 1) return s2;
        return fib3(n - 1, [s2, s1 + s2]);
    }


    // 9: 函数参数的尾逗号
    /*function tailComma(
        a,
        b,
    ) {
        log(a, b);
    }

    tailComma(1, 2,);*/

}, false);


// ======================> 9. 对象扩展 <=========================
run(function () {
    // 1. 属性的简洁表示法
    let pp = 1,
        po = {a: 'aa', b: 'bb'},
        o = {
            pp,
            fn() { return 1; },
            // [po.a]
            // {a = po.a}
            get p() { return 'get'; },
            set p(p) { return 'set'; }
        };
        log(o);
    // o.getP();

    // 2. 属性名表达式
    let or = {
        ['a' + 'b']: 'aabb',
        [po.a]: 'aaa',
        // [(po.a)],
        [po.b + 1]: function() {
            return 'bb1';
        },
        [po.b + 2](x) {
            return x + ':bb2';
        },
        // (v) => 222;
    };
    log(or);
    log(or.bb2(33));

    // 3. 方法的name属性

    // 4. Object.is()
    log(+0 == -0);
    log(+0 === -0);
    log(NaN === NaN);
    log(Object.is(+0, -0));
    log(Object.is(NaN, NaN));

    // 5. Object.assign()
    log(Object.assign({a: 1}, {a: 2, b:2}, {b: 3, c: 3}, 'xyz', 5));

    // 6. 属性的可枚举性
    log(Object.getOwnPropertyDescriptor({a: 111}, 'a'));

    // 7. 属性的遍历
    // for ... in
    // Object.keys(obj)
    // Object.getOwnPropertyNames(obj)
    // Object.getOwnPropertySymbols(obj)
    // Reflect.ownKeys(obj)

    // 8. __proto__ , Object.setPrototypeOf() , Object.getPrototypeOf()
    debugger;
    let proto = {name: 'meng', say() { log(this.name); }};
    let o1 = Object.create(proto);
    let o2 = Object.setPrototypeOf({a: '111'}, proto);
    let o3 = Object.getPrototypeOf({__proto__: proto});

    // 9. Object.keys() , Object.values() , Object.entries()
    let o4 = Object.create({}, {
        p1: {value: 111},
        p2: {value: 222, enumerable: true, writable: true, configurable: true}
    });

    log(Object.keys(o4));


    // 10. 对象的扩展运算符 !!! -2017
    // log({a: 1, b: 2, ...{a: 11}, ...{b: 22}, ...{c: 333}});

    // 11. Object.getOwnPropertyDescriptors()

    // 12. Null传导运算符 !!!
    let o5 = {a: {b: 1}};
    // o5?.a?.b = 2;

}, false);


// =====================> 10. Symbol <=========================
run(function () {
    // 1. 概述
    let s1 = Symbol();
    let s2 = Symbol('foo');
    let s3 = Symbol('foo');
    log(s1, s2, s3);
    log(s2 === s3);

    let o1 = {
        [s2]() {
            log('s2 fun call');
        }
    };

    o1[s2]();
    log(o1);
    o1.s2 = 's2';
    log(o1);
    log(Object.getOwnPropertyNames(o1));
    log(Object.getOwnPropertySymbols(o1));

    // 2. 作为属性名的Symbol

    // 3. 实例：消除魔术字符串

    // 4. 属性名的遍历

    // 5. Symbol.for() , Symbol.keyFor()
    log(Symbol.for('blue') === Symbol.for('blue'));
    log(Symbol('red') === Symbol('red'));


    // 6. 实例：模块的Singleton模式

    // 7. 内置的Symbol值，共11个

    //   a. Symbol.hasInstance
    //   b. Symbol.isConcatSpreadable
    //   c. Symbol.species
    //   d. Symbol.match
    //   e. Symbol.replace
    //   f. Symbol.search
    //   g. Symbol.split
    //   h. Symbol.iterator
    //   i. Symbol.toPrimitive
    //   j. Symbol.toStringTag : JSON , Math , Module , ArrayBuffer , DataView , Map , Promise , Set ...
    //   k. Symbol.unscopables

    let o = {
        a: 22, b: 11, c: 'cc', d: [], e: {},
        *[Symbol.iterator]() {
            for (let p of Object.keys(this)) {
                yield this[p];
            }
        }
    };

    log([...o]);


}, false);

// =====================> 11. 数据结构: Set , Map <=========================
run(function () {
    // Set
    // 去除数组中的重复值
    // log(Object.is(+0, -0));     // false
    // log(Object.is(NaN, NaN));   // true
    log([...new Set([1, 1, 2, 2, 3, 4, 5, 5, '5', '5', NaN, NaN, +0, -0])]); // [1, 2, 3, 4, 5, '5', NaN, 0]

    // Set <---> Array 互转
    log(new Array(new Set([1, 2, 2])));
    log(new Array(1, 2, 3));
    debugger;
    let arr = new Array({a: 11});
    let arr2 = new Array(5);
    log(arr2);
    let set = new Set();
    set.add(1).add(1).add('1').add(2).add(true).add({}).add([]);
    log(set, set.size);
    log(Array.from(set));
    log(set.delete(1), set);
    log(set.clear(), set);

    // 遍历： Set.keys() , Set.values() , Set.entries() , Set.forEach()
    // 注意：遍历顺序保持与add顺序一致
    for (let x of set);

    // 应用
    // 使用数组的map()、filter()方法
    let s = new Set([1, 2, 3, 4, 5]);
    log(new Set([...s].map(x => x * 2)));
    log(new Set([...s].filter(x => x % 2 == 0)));
    // 实现“合集”、“交集”、“差集”
    let s1 = new Set([1, 2, 3]);
    let s2 = new Set([3, 4, 5]);
    log(new Set([...s1, ...s2]));
    log(new Set([...s1].filter(x => s2.has(x))));
    log(new Set([...s1].filter(x => !s2.has(x))));
    // Set无下标
    log(s1[0], s1[1]); // undefined

    // WeakSet
    // 与Set的区别：
    // 1. 只能存对象
    // 2. 随时被垃圾回收，不可遍历，没有size属性
    // 应用场景：存DOM节点
    // 方法： add() , delete() , has()
    log(new WeakSet([[1, 2], {a: 11}]));


    log('---------- map ----------');
    // Map
    // Map与Object区别：Object键名只能是字符串， Map键名可以是任意类型
    // Map同名覆盖，判断同名的原则：
    // 1. 基本类型使用“===”
    // 2. 引用类型判断内存地址
    // 3. NaN等于NaN，+0等于-0

    // 构造函数
    let m1 = new Map();
    m1.set(1, 11).set('1', '11').set(true, false).set([1], [1]).set([1], [2]).set({}, {});
    log(m1, m1.size, m1.get(1), m1.get({}), m1.get([1]), m1.get(true));
    log(m1.delete(true), m1.has([1]), m1);

    let m2 = new Map([[1, 'a'], [2, 'b'], [3, 'c']]);
    log(m2);


    // 属性与方法: size , set() , get() , has() , delete() , clear()

    // 遍历: keys() , values(), entries(), forEach(value, key, map)
    log(m2.entries());
    log([...m2]);
    log(...m2);

    // 使用数组的map()、filter()方法

    // WeakMap


    // ------
    log('------------');
    let ss = new Set([1,2,3]);
    for (let s of ss) {
        console.log(s);
        if (s == 3) {
            ss.add(4);
        }
    }
    /*ss.forEach(function(v) {
        console.log(v);
        if (v == 1) {
            ss.add(4);
        }
    });*/
    log(ss);

}, false);

// =====================> 12. Proxy <=========================
run(function () {
    // 拦截对目标对象的默认操作，可作为原型对象
    // let proxy = new Proxy(target, handler);
    // let obj = Object.create(proxy);

    // 所支持的拦截操作如下：
    // 1. get(target, propKey, receiver)

    // 2. set(target, propKey, value, receiver)

    // 3. has(target, propKey)

    // 4. deleteProperty(target, propKey)

    // 5. ownKeys(target)

    // 6. getOwnPropertyDescriptor(target, propKey)

    // 7. defineProperty(target, propKey, propDesc)

    // 8. preventExtensions(target)

    // 9. isExtensible(target)

    // 10. getPropertyOf(target)

    // 11. setPropertyOf(target, proto)

    // 12. apply(target, object, args)

    // 13. construct(target, args)

});

// =====================> 13. Reflect <=========================


// =====================> 14. Promise <=========================


// =====================> 15. Iterator / for...of <=========================


// =====================> 16. Generator <=========================


// =====================> 17. Generator异步应用 <=========================


// =====================> 18. async函数 <=========================


// =====================> 19. Class <=========================


// =====================> 20. Decorator <=========================


// =====================> 21. Module <=========================


// =====================> 22. Module加载实现 <=========================


// =====================> 23. 编程风格 <=========================


// =====================> 24. 读懂规格 <=========================


// =====================> 25. 二进制数组 <=========================


// =====================> 26. SIMD <=========================



