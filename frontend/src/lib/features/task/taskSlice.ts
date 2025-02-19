import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task, TaskState } from '@/types/task';
import { Query } from '@/types/query';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ page = 1, limit = 10, search = '', status = '' }: Query) => {
    const response = await axios.get(
      `${API_URL}/tasks?page=${page}&limit=${limit}&search=${search}&status=${status}`
    );
    return response.data;
  }
);

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (id: string) => {
    const response = await axios.get(`${API_URL}/tasks/${id}`);
    return response.data;
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, task }: { id: string; task: Partial<Task> }) => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
    return id;
  }
);

const initialState: TaskState = {
  items: [],
  selectedTask: null,
  loading: false,
  error: null,
  total: 0,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    clearSelectedTask: (state) => {
      state.selectedTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.tasks;
        state.total = action.payload.total;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch task';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
      });
  },
});

export const { setSelectedTask, clearSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;
