/* @flow */
import React from 'react'

type propTypes = {
  component: any,
}

export const createFactory = (Higher: any) => (Lower: any) => {
  const Factory = ({component, ...props}: propTypes) => {
    const FactoryComponent = (props) => <Lower component={component} {...props} />
    return <Higher {...props} component={FactoryComponent} />
  }
  return Factory
}

export default createFactory