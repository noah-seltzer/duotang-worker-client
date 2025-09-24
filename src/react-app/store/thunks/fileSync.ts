import { RootState } from "@/store";
import { selectDocumentListById } from "@/store/clientInfoSlice";
import { updateFile } from "@/store/fileListSlice";
import { CachedFile } from "@/types/CachedFile";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const syncToOneDrive = createAsyncThunk<CachedFile[], string> (
    'fileRow/addFileCacheStatus',
    async (id, { dispatch, getState }) => {

        const state = getState() as RootState
        const list = selectDocumentListById(state, id)

        for (let i = 0; i < list.rows.length; i++) {
            const row = state.fileList.rows.entities[list.rows[i]]
            for (let j = 0; j < row.fileIds.length; j++) {
                const file = state.fileList.files.entities[row.fileIds[j]]
                file.oneDriveSyncStatus = 'syncing'
                dispatch(updateFile(file))
                
            }
        }



        return []
    }

)