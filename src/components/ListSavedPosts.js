import React from "react";

const ListSavedPosts = props => {
    console.log(props);
    
    console.log(props.allUsers);

   

    console.log(props.uid)

    const posts = props.allUsers.map(user=>{
        
              return user.value.userSavedPosts
            })
            

    // const myPosts = posts.filter(posts => posts.userID === props.uid)

    // console.log(myPosts)
    
      


    // const hey = props.allUsers.map((item, index) => {
    //     console.log(item.value.uid); 

    //map through all the users 
    // let user = props.allUsers.map(user => {
    //     const allUsers = user.value.UserSavedPosts.map(item => {
    //         return <li key = {item.key} > {item.category} </li>
    //     })  

    // })

        {/* return ( <li key={item.key}>
            <div className="card">
              <h3 className="card-hader">{item.value.uid}</h3>
            </div>
          </li>
        ); 

    }); */}


{/* 
    let recepie = props.recepies.map(recepie=>{
        const allIngredients = recepie.value.allIngredients.map(item => {
           return <li key={uuid.v4()}> {item.ingredient} {item.qty} {item.measurment}</li>
        })
         const allToDos = recepie.value.howToDo.map(item => {
           return <li key={uuid.v4()}> {item.howToDo}</li>
        })
        const user = props.users.filter(user => user.value.uid === recepie.value.userId ).map(user => user.value.name)

        return <div key={uuid.v4()} className="media flex-wrap" style={ {width: "100%"}}>
      
            <img className="d-flex flex-first mr-3" src={recepie.value.imageURL} alt={recepie.value.recepieName} style={ {width: "10em"}}/>
        
        <div className="media-body"> 
            <h5 className="mt-0">{recepie.value.recepieName} </h5>
           <small className="text-muted">
          Recept av {user[0]} </small>
           <p> {recepie.value.description}</p>
             <div className="media mt-3">
                 <div className="media-body">
                     <div className="d-flex justify-content-start flex-wrap">
                <div className="p-2">
                     <h6 className="mt-0">Du behöver:</h6>
            <ul> {allIngredients}</ul>
            </div>
            <div className="p-2 flex-last">
            <h6 className="mt-0">Gör såhär:</h6>
            <ol> {allToDos}</ol>
            </div>
            </div>
            </div>
        </div>
        </div> */}

    
    
      return (
        <div className="harskadomkommaut">
        {/* <ul>{user}</ul> */}
        </div>
      );
    };

export default ListSavedPosts;
