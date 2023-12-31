import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

const initialState = {
  earthquakes: [],
  isLoading: false,
  error: null,
  minMagnitude: 4,
  maxMagnitude: 5,
};

export const FetchQuakeMag = createAsyncThunk('earthquake/FetchQuakeMag', async (_, { getState }) => {
  const { earthquake } = getState();
  const { minMagnitude, maxMagnitude } = earthquake;

  const response = await fetch(apiUrl);
  const data = await response.json();

  const filteredQuakes = data.features.filter(
    (quake) => quake.properties.mag >= minMagnitude && quake.properties.mag <= maxMagnitude,
  );
  return filteredQuakes;
});

const earthquakeSlice = createSlice({
  name: 'earthquake',
  initialState,
  reducers: {
    setMinMagnitude: (state, action) => {
      state.minMagnitude = action.payload;
    },
    setMaxMagnitude: (state, action) => {
      state.maxMagnitude = action.payload;
    },
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchQuakeMag.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(FetchQuakeMag.fulfilled, (state, action) => {
        state.isLoading = 'succeeded';
        state.earthquakes = action.payload;
      })
      .addCase(FetchQuakeMag.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setMinMagnitude, setMaxMagnitude } = earthquakeSlice.actions;

export default earthquakeSlice.reducer;
