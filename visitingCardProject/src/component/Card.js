import React from 'react'

export default class Card extends React.Component{
    constructor(props){
      super(props)
    }

    render(){
        const {
            index, 
            data,
            onChangeHandler,
            onClickHandler
        } = this.props

        let UI = Object.keys(data).map((item, index1)=>{
            let type= 'text'
            let maxLength = 50
            if(item==='phone'){
                type = 'number'
                maxLength = 10
            }
           if(data[item].flag){
               return(
                  <div key={'item'+index1} className="form-group">
                      <div className="col-xs-6">
                      <label className="control-label"> {item} :</label>
                    </div>
                      <input type={type} value={data[item].value} name={item} maxLength={maxLength} onKeyDown={(e)=>{onChangeHandler(e, index, item)}}/>
                </div>
            )
           }else{
               return(
                <div key={'item'+index1} className="form-group">
                    <div className="col-xs-6">
                      <label className="control-label"> {item} :</label>
                    </div>

                      <div onDoubleClick={(e)=>{onClickHandler(e, index, item)}}>{data[item].value}</div>
               </div>)
           }
        })

        return(
          <div className="col-xs-4" style={{border: '1px solid black'}}>
             {UI}
          </div>)
    }
}