
        const window = this;
    /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/api.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/8track/dist/Router.js":
/*!********************************************!*\
  !*** ./node_modules/8track/dist/Router.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_to_regexp_1 = __importDefault(__webpack_require__(/*! path-to-regexp */ "./node_modules/path-to-regexp/index.js"));
/**
 * Middleware and handler context. Container to read data about a route
 * and to share data between middlewares and handlers
 */
class Context {
    constructor(request, response, params, data) {
        this.request = request;
        this.response = response;
        this.params = params;
        this.data = data;
    }
    end(body, responseInit = {}) {
        if (body instanceof Response) {
            this.response = body;
            return this.response;
        }
        const headers = [...this.response.headers.entries()].reduce((result, [k, v]) => {
            result[k] = v;
            return result;
        }, {});
        Object.assign(headers, responseInit.headers);
        this.response = new Response(body, {
            ...this.response,
            ...responseInit,
            headers,
        });
        return this.response;
    }
    html(body, responseInit = {}) {
        return this.end(body, {
            ...responseInit,
            headers: {
                'Content-Type': 'text/html',
                ...(responseInit.headers || {}),
            },
        });
    }
    json(body, responseInit = {}) {
        return this.end(JSON.stringify(body), {
            ...responseInit,
            headers: {
                'Content-Type': 'application/json',
                ...(responseInit.headers || {}),
            },
        });
    }
}
exports.Context = Context;
class Router {
    constructor() {
        this.routes = [];
        this.all = (strings, ...paramNames) => this.methodResult('ALL', strings, paramNames);
        this.get = (strings, ...paramNames) => this.methodResult('GET', strings, paramNames);
        this.post = (strings, ...paramNames) => this.methodResult('POST', strings, paramNames);
        this.put = (strings, ...paramNames) => this.methodResult('PUT', strings, paramNames);
        this.patch = (strings, ...paramNames) => this.methodResult('PATCH', strings, paramNames);
        this.delete = (strings, ...paramNames) => this.methodResult('DELETE', strings, paramNames);
        this.head = (strings, ...paramNames) => this.methodResult('HEAD', strings, paramNames);
        this.options = (strings, ...paramNames) => this.methodResult('OPTIONS', strings, paramNames);
        this.methodResult = (method, strings, paramNames) => {
            const original = strings.reduce((result, str, i) => {
                const paramString = (paramNames[i] && `:${paramNames[i]}`) || '';
                return `${result}${str}${paramString}`;
            }, '');
            const pattern = [path_to_regexp_1.default(original), path_to_regexp_1.default.parse(original)];
            const result = {
                use: (handler) => {
                    this.routes.push({ original, pattern, handler, method });
                    return result;
                },
                handle: (handler) => {
                    this.routes.push({ original, pattern, handler, method });
                    return result;
                },
                router: () => this,
            };
            return result;
        };
    }
    getMatchingRoutes(request) {
        const url = !request.url.startsWith('http')
            ? new URL(`http://domain${request.url.startsWith('/') ? '' : '/'}${request.url}`)
            : new URL(request.url);
        return this.routes.reduce((result, route) => {
            const { pattern: [pattern, routeTokens], method, original, } = route;
            if (method !== 'ALL' && method !== request.method)
                return result;
            // const [patternRegex, patternParse] = pattern
            const patternResult = pattern.exec(original.startsWith('http') ? url.href : url.pathname);
            if (!patternResult)
                return result;
            const params = {};
            for (let i = 0; i < routeTokens.length; i++) {
                if (typeof routeTokens[i] === 'string') {
                    continue;
                }
                else {
                    const token = routeTokens[i];
                    params[token.name] = patternResult[i];
                }
            }
            result.push({ params, route });
            return result;
        }, []);
    }
    createContext(request, response, params = {}, data = {}) {
        return new Context(request, response, params, data);
    }
    async getResponseForRequest(request) {
        const matchingRoutes = this.getMatchingRoutes(request);
        if (matchingRoutes.length === 0)
            return;
        const sharedData = {};
        let ctx;
        // Adapted from koa-compose https://github.com/koajs/compose/blob/master/index.js
        let index = -1;
        const dispatch = (i) => {
            if (i <= index)
                return Promise.reject(new Error('next() called multiple times'));
            // Last route did not handle response, just return
            if (i === matchingRoutes.length)
                return;
            index = i;
            const { route, params } = matchingRoutes[i];
            ctx = this.createContext(request, (ctx && ctx.response) || new Response(), params, sharedData);
            try {
                return Promise.resolve(route.handler(ctx, dispatch.bind(null, i + 1))).then(() => ctx.response);
            }
            catch (err) {
                return Promise.reject(err);
            }
        };
        const p = dispatch(0);
        if (p)
            return p.then(() => ctx.response);
        return null;
    }
}
exports.Router = Router;


/***/ }),

