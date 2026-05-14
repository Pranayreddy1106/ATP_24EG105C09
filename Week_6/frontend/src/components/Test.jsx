import {useContext} from 'react'
import {counterContextObj} from '../contexts/ContextProvider.jsx'
import {useCounterStore} from '../store/CounterStore.js'

function Test() {
    // const {counter1, changeCounter1} = useContext(counterContextObj);
        let newCounter2 = useCounterStore(state => state.newCounter2);
        let incrementCounter2 = useCounterStore(state => state.incrementCounter2);
        let decrementCounter2 = useCounterStore(state => state.decrementCounter2);    
    console.log("TestComponent");
  return (
    <div>
       <h1 className='text-3xl mb-3'>Test</h1>
      <p className='font-bold text-blue-500'>Counter2: {newCounter2}</p>
      <button onClick={incrementCounter2} className='bg-blue-300 p-2 rounded-xl text-white'>Increment</button>
      <button onClick={decrementCounter2} className='bg-blue-300 p-2 rounded-xl text-white'>Decrement</button>
    </div>
  )
};

export default Test;