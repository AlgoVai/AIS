import { useState } from "react"


function Institution(){

    const [insData , setData]  = useState(
        {
            Name : " ",
            Address : " " , 
            url : " ",
            IsActive : " ",
        }
    )

    return (
        <>
       <div className="ui-border">
        <form>
            <div className="my-row">
                <div className="my-col">
                    <div className="from-group">
                        <label>Name</label>
                        <input type="text" placeholder="Name"></input>
                    </div>
                </div>
                <div className="my-col">
                    <div className="from-group">
                        <label>Address</label>
                        <input type="textarea"  placeholder="Address"/>
                    </div>
                </div>
                <div className="my-col">
                    <div className="from-group">
                        <label>IsActive</label>
                        <input type="checkbox" ></input>
                    </div>
                </div>
            </div>
            
        </form>
       </div>
        </>
    )
}
export default Institution