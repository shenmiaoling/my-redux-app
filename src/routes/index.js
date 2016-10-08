import Counter from '../Components/Counter'
import Hello from '../Components'
import NotFound from '../Components/404'

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
