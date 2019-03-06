export const chooseCountry = (country)=>{
    return {type:'ChooseCountry', country}
};

export const loadData=(payload)=>{
    return {type:'loadData',payload}
};