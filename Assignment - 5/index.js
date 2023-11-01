require('util').inspect.defaultOptions.depth = null;
const store = require("./rtk/app/store");
const { actionCreators, fetchMoreVideos } = require("./rtk/features/moreVideos/moreVideos");
const { fetchVideos } = require("./rtk/features/videos/videos");


/* console.log('Initial State : ', store.getState());

store.subscribe(() => {
    console.log('Updated State : ', store.getState());
}) */


store.dispatch(fetchVideos()).then(()=>{
    store.dispatch(actionCreators.setTags(store.getState().video.tags));
}).then(()=>{
    store.dispatch(fetchMoreVideos());
})