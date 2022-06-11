import React from "react";

class TodoList extends React.Component{
 
    render(){   
        return(
            <ul className="list-group list-group-flush">
            {
                this.props.items.map((value, index)=>{
               return (
               <React.Fragment key={index}>
               <li className="list-group-item bg-light d-flex justify-content-between">{value}
               <button className="btn text-danger badge" onClick={()=>{this.props.deleteTodo(index)}}>X</button>
               </li>     
               </React.Fragment>
               )
                })
               }
            </ul> 
            );
    }
}
export default TodoList;
