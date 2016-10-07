
import Counter from '../src/Components/Counter'
import Hello from '../src/Components'
import NotFound from '../src/Components/404'

module.exports = {
  path: '/',
  component: Counter,
  indexRoute: {
    component: Hello
  },
  childRoutes: [
    {
      path: '*',
      component: NotFound
    }
  ]
}
