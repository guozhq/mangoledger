import * as React from 'react'
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    truncate?: boolean
    flex?: boolean
    grid?: boolean
    relative?: boolean
    bg?:string
    rounded?:string
    fixed?:boolean
    b?:string
    w?:string
    z?:string
    block?: boolean
    'focus:shadow'?: boolean
    absolute?:boolean
    top?:string
  }
}