
const initialState = [
    { id: 0, name: "31223423423", lastname: "asdasdasdasdasd", age: 1234567890, address: "asdasdasdasdasdas"},
    { id: 1, name: "312234232423", lastname: "asdasda2sdasdasd", age: 12345672890, address: "asd2asdasdasdasdas"},
  ];
  
  const contactReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_CONTACT":
        state = [...state, action.payload];
        return state;
      case "DELETE_CONTACT":
        const contactFilter = state.filter((contact) =>
          contact.id !== action.payload && contact);
        state = contactFilter;
        return state;
      case "UPDATE_CONTACT":
        const updateState = state.map((contact) =>
          contact.id === action.payload.id? action.payload : contact
        );
        state = updateState;
        return state;
      case "RESET_CONTACT":
        state = [{ name: null, lastname: null, age: null ,address: null}];
        return state;
        default:
        return state;
    }
  };
  

  export default contactReducer;