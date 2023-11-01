const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
const { createLogger } = require("redux-logger");
const videoReducer = require('../features/videos/videos')
const moreVideoReducer = require('../features/moreVideos/moreVideos')

const logger = createLogger();

const store = configureStore({
    reducer : {
        video : videoReducer,
        moreVideo : moreVideoReducer
    },
    middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger) 
})

module.exports = store;