import * as React from 'react';

export const navigationRef = React.createRef();

// export function navigate(name) {
//   navigationRef.current?.navigate(name);
// }

export function push(...args) {
    navigationRef.current?.dispatch(StackActions.push(...args));
  }

  export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
  }