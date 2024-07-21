async function getForm(){
    try{
        const response = await fetch("http://localhost:3000/textUrl",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:'TEST_NAME',
                name2 : 'TEST2_NAME2'
            })
        });

        const data = await response.json();
        console.log(data);
        return data;
    }catch(error){
        console.error(error);
    }
}

function getSpinner(){
    $("#loader").css("display","");
}