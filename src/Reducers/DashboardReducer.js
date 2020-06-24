const initialState = {
        
    user : ''
}

const DashboardReducer = (state = initialState,action)=>{
    switch(action.type){
         case 'USER':
             return {
                 ...state,
                 user : action.value
             }
    }

    return state;
}

export default DashboardReducer;