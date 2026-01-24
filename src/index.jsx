import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import App from './App';

render(
  () => (
    <Router>
      <Route path="/" component={App} />
      <Route path="/instrument/:instrument" component={App} />
      <Route path="/instrument/:instrument/:query" component={App} />
      <Route path="/tuning/:tuning" component={App} />
      <Route path="/tuning/:tuning/:query" component={App} />
    </Router>
  ),
  document.getElementById('app')
);
