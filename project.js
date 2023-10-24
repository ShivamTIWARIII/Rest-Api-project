let form=document.querySelector("form");
let main=document.querySelector("#main");

form.addEventListener("submit",((event)=>{
    event.preventDefault()

    let price=event.target.price.value;
    let name=event.target.product.value;
    let ctgry=event.target.ctgry.value;

    let newOrder=({
        price,
        name,
        ctgry
    })

    axios.post("https://crudcrud.com/api/94988cf1a71a43d69093d8d339c48e1e/project",newOrder)
    .then((res)=>{
        event.target.reset()
        displayData()
       
    })
    .catch((err)=>{
        console.log(err)
    })
}))

function removeData(id){
    axios.delete(`https://crudcrud.com/api/94988cf1a71a43d69093d8d339c48e1e/project/${id}`)
    .then((res)=>{
        displayData()
    })
    .catch((err)=>{
        console.log(err)
    })
}




function displayData() {
    axios.get("https://crudcrud.com/api/94988cf1a71a43d69093d8d339c48e1e/project")
        .then((res) => {
            let orders = res.data;
            let electronicsData = "";
            let foodData = "";
            let skincareData = "";

            orders.forEach((element) => {
                const finalData = `
                    <div>
                        ${element.price}-${element.name}-${element.ctgry}
                        <button onclick='removeData("${element._id}")'>Delete Order</button>
                    </div>
                `;

                if (element.ctgry === "Electronics") {
                    electronicsData += finalData;
                } else if (element.ctgry === "Food") {
                    foodData += finalData;
                } else if (element.ctgry === "Skincare") {
                    skincareData += finalData;
                }
            });

            
            document.querySelector("#electronics").innerHTML = `<h1>Electronics Items</h1>${electronicsData}`;
            document.querySelector("#fooditems").innerHTML = `<h1>Food Items</h1>${foodData}`;
            document.querySelector("#skincare").innerHTML = `<h1>Skincare Items</h1>${skincareData}`;
        })
        .catch((err) => {
            console.log(err);
        });
}

displayData()
