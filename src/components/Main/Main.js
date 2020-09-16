import React from 'react';
import './Main.scss';
// --- components
import { Route, Switch } from 'react-router-dom';
import Faults from './Faults/Faults';
import Passes from './Passes/Passes';
import History from './History/History';
import Contact from './Contact/Contact';

export default function Main() {
  return (
    <div className='Main'>
      <Switch>
        <Route path='/fault' component={Faults} />
        <Route path='/passes' component={Passes}/>
        <Route path='/history' component={History} />
        <Route path='/contact' component={Contact}/>
      </Switch>
    </div>
  )
}
