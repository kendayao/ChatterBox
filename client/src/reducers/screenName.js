const screeNameReducer= (state="",action)=>{
    switch(action.type){
        case 'NAME':
           state=action.payload
           return state
        default:
            return state;
    }
};

export default screeNameReducer