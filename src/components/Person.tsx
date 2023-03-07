import React from 'react';

function addAge(Target: Function): void {
  Target.prototype.age = 24;
}

@addAge
class Person extends React.Component<any, any> {
  age?: number;

  render() {
    return <h2>我是带装饰器的类组件，我的属性值是{this.age}</h2>;
  }
}

export default Person;
