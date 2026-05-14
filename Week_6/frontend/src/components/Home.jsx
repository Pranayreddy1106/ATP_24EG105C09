import {useContext} from 'react'
import {counterContextObj} from '../contexts/ContextProvider.jsx'
import Test from './Test.jsx'
import {useCounterStore} from '../store/CounterStore.js'


function Home() {
  // const {counter, changeCounter} = useContext(counterContextObj);
  let newCounter1 = useCounterStore(state => state.newCounter1);
  let incrementCounter1 = useCounterStore(state => state.incrementCounter1);
  let decrementCounter1 = useCounterStore(state => state.decrementCounter1);
  console.log("HomeComponent");
  return (
    <div>
      {/* <h1 className='text-3xl mb-3'>Home</h1>
      <p className='font-bold text-blue-500'>Counter: {counter}</p>
      <button onClick={changeCounter} className='bg-blue-300 p-2 rounded-xl text-white'>Increment</button> */}

      <h1 className='text-3xl mb-3'>Home</h1>
      <p className='font-bold text-blue-500'>NewCounter1: {newCounter1}</p>
      <button onClick={incrementCounter1} className='bg-blue-300 p-2 rounded-xl text-white'>Increment</button>

      <Test />
    </div>
  )
}

export default Home