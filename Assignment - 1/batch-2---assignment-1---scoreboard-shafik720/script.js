
// --- Action identifiers 
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD_MATCH = "ADD_MATCH";
const RESET_SCORES = "RESET_SCORES";


// ------------------------------ Action creators
// --- action for increasing match score
const increment = (id, value) => {
    return {
        type: INCREMENT,
        id: id,
        value: value,
    }
}

// --- action for decreasing match score
const decrement = (id, value) => {
    return {
        type: DECREMENT,
        id: id,
        value: value,
    }
}

// --- action for adding a new match when clicking 'Add Another Match' button
const addMatch = () => {
    return {
        type: ADD_MATCH
    }
}

// --- action for resetting score when clicking 'Reset' button
const resetScores = () => {
    return {
        type: RESET_SCORES
    }
}

// --- Reducer
const initialState = {
  matches: [
    {
      id: 1,
      incrementValue: 0,
      decrementValue: 0,
      score: 0,
    },
  ],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        matches: state.matches.map((match) =>
          match.id === action.id
            ? { ...match, score: match.score + action.value }
            : match
        ),
      };

      case DECREMENT:
        const match = state.matches.find((match) => match.id === action.id);
        const decrementLimit = match.score; // set decrement limit as current score
        const decrementValue = action.value > decrementLimit ? decrementLimit : action.value; // check if the decrement value exceeds the limit and set it accordingly
        return {
          ...state,
          matches: state.matches.map((match) =>
            match.id === action.id
              ? { ...match, score: match.score - decrementValue }
              : match
          ),
        };

    case ADD_MATCH :
        const newId  = state.matches.length + 1;
        return{
            ...state, 
            matches : [
                ...state.matches, 
                {
                    id : newId,
                    incrementValue : 0,
                    decrementValue : 0,
                    score : 0,
                }
            ]
        }

    case RESET_SCORES:
        return{
            ...state,
            matches : state.matches.map((match)=> ({...match, score : 0})),
        };

        default:
            return state;
    }
}


// --- redux store
const store = Redux.createStore(reducer);

// --- handle form submission
const handleFormSubmit = (event, id, isIncrement) => {
    event.preventDefault();
    const inputValue = parseInt(event.target.querySelector("input").value, 10);

    if (!isNaN(inputValue)) {
        const action = isIncrement
            ? increment(id, inputValue)
            : decrement(id, inputValue);

        store.dispatch(action);
    }
};

// --- Handle add another match button click
document.querySelector('.lws-addMatch').addEventListener('click', () => {
    store.dispatch(addMatch());
})


// --- Handle reset button click
document.querySelector('.lws-reset').addEventListener('click', () => {
    store.dispatch(resetScores());
})


// --- Rendering the matches
const render = () => {
    const allMatches = document.querySelector('.all-matches');
    const matchesHtml = store.getState().matches.map((match) => `
    <div class="match">
    <div class="wrapper">
        <button class="lws-delete">
            <img src="./image/delete.svg" alt="" />
        </button>
        <h3 class="lws-matchName">Match ${match.id} </h3>
    </div>
    <div class="inc-dec">
        <form class="incrementForm" onsubmit="handleFormSubmit(event, ${match.id}, true)" >
            <h4>Increment</h4>
            <input type="number" name="increment" class="lws-increment" id="increment-${match.id}" />
        </form>
        <form class="decrementForm" onsubmit="handleFormSubmit(event, ${match.id}, false)">
            <h4>Decrement</h4>
            <input type="number" name="decrement" class="lws-decrement" id="decrement-${match.id} " />
        </form>
        </div>
        <div class="numbers">
            <h2 class="lws-singleResult" id="score-${match.id}" >${match.score}</h2>
        </div>
    </div>
    `).join("");
    allMatches.innerHTML = matchesHtml;
}


// --- Subscribing to the store
store.subscribe(render);

// --- rendering initial matches
render();