var cors = require('cors');
const express = require('express');
const app = express();

// CORS 이슈해결
// let corsOptions = {
//     origin: '',
//     credential: true
// }
app.use(cors());

//post를 받을수잇도록
app.use(express.json());    //json으로 받을수있도록
app.use(express.urlencoded({ extended:true}));  //post 받기위함

app.post('/textUrl',function(req,res){

    console.log(req.body)

    console.log("-------")
    let{name, name2} = req.body;
    console.log(name);
    console.log(name2);

    res.json({"post:": "test코드"});
});

app.listen(3000,function(){
    console.log("start");
});

app.get('/',function(req,res){
    console.log('root')
    //res.send('루트에대한 요청')

    //__dirname 현재디렉토리
    res.sendFile('/webService/frontend/index.html')
})

app.get('/test',(req,res)=>{
    console.log('about')
    res.send('test에대한 요청')
});

