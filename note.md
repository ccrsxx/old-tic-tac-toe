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
