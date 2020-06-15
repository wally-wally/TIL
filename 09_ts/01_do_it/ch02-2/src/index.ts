import IPerson from './perseon/IPerson'
import Person from './perseon/Person'
import Chance from 'chance'
import * as R from 'ramda'

const chance = new Chance()
let persons: IPerson[] = R.range(0, 2)
  .map((n: number) => new Person(chance.name(), chance.age()))
console.log(persons)