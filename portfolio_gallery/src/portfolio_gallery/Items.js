import data from "./Data";

function Items({data}){
    return (
        <div className="row ">
        {
          data.map((value)=>{
           const {id, image, title, description} = value;
           return (
            <div className="col-sm-3 my-3" key={id}>
             <div className="card bg-light text-center">
                 <img src={image} className="img-thumbnail" style={{height:"200px"}}/>
                 <h3>{title}</h3>
                 <p>{description}</p>
            </div>
         </div>
           )
          })
        }

</div>
    )
}

export default Items;