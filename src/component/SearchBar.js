import React, { Component } from 'react'


 export const SearchBar =({onChange})=>(
<div>
<input type="text" placeholder="input field" onChange={onChange}></input> <button>send</button>
</div>
)