const  express=require("express");
const bodyParser=require("body-parser");
const https =require("https");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
const city= req.body.cityName;

    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=679ca1c65acb30311690e205396461ba&units=metric";

    https.get(url, function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const weatherTemp=weatherData.main.temp;
            const weatherDesription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperature in "+city+" is "+ weatherTemp +" degree</h1>");
            res.write("<h1>The weather is currently" + weatherDesription + ".</h1>");
            res.write("<img src=" + imgUrl+">");
            res.send();
        })
    }) 
})


app.listen(3000, function() {
    console.log("Server is running on port 3000");
})