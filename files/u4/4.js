function identity_function(x){
    return function () {
        return x;
    }
}

function addf(x){
    return function(y){
        return x + y;
    }
}

function add(x, y){
    return x + y;
}

function mul(x, y){
    return x * y;
}

function applyf(fun){
    return function(x){
       return function (y) {
           return fun(x, y);
       }
    }
}

function curry(fun, x){
    return function(y){
        return fun(x, y);
    }
}

function get_inc(){
    return addf(1);
}

function methodize(fun){
    return function(x){
        return fun(this, x);
    }
}

function demethodize(fun){
    return function(x, y){
        return fun.call(x, y);
    }
}

function twice(fun){
    return function (x) {
        return fun(x, x);
    }
}

var double = twice(add);
var square = twice(mul);

function composeu(fun1, fun2){
    return function(x){
        return fun2(fun1(x));
    }
}

function composeb(fun1, fun2){
    return function(x, y, z){
        return fun2(fun1(x, y), z);
    }
}

function once(fun){
    return function (...args) {
        var e = fun(...args);
        fun = undefined;
        return e;
    }
}

function counterf(x){
    var i = x;
    return {
        inc: function(){
            return ++i;
        },
        dec: function () {
            return --i;
        }
    }
}

function revocable(fun){
    return {
        invoke: function (...args) {
            return fun(...args);
        },
        revoke: function () {
            fun = undefined;
        }
    }
}

function new_array_wrapper(){
    var a = [];
    return {
        get: function (x) {
            return a[x];
        },
        store: function (x, y) {
            a[x] = y;
        },
        append: function (x) {
            a.push(x);
        }
    }
}

function new_queue(){
    var a = [];
    return {
        in: function (x) {
            a.push(x);
        },
        out: function () {
            return a.shift();
        }
    }
}

var qn = new_queue();
qn.in(2);
qn.in(3);
qn.in(9);
qn.a; //undefined
qn.out(); //2
qn.out(); //3
qn.out(); //9
qn.out(); //undefined

function new_set(){
    var a = [];
    return {
        add: function (x) {
            let f = false;
            a.forEach(function (e) {
                if(x === e) f = true;
            });
            if(!f) a.push(x);
        },
        delete: function (x) {
            var i = a.indexOf(x);
            if (i !== -1) a.splice(i, 1);
        },
        getAll: function () {
            return a;
        }
    }
}

var sn = new_set();
sn.add(2);
sn.add(2);
sn.getAll(); //[2]
sn.add(5);
sn.getAll(); //[2, 5]
sn.delete(2); //[5]
sn.getAll(); //[]

function new_mixedset(){
    var a = [];
    return {
        add: function (x) {
            a.push(x);
        },
        delete: function (x) {
            var i = a.indexOf(x);
            while(i !== -1){
                a.splice(i, 1);
                i = a.indexOf(x);
            }
        },
        getAll: function () {
            return a;
        }
    }
}

var msn = new_mixedset();
msn.add(12);
msn.add(19);
msn.add(12);
msn.getAll(); //[12, 19, 12]
msn.delete(12);
msn.getAll(); //[19]