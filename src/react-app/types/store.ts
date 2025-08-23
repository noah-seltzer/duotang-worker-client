import { ListenerEffectAPI } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../store'

export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>
