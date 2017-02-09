# create-react-factory

**create-react-factory** create a factory for your react component. It allows you to:
+ compose multiple high order components
+ set a custom component to render using the *component* property

## Installation

```
npm install create-react-factory
```

## Usage

```javascript
// Underline.js
import React from 'react'
import createReactFactory from 'create-react-factory'

export const Underline = ({component: Component = 'div', style = {}, ...props}) => (
  <Component style={{...style, textDecoration: 'underline'}} {...props} />
)
export default Underline
export const factory = createReactFactory(Underline)
```

```javascript
// Strong.js
import React from 'react'
import createReactFactory from 'create-react-factory'

export const Strong = ({component: Component = 'div', style = {}, ...props}) => (
  <Component style={{...style, fontWeight: 'bold'}} {...props} />
)
export default Strong
export const factory = createReactFactory(Strong)
```

```javascript
// Red.js
import React from 'react'
import createReactFactory from 'create-react-factory'

const Red = ({component: Component = 'div', style = {}, ...props}) => (
  <Component style={{...style, color: 'red'}} {...props} />
)
export default Red
export const factory = createReactFactory(Red)
```

```javascript
// RedStrongUnderline.js
import {factory as strongFactory} from './Strong'
import {factory as redFactory} from './Red'
import Underline from './Underline'

export const RedStrongUnderline = strongFactory(redFactory(Underline))
export default RedStrongUnderline
```

```javascript
import React from 'react'
import {render} from 'react-dom'
import Rsu from './RedStrongUnderline'

render(<ul><Rsu component="li">Hello World!</Rsu></ul>, document.getElementById('root'))
// output:
// <ul>
//   <li style="color: red; font-weight: bold; text-decoration: underline;">
//     Hello World!
//   </li>
// </ul>
```

## Why?

Because with the "traditional" factory approach, the component property is overridden by the Component passed to the factory. Thus it become impossible to set a different component to render.

## License

[MIT](https://tldrlegal.com/license/mit-license)