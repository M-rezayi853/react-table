import React, { forwardRef, useRef, useEffect } from 'react'

// eslint-disable-next-line react/display-name
export const Checkbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef()
  const resolvedRef = ref || defaultRef

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <>
      <input type={'checkbox'} ref={resolvedRef} {...rest} />
    </>
  )
})
