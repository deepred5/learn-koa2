// const greeting = (firstName, lastName) => firstName + ' ' + lastName
// const toUpper = str => str.toUpperCase()

// const fn = compose(toUpper, greeting);

// const result = fn('jack', 'smith');

// console.log(result);


// function compose(fns) {
//   let length = fns.length;
//   let count = length - 1;
//   let result = null;

//   return function fn1(...args) {
//     result = fns[count].apply(null, args);
//     if (count <= 0) {
//       return result
//     }

//     count--;
//     return fn1.apply(null, result);
//   }
// }

function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}


const context = {};

const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));

const test1 = async (context, next) => {
  console.log('1-start');
  context.age = 11;
  await next();
  context.name = 'tc';
  console.log('1-end');
};

const test2 = async (context, next) => {
  console.log('context', context);
  console.log('2-start');
  await sleep(2000);
  console.log('2-end');
};

const fn = compose([test1, test2]);

fn(context).then(() => {
  console.log('end');
  console.log(context);
})

