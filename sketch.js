
var dog,happyDog,dogImage,happyDoyImage,foodS,foodStock,lastFed;
var database;
var bottleImage;
var fedTime,lastFed;
var foodObj;

function preload()
{
  
  dogImage=loadImage("images/dogImg.png");
  happyDogImage=loadImage("images/dogImg1.png");
    
    
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  dog=createSprite(250,250,10,10);
  dog.addImage(dogImage);
  
  foodObj=new Food();

  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImage);
}
text("food remaining:"+foodS,200,220);
text("press up arrow to fed the dog",200,100);
  drawSprites();
  
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("last feed:"+lastFed%12+"pm",350,30);
}else if(lastFed==0){
  text("last feed : 12 am",350,30)
}else{
  text("last feed:"+lastFed+"am",350,30);
}
function readStock(data){
  foodS=data.val();
  foodObj.foodStock = foodS;
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1
  }
  database.ref('/').update({
    food:x
  })
}
function addFoods(){
  foodS++;
  database.ref("/").update({
    food:foodS
  })
}
function feedDog(){
  dog.addImage(happyDogImage);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    food:foodObj.getFoodStock(),
    FeedTime:hour()

  });
}
}
