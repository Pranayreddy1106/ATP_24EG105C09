import {create} from 'zustand'

//create store
export const useCounterStore = create((set) => ({
    newCounter1:0,
    newCounter2:100,
    //add user state(name, age, email)
    user:{name: "ravi", email: "ravi@gmail.com", age:21},
    //function to change email
    changeEmail:() => set({...user, email: "ravikumar@gamil.com"}),
    //fucntion to change name and age
    changeNameAndAge:() => set({...user, name: "Raviii", age: 25}),
    //function to modify the state
    incrementCounter1:() => set((state) => ({newCounter1: state.newCounter1+1})),
    decrementCounter1:() => set((state) => ({newCounter1: state.newCounter1-1})),
    incrementCounter2:() => set((state) => ({newCounter2: state.newCounter2+2})),
    decrementCounter2:() => set((state) => ({newCounter2: state.newCounter2-2})),
    reset: () => set({newCounter1:0}),
    //function to chage counter1 to 500
    changeCounter: () => set({newCounter1:500}),
    //function to decrement counter by 20
    decrementCounterBy20:() => set((state) => ({newCounter1: state.newCounter1-20})) 
}))