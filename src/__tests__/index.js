/* eslint-env node, jest */
import React from 'react'
import {render} from 'enzyme'
import createReactFactory from '../index'

type propTypes = {
  component: any,
}

// Components
const A = ({component: Component = 'a', ...props}: propTypes) => (
  <Component data-a {...props} />
)
const B = ({component: Component = 'b', ...props}: propTypes) => (
  <Component data-b {...props} />
)
const C = ({component: Component = 'i', ...props}: propTypes) => (
  <Component data-c {...props} />
)

// Factories
const aFactory  = createReactFactory(A)
const bFactory  = createReactFactory(B)

// Compound
const AonB      = aFactory(B)
const AonBonC   = aFactory(bFactory(C))

const getElementRender = (element) => render(element).children()

describe('Single factory application', () => {
  const el = getElementRender(<AonB data-custom />)
  it('passes each properties of each components downward', () => {
    expect(el.is('[data-a][data-b]')).toBe(true)
  })
  it('passes input properties downward', () => {
    expect(el.is('[data-custom]')).toBe(true)
  })
  it('renders using the default component property of the wrapped component', () => {
    expect(el.is('b')).toBe(true)
  })
})

describe('Single factory application with custom component property', () => {
  const el = getElementRender(<AonB component="div" data-custom />)
  it('passes each properties of each components downward', () => {
    expect(el.is('[data-a][data-b]')).toBe(true)
  })
  it('passes input properties downward', () => {
    expect(el.is('[data-custom]')).toBe(true)
  })
  it('renders using the input component property', () => {
    expect(el.is('div')).toBe(true)
  })
})

describe('Multiple factories application', () => {
  const el = getElementRender(<AonBonC data-custom />)
  it('passes each properties of each components downward', () => {
    expect(el.is('[data-a][data-b][data-c]')).toBe(true)
  })
  it('passes input properties downward', () => {
    expect(el.is('[data-custom]')).toBe(true)
  })
  it('renders using the default component property of the wrapped component', () => {
    expect(el.is('i')).toBe(true)
  })
})

describe('Multiple factories application with custom component property', () => {
  const el = getElementRender(<AonBonC component="div" data-custom />)
  it('passes each properties of each components downward', () => {
    expect(el.is('[data-a][data-b][data-c]')).toBe(true)
  })
  it('passes input properties downward', () => {
    expect(el.is('[data-custom]')).toBe(true)
  })
  it('renders using the input component property', () => {
    expect(el.is('div')).toBe(true)
  })
})