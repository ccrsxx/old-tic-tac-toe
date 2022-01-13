# Note While Building The Game

## Callback Function in Props

To save typing and avoid the confusing behavior of this, we will use the arrow function syntax for event handlers here and further below:

```tsx
class Square extends React.Component {
  render() {
    return (
      <button className='square' onClick={() => console.log('click')}>
        {this.props.value}
      </button>
    );
  }
}
```

Notice how with onClick={() => console.log('click')}, we’re passing a function as the onClick prop. React will only call this function after a click. Forgetting () => and writing onClick={console.log('click')} is a common mistake, and would fire every time the component re-renders.

## Always call Super in ES6 Class

In JavaScript classes, you need to always call super when defining the constructor of a subclass. All React component classes that have a constructor should start with a super(props) call.

## onClick Method Only Works in Button Element

The DOM \<button> element’s onClick attribute has a special meaning to React because it is a built-in component. For custom components like Square, the naming is up to you. We could give any name to the Square’s onClick prop or Board’s handleClick method, and the code would work the same.

## Best Naming Method and Prop Practice in React

In React, it’s conventional to use on[Event] names for props which represent events and handle[Event] for the methods which handle the events.

## Data Change without Mutation

```tsx
var player = { score: 1, name: 'Jeff' };

var newPlayer = Object.assign({}, player, { score: 2 });
// Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// Or if you are using object spread syntax proposal, you can write:
// var newPlayer = {...player, score: 2 | ...anotherObject};
```

The end result is the same but by not mutating (or changing the underlying data) directly, we gain several benefits described below.