/***/ "./node_modules/8track/dist/cfErrorMiddleware.js":
/*!*******************************************************!*\
  !*** ./node_modules/8track/dist/cfErrorMiddleware.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// TODO: this doesn't work yet
// export function cfErrorMiddleware(): Middleware {
//   return async (ctx, next) => {
//     try {
//       await next()
//     } catch (e) {
//       ctx.end(getErrorPageHTML(ctx.request, e), {
//         status: 500,
//       })
//     }
//   }
// }
function getErrorPageHTML(request, error) {
    const errorDetails = [
        ['Method', request.method],
        ['HTTP', (request.cf || {}).httpProtocol],
        ['TLS Version', (request.cf || {}).tlsVersion],
        ['ASN', (request.cf || {}).asn],
        ['Priority', (request.cf || {}).requestPriority],
        ['Trust Score', ((request.cf || {}).clientTrustScore || '').toString()],
        ['Colo', (request.cf || {}).colo],
        ['CF-Ray', request.headers.get('CF-Ray') || ''],
    ];
    return `
<!DOCTYPE HTML>
<html>
  <head>
    <style>
    html, body {
      margin: 0;
      font-family: sans-serif;
      background: #ff5454;
      color: white;
    }
    .error {
      max-width: 60em;
      margin: 2em auto;
    }
    .error-msg {
      white-space: pre-wrap;
      tab-size: 2;
      font-family:
        Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", 
        "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", 
        "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
      font-size: 3em;
    }

    .error-source {
      font-size: 2em;
      margin-bottom: -1em;
      color: #ffffffd9;
    }

    .error-details {
      display: grid;
      grid-template-columns: repeat(4, 25%);
    }

    .error-detail {
      padding: 1em;
      border: solid 1px #ffffff80;
    }

    .error-detail-title {
      text-transform: uppercase;
      margin-bottom: 0.5em;
      color: #ffffffc7;
    }

    .error-detail-content {
      font-size: 1.2em;
    }
    </style>
  </head>
  <body>
    <div class="error">
      ${ /*<div class="error-source">
      ${error.stack}
</div>*/''}
      <pre class="error-msg">${error.message}</pre>
      <div class="error-details">
        ${errorDetails
        .map(([title, content]) => `
          <div class="error-detail">
            <div class="error-detail-title">${title}</div>
            <div class="error-detail-content">${content}</div>
          </div>      
        `)
        .join('\n')}
      </div>
    </div>
  </body>
</html>
  `;
}
exports.getErrorPageHTML = getErrorPageHTML;


/***/ }),

/***/ "./node_modules/8track/dist/index.js":
/*!*******************************************!*\
  !*** ./node_modules/8track/dist/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./Router */ "./node_modules/8track/dist/Router.js"));
__export(__webpack_require__(/*! ./cfErrorMiddleware */ "./node_modules/8track/dist/cfErrorMiddleware.js"));


/***/ }),

/***/ "./node_modules/path-to-regexp/index.js":
/*!**********************************************!*\
  !*** ./node_modules/path-to-regexp/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * Default configs.
 */
var DEFAULT_DELIMITER = '/'

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // ":test(\\d+)?" => ["test", "\d+", undefined, "?"]
  // "(\\d+)"  => [undefined, undefined, "\d+", undefined]
  '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER
  var whitelist = (options && options.whitelist) || undefined
  var pathEscaped = false
  var res

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      pathEscaped = true
      continue
    }

    var prev = ''
    var name = res[2]
    var capture = res[3]
    var group = res[4]
    var modifier = res[5]

    if (!pathEscaped && path.length) {
      var k = path.length - 1
      var c = path[k]
      var matches = whitelist ? whitelist.indexOf(c) > -1 : true

      if (matches) {
        prev = c
        path = path.slice(0, k)
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
      pathEscaped = false
    }

    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var pattern = capture || group
    var delimiter = prev || defaultDelimiter

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: pattern
        ? escapeGroup(pattern)
        : '[^' + escapeString(delimiter === defaultDelimiter ? delimiter : (delimiter + defaultDelimiter)) + ']+?'
    })
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index))
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (data, options) {
    var path = ''
    var encode = (options && options.encode) || encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token
        continue
      }

      var value = data ? data[token.name] : undefined
      var segment

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array')
        }

        if (value.length === 0) {
          if (token.optional) continue

          throw new TypeError('Expected "' + token.name + '" to not be empty')
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j], token)

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value), token)

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"')
        }

        path += token.prefix + segment
        continue
      }

      if (token.optional) continue

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'))
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  if (!keys) return path

  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      })
    }
  }

  return path
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options))
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  options = options || {}

  var strict = options.strict
  var start = options.start !== false
  var end = options.end !== false
  var delimiter = options.delimiter || DEFAULT_DELIMITER
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')
  var route = start ? '^' : ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var capture = token.repeat
        ? '(?:' + token.pattern + ')(?:' + escapeString(token.delimiter) + '(?:' + token.pattern + '))*'
        : token.pattern

      if (keys) keys.push(token)

      if (token.optional) {
        if (!token.prefix) {
          route += '(' + capture + ')?'
        } else {
          route += '(?:' + escapeString(token.prefix) + '(' + capture + '))?'
        }
      } else {
        route += escapeString(token.prefix) + '(' + capture + ')'
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + escapeString(delimiter) + ')?'

    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')'
  } else {
    var endToken = tokens[tokens.length - 1]
    var isEndDelimited = typeof endToken === 'string'
      ? endToken[endToken.length - 1] === delimiter
      : endToken === undefined

    if (!strict) route += '(?:' + escapeString(delimiter) + '(?=' + endsWith + '))?'
    if (!isEndDelimited) route += '(?=' + escapeString(delimiter) + '|' + endsWith + ')'
  }

  return new RegExp(route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys)
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
  }

  return stringToRegexp(/** @type {string} */ (path), keys, options)
}


/***/ }),

/***/ "./src/api.ts":
/*!********************!*\
  !*** ./src/api.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _8track_1 = __webpack_require__(/*! 8track */ "./node_modules/8track/dist/index.js");
const router = new _8track_1.Router();
// Log country middleware
router.all `(.*)`.use(async (ctx, next) => {
    console.log('Country', ctx.request.cf.country);
    return await next();
});
router.get `/`.handle(ctx => ctx.json({ hello: 'world' }));
router.get `/cache-everything/${'path'}`.handle(async (ctx) => {
    const res = await fetch(`https://my-origin.com/${ctx.params.path}`, {
        cf: {
            cacheEverything: true,
        },
    });
    return ctx.end(res);
});
router.all `(.*)`.handle(ctx => ctx.end('', { status: 404 }));
addEventListener('fetch', e => {
    const res = router.getResponseForRequest(e.request).catch(error => new Response(_8track_1.getErrorPageHTML(e.request, error), {
        status: 500,
        headers: {
            'Content-Type': 'text/html',
        },
    }));
    e.respondWith(res);
});


