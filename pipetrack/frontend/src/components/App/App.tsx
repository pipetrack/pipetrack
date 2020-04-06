import * as React from 'react';
import './App.css';
import Pipeline from '../Pipeline/Pipeline';

function App() {
    //@ts-ignore
    const useAppClass = !window.isProduction;

    return (
        <div className={useAppClass ? 'App' : 'kek'}>
          <Pipeline />
        </div>
    );
}

export default App;
