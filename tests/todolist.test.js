// __tests__/CheckboxWithLabel-test.js
import * as g from '../src/globals.js'
import React from 'react'
import {mount} from 'enzyme'
import { expect } from 'chai'
import TodoList from '../src/views/components/todo-list.jsx'
import * as enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import Storage from '../src/utils/storage'

enzyme.configure({ adapter: new Adapter() })

const testStorage = () => 
  new Storage('todolist-test', [
    {title: 'test todo #1', completed: false},
    {title: 'test todo #2', completed: false},
    {title: 'test todo #3', completed: false}
  ])

test('it can toggle todos done', () => {
  const storage = testStorage()
  const todolist = mount(<TodoList storage={storage} />)

  const firstTodo = todolist.find('.todolist__todo').first()
  expect(firstTodo.find('label').html()).to.equal('<label class="space-xs space-clear-tb" for="test todo #1">test todo #1</label>')

  firstTodo.find('input[type="checkbox"]').simulate('change')
  expect(firstTodo.find('label').html()).to.equal('<label class="space-xs space-clear-tb" for="test todo #1"><s>test todo #1</s></label>')

  firstTodo.find('input[type="checkbox"]').simulate('change')
  expect(firstTodo.find('label').html()).to.equal('<label class="space-xs space-clear-tb" for="test todo #1">test todo #1</label>')

  storage.clear()
})

// TODO: fix this test
test.skip('it can add todos', () => {
  const storage = testStorage()
  const todolist = mount(<TodoList storage={testStorage()} />)
  
  expect(todolist.find('.todolist__todo')).to.have.lengthOf(3)

  const form = todolist.find('.todolist__form')
  const input = form.find('input[type="text"]')
  console.log(input.html())
  // TODO: Simulate does not work for some reason
  // html seems to have new value though?
  input.simulate("change", { target: { value: "foo" }})
  console.log(input.html())
  
  // TODO: simulate not working here also?
  form.simulate('submit')

  expect(todolist.find('.todolist__todo')).to.have.lengthOf(4)


  // expect(input.text()).to.contain('foo')

  storage.clear()
})

test('it can remove todos', () => {
  const storage = testStorage()
  const todolist = mount(<TodoList storage={storage} />)

  expect(todolist.find('.todolist__todo')).to.have.lengthOf(3)

  todolist.find('.todolist__todo').first().find('button').simulate('click')
  expect(todolist.find('.todolist__todo')).to.have.lengthOf(2)

  todolist.find('.todolist__todo').first().find('button').simulate('click')
  expect(todolist.find('.todolist__todo')).to.have.lengthOf(1)

  todolist.find('.todolist__todo').first().find('button').simulate('click')
  expect(todolist.find('.todolist__todo')).to.have.lengthOf(0)

  expect(todolist.find('.todolist__done').text()).to.equal('All done!')

  storage.clear()
})  