import hbs from 'hbs'
import { resolve } from 'path'

hbs.registerPartials(resolve(process.cwd(), 'views', 'partials'))
hbs.registerPartial('title', process.env.SITE_TITLE)
hbs.registerHelper('debug', function(optionalValue) {
  console.log('Current Context')
  console.log('====================')
  console.log(this)
  if (optionalValue) {
    console.log('Value')
    console.log('====================')
    console.log(optionalValue)
  }
})
hbs.registerHelper('cond', function (v1, operator, v2, options) {
  switch (operator) {
    case '==':
      return (v1 == v2) ? options.fn(this) : options.inverse(this)
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this)
    case '!=':
      return (v1 != v2) ? options.fn(this) : options.inverse(this)
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this)
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this)
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this)
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this)
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this)
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this)
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this)
    default:
      return options.inverse(this)
  }
})
