import * as React from 'react'
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    flex?: boolean
    grid?: boolean
    relative?: boolean
    bg?:string
    rounded?:string
    fixed?:boolean
    cursour-pointer?:boolean
  }
}