/***/ })

/******/ });
//# sourceMappingURL=api.js.map{"version":3,"sources":["webpack:///webpack/bootstrap","webpack:///./node_modules/8track/src/Router.ts","webpack:///./node_modules/8track/src/cfErrorMiddleware.ts","webpack:///./node_modules/8track/src/index.ts","webpack:///./node_modules/path-to-regexp/index.js","webpack:///./src/api.ts"],"names":[],"mappings":"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AACA;AACA;;AAEA;AACA;AACA;AACA;;AAEA;AACA;AACA;AACA;AACA;;AAEA;AACA;AACA;AACA;AACA;AACA;;AAEA;AACA;AACA;AACA;;AAEA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA,KAAK;AACL;;AAEA;AACA;AACA;AACA;;AAEA;AACA;;AAEA;AACA;AACA;AACA,YAAY,OAAO;AACnB,YAAY,QAAQ;AACpB,YAAY;AACZ;AACA;AACA;AACA;;AAEA;AACA;AACA;AACA;AACA;AACA;;AAEA;AACA,iBAAiB,mBAAmB;AACpC;AACA;AACA;AACA;;AAEA;AACA;AACA;;AAEA,mBAAmB,mBAAmB;AACtC;;AAEA;AACA;AACA;AACA;;AAEA;AACA;;AAEA;AACA;AACA;AACA;;AAEA;AACA;;AAEA;AACA;;AAEA,uBAAuB,kBAAkB;AACzC;;AAEA;AACA;AACA;;AAEA;AACA;;AAEA;AACA;;AAEA;AACA;;AAEA;AACA;AACA;;AAEA;AACA;AACA;;AAEA;;AAEA;AACA;;AAEA;AACA;AACA;;AAEA;AACA;AACA;AACA,YAAY,OAAO;AACnB,YAAY;AACZ;AACA;AACA,mCAAmC;AACnC;;AAEA;AACA;AACA;AACA,YAAY,OAAO;AACnB,YAAY;AACZ;AACA;AACA;AACA;;AAEA;AACA;AACA;AACA,YAAY,OAAO;AACnB,YAAY;AACZ;AACA;AACA;AACA;;AAEA;AACA;AACA;AACA,YAAY,QAAQ;AACpB,YAAY,OAAO;AACnB,YAAY;AACZ;AACA;AACA;;AAEA;AACA;;AAEA;AACA,mBAAmB,mBAAmB;AACtC;AACA;AACA;AACA;AACA;AACA;AACA;AACA,OAAO;AACP;AACA;;AAEA;AACA;;AAEA;AACA;AACA;AACA,YAAY,OAAO;AACnB,YAAY,OAAO;AACnB,YAAY,QAAQ;AACpB,YAAY;AACZ;AACA;AACA;;AAEA,iBAAiB,iBAAiB;AAClC;AACA;;AAEA;AACA;;AAEA;AACA;AACA;AACA,YAAY,OAAO;AACnB,YAAY,OAAO;AACnB,YAAY,QAAQ;AACpB,YAAY;AACZ;AACA;AACA;AACA;;AAEA;AACA;AACA;AACA,YAAY,OAAO;AACnB,YAAY,OAAO;AACnB,YAAY,QAAQ;AACpB,YAAY;AACZ;AACA;AACA;;AAEA;AACA;AACA;AACA;AACA;AACA;;AAEA;AACA,iBAAiB,mBAAmB;AACpC;;AAEA;AACA;AACA,KAAK;AACL;AACA;AACA;;AAEA;;AAEA;AACA;AACA;AACA,SAAS;AACT;AACA;AACA,OAAO;AACP;AACA;AACA;AACA;;AAEA;AACA;;AAEA;AACA,GAAG;AACH;AACA;AACA;AACA;;AAEA;AACA;AACA;;AAEA;AACA;;AAEA;AACA;AACA;AACA;AACA;AACA,cAAc,6DAA6D;AAC3E;AACA,YAAY,sBAAsB;AAClC,YAAY,OAAO;AACnB,YAAY,QAAQ;AACpB,YAAY;AACZ;AACA;AACA;AACA;AACA;;AAEA;AACA,oCAAoC,OAAO;AAC3C;;AAEA,mCAAmC,OAAO;AAC1C;;;;;;;;;;;;;;;AC9WA,2FAAiD;AAEjD,MAAM,MAAM,GAAG,IAAI,gBAAM,EAAE;AAE3B,yBAAyB;AACzB,MAAM,CAAC,GAAG,OAAM,CAAC,GAAG,CAAC,KAAK,EAAE,GAAG,EAAE,IAAI,EAAE,EAAE;IACvC,OAAO,CAAC,GAAG,CAAC,SAAS,EAAE,GAAG,CAAC,OAAO,CAAC,EAAE,CAAC,OAAO,CAAC;IAC9C,OAAO,MAAM,IAAI,EAAE;AACrB,CAAC,CAAC;AAEF,MAAM,CAAC,GAAG,IAAG,CAAC,MAAM,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,IAAI,CAAC,EAAE,KAAK,EAAE,OAAO,EAAE,CAAC,CAAC;AAEzD,MAAM,CAAC,GAAG,sBAAqB,MAAM,EAAE,CAAC,MAAM,CAAC,KAAK,EAAC,GAAG,EAAC,EAAE;IACzD,MAAM,GAAG,GAAG,MAAM,KAAK,CAAC,yBAAyB,GAAG,CAAC,MAAM,CAAC,IAAI,EAAE,EAAE;QAClE,EAAE,EAAE;YACF,eAAe,EAAE,IAAI;SACtB;KACF,CAAC;IAEF,OAAO,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC;AACrB,CAAC,CAAC;AAEF,MAAM,CAAC,GAAG,OAAM,CAAC,MAAM,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,EAAE,EAAE,EAAE,MAAM,EAAE,GAAG,EAAE,CAAC,CAAC;AAE5D,gBAAgB,CAAC,OAAO,EAAE,CAAC,CAAC,EAAE;IAC5B,MAAM,GAAG,GAAG,MAAM,CAAC,qBAAqB,CAAC,CAAC,CAAC,OAAO,CAAC,CAAC,KAAK,CACvD,KAAK,CAAC,EAAE,CACN,IAAI,QAAQ,CAAC,0BAAgB,CAAC,CAAC,CAAC,OAAO,EAAE,KAAK,CAAC,EAAE;QAC/C,MAAM,EAAE,GAAG;QACX,OAAO,EAAE;YACP,cAAc,EAAE,WAAW;SAC5B;KACF,CAAC,CACL;IAED,CAAC,CAAC,WAAW,CAAC,GAAU,CAAC;AAC3B,CAAC,CAAC","file":"api.js","sourcesContent":[" \t// The module cache\n \tvar installedModules = {};\n\n \t// The require function\n \tfunction __webpack_require__(moduleId) {\n\n \t\t// Check if module is in cache\n \t\tif(installedModules[moduleId]) {\n \t\t\treturn installedModules[moduleId].exports;\n \t\t}\n \t\t// Create a new module (and put it into the cache)\n \t\tvar module = installedModules[moduleId] = {\n \t\t\ti: moduleId,\n \t\t\tl: false,\n \t\t\texports: {}\n \t\t};\n\n \t\t// Execute the module function\n \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n\n \t\t// Flag the module as loaded\n \t\tmodule.l = true;\n\n \t\t// Return the exports of the module\n \t\treturn module.exports;\n \t}\n\n\n \t// expose the modules object (__webpack_modules__)\n \t__webpack_require__.m = modules;\n\n \t// expose the module cache\n \t__webpack_require__.c = installedModules;\n\n \t// define getter function for harmony exports\n \t__webpack_require__.d = function(exports, name, getter) {\n \t\tif(!__webpack_require__.o(exports, name)) {\n \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n \t\t}\n \t};\n\n \t// define __esModule on exports\n \t__webpack_require__.r = function(exports) {\n \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n \t\t}\n \t\tObject.defineProperty(exports, '__esModule', { value: true });\n \t};\n\n \t// create a fake namespace object\n \t// mode & 1: value is a module id, require it\n \t// mode & 2: merge all properties of value into the ns\n \t// mode & 4: return value when already ns object\n \t// mode & 8|1: behave like require\n \t__webpack_require__.t = function(value, mode) {\n \t\tif(mode & 1) value = __webpack_require__(value);\n \t\tif(mode & 8) return value;\n \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n \t\tvar ns = Object.create(null);\n \t\t__webpack_require__.r(ns);\n \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n \t\treturn ns;\n \t};\n\n \t// getDefaultExport function for compatibility with non-harmony modules\n \t__webpack_require__.n = function(module) {\n \t\tvar getter = module && module.__esModule ?\n \t\t\tfunction getDefault() { return module['default']; } :\n \t\t\tfunction getModuleExports() { return module; };\n \t\t__webpack_require__.d(getter, 'a', getter);\n \t\treturn getter;\n \t};\n\n \t// Object.prototype.hasOwnProperty.call\n \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n\n \t// __webpack_public_path__\n \t__webpack_require__.p = \"./\";\n\n\n \t// Load entry module and return exports\n \treturn __webpack_require__(__webpack_require__.s = \"./src/api.ts\");\n","import pathToRegExp from 'path-to-regexp'\n\n/**\n * Middleware and handler context. Container to read data about a route\n * and to share data between middlewares and handlers\n */\nexport class Context<Data = any, Params = any> {\n  readonly request: Request\n  readonly params: Params\n  response: Response\n  data: Data\n\n  constructor(request: Request, response: Response, params: Params, data: Data) {\n    this.request = request\n    this.response = response\n    this.params = params\n    this.data = data\n  }\n\n  end(body: string | ReadableStream | Response, responseInit: ResponseInit = {}) {\n    if (body instanceof Response) {\n      this.response = body\n      return this.response\n    }\n\n    const headers = [...(this.response.headers as any).entries()].reduce(\n      (result, [k, v]: [string, string]) => {\n        result[k] = v\n        return result\n      },\n      {} as { [key: string]: string },\n    )\n\n    Object.assign(headers, responseInit.headers)\n\n    this.response = new Response(body, {\n      ...this.response,\n      ...responseInit,\n      headers,\n    })\n\n    return this.response\n  }\n\n  html(body: string | ReadableStream, responseInit: ResponseInit = {}) {\n    return this.end(body, {\n      ...responseInit,\n      headers: {\n        'Content-Type': 'text/html',\n        ...(responseInit.headers || {}),\n      },\n    })\n  }\n\n  json(body: object, responseInit: ResponseInit = {}) {\n    return this.end(JSON.stringify(body), {\n      ...responseInit,\n      headers: {\n        'Content-Type': 'application/json',\n        ...(responseInit.headers || {}),\n      },\n    })\n  }\n}\n\nexport type Handler<ContextData = any, Params = any> = (\n  ctx: Context<ContextData, Params>,\n  next?: () => Promise<void>,\n) => any\n\nexport type Middleware<ContextData = any, Params = any> = (\n  ctx: Context<ContextData, Params>,\n  next: () => Promise<void>,\n) => any\n\nexport type Method = 'ALL' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'\n\nexport interface Route {\n  readonly original: string\n  readonly pattern: readonly [RegExp, pathToRegExp.Token[]]\n  readonly handler: Handler | Middleware\n  readonly method: Method\n}\n\nexport interface RouteMatch {\n  params: any\n  route: Route\n}\n\ntype RouteRequest = Pick<Request, 'url' | 'method'>\n\nexport interface RouteTagResult<ContextData, Params> {\n  /**\n   * Handle a request\n   */\n  handle: (handler: Handler<ContextData, Params>) => RouteTagResult<ContextData, Params>\n  /**\n   * Mount middleware\n   */\n  use: (handler: Middleware<ContextData, Params>) => RouteTagResult<ContextData, Params>\n  /**\n   * Get back the original router instance\n   */\n  router: () => Router<ContextData>\n}\n\nexport class Router<ContextData = any> {\n  private routes: Route[] = []\n\n  all = <A extends string, T extends { [K in A]: string }>(\n    strings: TemplateStringsArray,\n    ...paramNames: A[]\n  ) => this.methodResult<A, T>('ALL', strings, paramNames)\n\n  get = <A extends string, T extends { [K in A]: string }>(\n    strings: TemplateStringsArray,\n    ...paramNames: A[]\n  ) => this.methodResult<A, T>('GET', strings, paramNames)\n\n  post = <A extends string, T extends { [K in A]: string }>(\n    strings: TemplateStringsArray,\n    ...paramNames: A[]\n  ) => this.methodResult<A, T>('POST', strings, paramNames)\n\n  put = <A extends string, T extends { [K in A]: string }>(\n    strings: TemplateStringsArray,\n    ...paramNames: A[]\n  ) => this.methodResult<A, T>('PUT', strings, paramNames)\n\n  patch = <A extends string, T extends { [K in A]: string }>(\n    strings: TemplateStringsArray,\n    ...paramNames: A[]\n  ) => this.methodResult<A, T>('PATCH', strings, paramNames)\n\n  delete = <A extends string, T extends { [K in A]: string }>(\n    strings: TemplateStringsArray,\n    ...paramNames: A[]\n  ) => this.methodResult<A, T>('DELETE', strings, paramNames)\n\n  head = <A extends string, T extends { [K in A]: string }>(\n    strings: TemplateStringsArray,\n    ...paramNames: A[]\n  ) => this.methodResult<A, T>('HEAD', strings, paramNames)\n\n  options = <A extends string, T extends { [K in A]: string }>(\n    strings: TemplateStringsArray,\n    ...paramNames: A[]\n  ) => this.methodResult<A, T>('OPTIONS', strings, paramNames)\n\n  private methodResult = <Param extends string, Vars extends { [K in Param]: string }>(\n    method: Method,\n    strings: TemplateStringsArray,\n    paramNames: Param[],\n  ) => {\n    const original = strings.reduce((result, str, i) => {\n      const paramString = ((paramNames as any)[i] && `:${(paramNames as any)[i]}`) || ''\n      return `${result}${str}${paramString}`\n    }, '')\n\n    const pattern = [pathToRegExp(original), pathToRegExp.parse(original)] as const\n\n    const result: RouteTagResult<ContextData, Vars> = {\n      use: (handler: Middleware<ContextData, Vars>) => {\n        this.routes.push({ original, pattern, handler, method })\n        return result\n      },\n\n      handle: (handler: Handler<ContextData, Vars>) => {\n        this.routes.push({ original, pattern, handler, method })\n        return result\n      },\n\n      router: () => this,\n    }\n\n    return result\n  }\n\n  getMatchingRoutes(request: RouteRequest): RouteMatch[] {\n    const url = !request.url.startsWith('http')\n      ? new URL(`http://domain${request.url.startsWith('/') ? '' : '/'}${request.url}`)\n      : new URL(request.url)\n\n    return this.routes.reduce(\n      (result, route) => {\n        const {\n          pattern: [pattern, routeTokens],\n          method,\n          original,\n        } = route\n\n        if (method !== 'ALL' && method !== request.method) return result\n\n        // const [patternRegex, patternParse] = pattern\n        const patternResult = pattern.exec(original.startsWith('http') ? url.href : url.pathname)\n\n        if (!patternResult) return result\n\n        const params: { [key: string]: string } = {}\n\n        for (let i = 0; i < routeTokens.length; i++) {\n          if (typeof routeTokens[i] === 'string') {\n            continue\n          } else {\n            const token: pathToRegExp.Key = routeTokens[i] as any\n            params[token.name] = patternResult[i]\n          }\n        }\n\n        result.push({ params, route })\n\n        return result\n      },\n      [] as RouteMatch[],\n    )\n  }\n\n  createContext(request: Request, response: Response, params: any = {}, data: any = {}): Context {\n    return new Context(request, response, params, data)\n  }\n\n  async getResponseForRequest(request: Request) {\n    const matchingRoutes = this.getMatchingRoutes(request)\n\n    if (matchingRoutes.length === 0) return\n\n    const sharedData = {}\n    let ctx: Context\n\n    // Adapted from koa-compose https://github.com/koajs/compose/blob/master/index.js\n    let index = -1\n\n    const dispatch = (i: number): Promise<Response | undefined> | void => {\n      if (i <= index) return Promise.reject(new Error('next() called multiple times'))\n      // Last route did not handle response, just return\n      if (i === matchingRoutes.length) return\n      index = i\n      const { route, params } = matchingRoutes[i]\n      ctx = this.createContext(request, (ctx && ctx.response) || new Response(), params, sharedData)\n\n      try {\n        return Promise.resolve(route.handler(ctx, dispatch.bind(null, i + 1) as any)).then(\n          () => ctx.response,\n        )\n      } catch (err) {\n        return Promise.reject(err)\n      }\n    }\n\n    const p = dispatch(0)\n\n    if (p) return p.then(() => ctx.response)\n\n    return null\n  }\n}\n","import { Middleware } from './Router'\nimport {} from '@cloudflare/workers-types'\n\n// TODO: this doesn't work yet\n// export function cfErrorMiddleware(): Middleware {\n//   return async (ctx, next) => {\n//     try {\n//       await next()\n//     } catch (e) {\n//       ctx.end(getErrorPageHTML(ctx.request, e), {\n//         status: 500,\n//       })\n//     }\n//   }\n// }\n\nexport function getErrorPageHTML(request: Request, error: Error) {\n  const errorDetails: [string, string][] = [\n    ['Method', request.method],\n    ['HTTP', (request.cf || {}).httpProtocol],\n    ['TLS Version', (request.cf || {}).tlsVersion],\n    ['ASN', (request.cf || {}).asn],\n    ['Priority', (request.cf || {}).requestPriority],\n    ['Trust Score', ((request.cf || {}).clientTrustScore || '').toString()],\n    ['Colo', (request.cf || {}).colo],\n    ['CF-Ray', request.headers.get('CF-Ray') || ''],\n  ]\n\n  return `\n<!DOCTYPE HTML>\n<html>\n  <head>\n    <style>\n    html, body {\n      margin: 0;\n      font-family: sans-serif;\n      background: #ff5454;\n      color: white;\n    }\n    .error {\n      max-width: 60em;\n      margin: 2em auto;\n    }\n    .error-msg {\n      white-space: pre-wrap;\n      tab-size: 2;\n      font-family:\n        Consolas, \"Andale Mono WT\", \"Andale Mono\", \"Lucida Console\", \n        \"Lucida Sans Typewriter\", \"DejaVu Sans Mono\", \"Bitstream Vera Sans Mono\", \n        \"Liberation Mono\", \"Nimbus Mono L\", Monaco, \"Courier New\", Courier, monospace;\n      font-size: 3em;\n    }\n\n    .error-source {\n      font-size: 2em;\n      margin-bottom: -1em;\n      color: #ffffffd9;\n    }\n\n    .error-details {\n      display: grid;\n      grid-template-columns: repeat(4, 25%);\n    }\n\n    .error-detail {\n      padding: 1em;\n      border: solid 1px #ffffff80;\n    }\n\n    .error-detail-title {\n      text-transform: uppercase;\n      margin-bottom: 0.5em;\n      color: #ffffffc7;\n    }\n\n    .error-detail-content {\n      font-size: 1.2em;\n    }\n    </style>\n  </head>\n  <body>\n    <div class=\"error\">\n      ${/*<div class=\"error-source\">\n        ${error.stack}\n  </div>*/ ''}\n      <pre class=\"error-msg\">${error.message}</pre>\n      <div class=\"error-details\">\n        ${errorDetails\n          .map(\n            ([title, content]) => `\n          <div class=\"error-detail\">\n            <div class=\"error-detail-title\">${title}</div>\n            <div class=\"error-detail-content\">${content}</div>\n          </div>      \n        `,\n          )\n          .join('\\n')}\n      </div>\n    </div>\n  </body>\n</html>\n  `\n}\n","export * from './Router'\nexport * from './cfErrorMiddleware'\n","/**\n * Expose `pathToRegexp`.\n */\nmodule.exports = pathToRegexp\nmodule.exports.parse = parse\nmodule.exports.compile = compile\nmodule.exports.tokensToFunction = tokensToFunction\nmodule.exports.tokensToRegExp = tokensToRegExp\n\n/**\n * Default configs.\n */\nvar DEFAULT_DELIMITER = '/'\n\n/**\n * The main path matching regexp utility.\n *\n * @type {RegExp}\n */\nvar PATH_REGEXP = new RegExp([\n  // Match escaped characters that would otherwise appear in future matches.\n  // This allows the user to escape special characters that won't transform.\n  '(\\\\\\\\.)',\n  // Match Express-style parameters and un-named parameters with a prefix\n  // and optional suffixes. Matches appear as:\n  //\n  // \":test(\\\\d+)?\" => [\"test\", \"\\d+\", undefined, \"?\"]\n  // \"(\\\\d+)\"  => [undefined, undefined, \"\\d+\", undefined]\n  '(?:\\\\:(\\\\w+)(?:\\\\(((?:\\\\\\\\.|[^\\\\\\\\()])+)\\\\))?|\\\\(((?:\\\\\\\\.|[^\\\\\\\\()])+)\\\\))([+*?])?'\n].join('|'), 'g')\n\n/**\n * Parse a string for the raw tokens.\n *\n * @param  {string}  str\n * @param  {Object=} options\n * @return {!Array}\n */\nfunction parse (str, options) {\n  var tokens = []\n  var key = 0\n  var index = 0\n  var path = ''\n  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER\n  var whitelist = (options && options.whitelist) || undefined\n  var pathEscaped = false\n  var res\n\n  while ((res = PATH_REGEXP.exec(str)) !== null) {\n    var m = res[0]\n    var escaped = res[1]\n    var offset = res.index\n    path += str.slice(index, offset)\n    index = offset + m.length\n\n    // Ignore already escaped sequences.\n    if (escaped) {\n      path += escaped[1]\n      pathEscaped = true\n      continue\n    }\n\n    var prev = ''\n    var name = res[2]\n    var capture = res[3]\n    var group = res[4]\n    var modifier = res[5]\n\n    if (!pathEscaped && path.length) {\n      var k = path.length - 1\n      var c = path[k]\n      var matches = whitelist ? whitelist.indexOf(c) > -1 : true\n\n      if (matches) {\n        prev = c\n        path = path.slice(0, k)\n      }\n    }\n\n    // Push the current path onto the tokens.\n    if (path) {\n      tokens.push(path)\n      path = ''\n      pathEscaped = false\n    }\n\n    var repeat = modifier === '+' || modifier === '*'\n    var optional = modifier === '?' || modifier === '*'\n    var pattern = capture || group\n    var delimiter = prev || defaultDelimiter\n\n    tokens.push({\n      name: name || key++,\n      prefix: prev,\n      delimiter: delimiter,\n      optional: optional,\n      repeat: repeat,\n      pattern: pattern\n        ? escapeGroup(pattern)\n        : '[^' + escapeString(delimiter === defaultDelimiter ? delimiter : (delimiter + defaultDelimiter)) + ']+?'\n    })\n  }\n\n  // Push any remaining characters.\n  if (path || index < str.length) {\n    tokens.push(path + str.substr(index))\n  }\n\n  return tokens\n}\n\n/**\n * Compile a string to a template function for the path.\n *\n * @param  {string}             str\n * @param  {Object=}            options\n * @return {!function(Object=, Object=)}\n */\nfunction compile (str, options) {\n  return tokensToFunction(parse(str, options))\n}\n\n/**\n * Expose a method for transforming tokens into the path function.\n */\nfunction tokensToFunction (tokens) {\n  // Compile all the tokens into regexps.\n  var matches = new Array(tokens.length)\n\n  // Compile all the patterns before compilation.\n  for (var i = 0; i < tokens.length; i++) {\n    if (typeof tokens[i] === 'object') {\n      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')\n    }\n  }\n\n  return function (data, options) {\n    var path = ''\n    var encode = (options && options.encode) || encodeURIComponent\n\n    for (var i = 0; i < tokens.length; i++) {\n      var token = tokens[i]\n\n      if (typeof token === 'string') {\n        path += token\n        continue\n      }\n\n      var value = data ? data[token.name] : undefined\n      var segment\n\n      if (Array.isArray(value)) {\n        if (!token.repeat) {\n          throw new TypeError('Expected \"' + token.name + '\" to not repeat, but got array')\n        }\n\n        if (value.length === 0) {\n          if (token.optional) continue\n\n          throw new TypeError('Expected \"' + token.name + '\" to not be empty')\n        }\n\n        for (var j = 0; j < value.length; j++) {\n          segment = encode(value[j], token)\n\n          if (!matches[i].test(segment)) {\n            throw new TypeError('Expected all \"' + token.name + '\" to match \"' + token.pattern + '\"')\n          }\n\n          path += (j === 0 ? token.prefix : token.delimiter) + segment\n        }\n\n        continue\n      }\n\n      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {\n        segment = encode(String(value), token)\n\n        if (!matches[i].test(segment)) {\n          throw new TypeError('Expected \"' + token.name + '\" to match \"' + token.pattern + '\", but got \"' + segment + '\"')\n        }\n\n        path += token.prefix + segment\n        continue\n      }\n\n      if (token.optional) continue\n\n      throw new TypeError('Expected \"' + token.name + '\" to be ' + (token.repeat ? 'an array' : 'a string'))\n    }\n\n    return path\n  }\n}\n\n/**\n * Escape a regular expression string.\n *\n * @param  {string} str\n * @return {string}\n */\nfunction escapeString (str) {\n  return str.replace(/([.+*?=^!:${}()[\\]|/\\\\])/g, '\\\\$1')\n}\n\n/**\n * Escape the capturing group by escaping special characters and meaning.\n *\n * @param  {string} group\n * @return {string}\n */\nfunction escapeGroup (group) {\n  return group.replace(/([=!:$/()])/g, '\\\\$1')\n}\n\n/**\n * Get the flags for a regexp from the options.\n *\n * @param  {Object} options\n * @return {string}\n */\nfunction flags (options) {\n  return options && options.sensitive ? '' : 'i'\n}\n\n/**\n * Pull out keys from a regexp.\n *\n * @param  {!RegExp} path\n * @param  {Array=}  keys\n * @return {!RegExp}\n */\nfunction regexpToRegexp (path, keys) {\n  if (!keys) return path\n\n  // Use a negative lookahead to match only capturing groups.\n  var groups = path.source.match(/\\((?!\\?)/g)\n\n  if (groups) {\n    for (var i = 0; i < groups.length; i++) {\n      keys.push({\n        name: i,\n        prefix: null,\n        delimiter: null,\n        optional: false,\n        repeat: false,\n        pattern: null\n      })\n    }\n  }\n\n  return path\n}\n\n/**\n * Transform an array into a regexp.\n *\n * @param  {!Array}  path\n * @param  {Array=}  keys\n * @param  {Object=} options\n * @return {!RegExp}\n */\nfunction arrayToRegexp (path, keys, options) {\n  var parts = []\n\n  for (var i = 0; i < path.length; i++) {\n    parts.push(pathToRegexp(path[i], keys, options).source)\n  }\n\n  return new RegExp('(?:' + parts.join('|') + ')', flags(options))\n}\n\n/**\n * Create a path regexp from string input.\n *\n * @param  {string}  path\n * @param  {Array=}  keys\n * @param  {Object=} options\n * @return {!RegExp}\n */\nfunction stringToRegexp (path, keys, options) {\n  return tokensToRegExp(parse(path, options), keys, options)\n}\n\n/**\n * Expose a function for taking tokens and returning a RegExp.\n *\n * @param  {!Array}  tokens\n * @param  {Array=}  keys\n * @param  {Object=} options\n * @return {!RegExp}\n */\nfunction tokensToRegExp (tokens, keys, options) {\n  options = options || {}\n\n  var strict = options.strict\n  var start = options.start !== false\n  var end = options.end !== false\n  var delimiter = options.delimiter || DEFAULT_DELIMITER\n  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')\n  var route = start ? '^' : ''\n\n  // Iterate over the tokens and create our regexp string.\n  for (var i = 0; i < tokens.length; i++) {\n    var token = tokens[i]\n\n    if (typeof token === 'string') {\n      route += escapeString(token)\n    } else {\n      var capture = token.repeat\n        ? '(?:' + token.pattern + ')(?:' + escapeString(token.delimiter) + '(?:' + token.pattern + '))*'\n        : token.pattern\n\n      if (keys) keys.push(token)\n\n      if (token.optional) {\n        if (!token.prefix) {\n          route += '(' + capture + ')?'\n        } else {\n          route += '(?:' + escapeString(token.prefix) + '(' + capture + '))?'\n        }\n      } else {\n        route += escapeString(token.prefix) + '(' + capture + ')'\n      }\n    }\n  }\n\n  if (end) {\n    if (!strict) route += '(?:' + escapeString(delimiter) + ')?'\n\n    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')'\n  } else {\n    var endToken = tokens[tokens.length - 1]\n    var isEndDelimited = typeof endToken === 'string'\n      ? endToken[endToken.length - 1] === delimiter\n      : endToken === undefined\n\n    if (!strict) route += '(?:' + escapeString(delimiter) + '(?=' + endsWith + '))?'\n    if (!isEndDelimited) route += '(?=' + escapeString(delimiter) + '|' + endsWith + ')'\n  }\n\n  return new RegExp(route, flags(options))\n}\n\n/**\n * Normalize the given path string, returning a regular expression.\n *\n * An empty array can be passed in for the keys, which will hold the\n * placeholder key descriptions. For example, using `/user/:id`, `keys` will\n * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.\n *\n * @param  {(string|RegExp|Array)} path\n * @param  {Array=}                keys\n * @param  {Object=}               options\n * @return {!RegExp}\n */\nfunction pathToRegexp (path, keys, options) {\n  if (path instanceof RegExp) {\n    return regexpToRegexp(path, keys)\n  }\n\n  if (Array.isArray(path)) {\n    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)\n  }\n\n  return stringToRegexp(/** @type {string} */ (path), keys, options)\n}\n","import { Router, getErrorPageHTML } from '8track'\n\nconst router = new Router()\n\n// Log country middleware\nrouter.all`(.*)`.use(async (ctx, next) => {\n  console.log('Country', ctx.request.cf.country)\n  return await next()\n})\n\nrouter.get`/`.handle(ctx => ctx.json({ hello: 'world' }))\n\nrouter.get`/cache-everything/${'path'}`.handle(async ctx => {\n  const res = await fetch(`https://my-origin.com/${ctx.params.path}`, {\n    cf: {\n      cacheEverything: true,\n    },\n  })\n\n  return ctx.end(res)\n})\n\nrouter.all`(.*)`.handle(ctx => ctx.end('', { status: 404 }))\n\naddEventListener('fetch', e => {\n  const res = router.getResponseForRequest(e.request).catch(\n    error =>\n      new Response(getErrorPageHTML(e.request, error), {\n        status: 500,\n        headers: {\n          'Content-Type': 'text/html',\n        },\n      }),\n  )\n\n  e.respondWith(res as any)\n})\n"],"sourceRoot":""}