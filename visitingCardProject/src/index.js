import React from 'react'
import VisitingCardList from './component'
export class VisitingCardUI extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
     return(
       <div>
         <VisitingCardList/>
       </div>
     )
  }
     
}