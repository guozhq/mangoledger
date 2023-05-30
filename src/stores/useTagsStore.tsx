import {create} from 'zustand'
import type { FormError } from '../lib/validate'
import { time } from '../lib/time'

type Data = Tag

type List = {
  list: Tag[]
  setList: (data: Tag[]) => void
}
export const useTagsStore = create<List>((set, get) => {
  return {
    list: [],
    setList: (list:Tag[]) => {
      set(state => ({list})
      )
    },
  }
})