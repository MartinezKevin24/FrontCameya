import {atom} from "recoil"

const pageState  = atom({
  key: "pageState",
  default: 1
})

export default pageState