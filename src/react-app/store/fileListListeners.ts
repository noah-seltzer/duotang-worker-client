import { AppListenerEffectAPI } from "../types/store"
import { addRow } from "./fileListSlice"

// async function afterAddRow(
//   {
//     payload,
//   }: ReturnType<typeof addRow>,
//   { dispatch, getState, getOriginalState, condition }: AppListenerEffectAPI,
// ) {
//     // const rows = getState().fileList.rows.entities
//     // const newestRow = getState().fileList.rows.entities.

//     // const 
// //   const counter = counterSelectors.selectById(getState(), id)

// //   if (!counter || !counter.intervalMs) {
// //     console.error(`invalid counter update request`)
// //     return
// //   }

// //   const counterBefore = counterSelectors.selectById(getOriginalState(), id)

// //   if (counterBefore?.intervalMs) {
// //     console.error(`counter with id "${id}" is already updating periodically`)
// //     return
// //   }

// //   const intervalRef = setInterval(() => {
// //     dispatch(counterActions.updateBy({ id, delta }))
// //   }, counter.intervalMs)

// //   await condition(shouldStopAsyncTasksOf(id))

// //   clearInterval(intervalRef)
//   console.log(`stopped periodic update of ${counter.id}`)
// }