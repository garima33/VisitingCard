import React from 'react'
import {data} from '../data'
import Card from './Card'
export default class VisitingCardList extends React.Component{
  constructor(props){
     super(props)
     this.state= { list : data }
     this.onChangeHandler = this.onChangeHandler.bind(this)
     this.onClickHandler = this.onClickHandler.bind(this)
  }

  onChangeHandler(e, index, name){
     let newArray = this.state.list
     if(e.key == 'Enter'){
        newArray[index][name].value = e.target.value
        newArray[index][name].flag = false
        this.setState({list: newArray})
     }else if(e.key==='Backspace'){
         newArray[index][name].value = e.target.value.slice(0, e.target.value.length-1)
         this.setState({list: newArray})
     }
     else{
         if(e.key.length > 1){

         }else{
             if(name==='phone'&&!isNaN(e.key)){
                 newArray[index][name].value = e.target.value+e.key
                 this.setState({list: newArray})
             }
             else if(name!=='phone'){
                  newArray[index][name].value = e.target.value+e.key
                 this.setState({list: newArray})
             }
         }
     }
  }

  onClickHandler(e, index, name){
     let newArray = this.state.list
      newArray[index][name].flag = true
      this.setState({list: newArray}) 
  }

  render(){

      let UI=  this.state.list.map((item, index)=>{
          let cardProps= {
              index,
              data: item,
              onClickHandler: this.onClickHandler,
              onChangeHandler: this.onChangeHandler
          }
         return(<Card  key={'listItem'+index}{...cardProps}/>)
      })

      return(
        <div className="container" style={{marginTop: '1%'}}>
          {UI}
        </div>
      )
  }
}
