// import Queue from "./queue.js";
// first we will fix the height and width of the maze let it be 32 px for now
// we can randomly generate the maze's attribute aftrwords
// and gap in between is 17 for default
let width = 32;
let height = 32;
let uniter = 17;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// one have 32 x 32 grid now we will put the horizontal and vertical lines
// first we will use probabilty in this 
// for now use for horizontal is .65 and for width is .8
// we can use the idea of random 0-1 and multiply with there respectie probabilty
// if the random no comes under 0-.65 then it will be there if not the horizontal
// will not be there and same for the vertical lines
// for now i will use div tag 

// i will make the adjacency list now
// for now i have 
/*var data = {
    'PropertyA': [1,2],
    'PropertyB': [3,4],
    'PropertyC': [5,6]
};
var a ="PropertyD";
var b =[7,8]; 
data[a] = b;
data[a].push(b);

// dialog box with 4 in it
alert(data.PropertyD);
alert(data["PropertyD"]);
*/
// for now default is 42/48 h/v
var mazeAdjacencyList = {};
var adjacencyList = {};
let probability_horizontal_bar = 42;
let probability_vertical_bar = 48;
var starting = [];
var ending = [];

for(var i=0,k=1;i<height;i++)
{
    for(var j=0;j<width;j++,k++)
    {
        var index=0;
        var edge =[];        
        // var names = "Edge"+k; 
        var names=k;
        // console.log("k "+k);
        var probability=Math.floor((Math.random()*101));
        // console.log("probabilty1 "+probability);        
        if(i==height-1&&j==width-1)
        {
            
        }
        else if(i==height-1 && j!=width-1)
        {
            if(probability<=probability_vertical_bar)//right
            {
                edge[index] = k+1;
            }
        }
        else if(i!=height-1 && j==width-1)
        {
            if(probability<=probability_horizontal_bar)//down
            {
                edge[index] = k+width;
            }
        }
        else
        {
            if(probability<=probability_horizontal_bar)//right
            {
                edge[index++]=k+1;
            }
            probability = Math.floor((Math.random()*101));
            // console.log("probabilty2 "+probability);        
            if(probability<=probability_vertical_bar)//down
            {
                edge[index]=k+width;
            }
        }
        // console.log("egde "+edge);
        // mazeAdjacencyList[names];
        mazeAdjacencyList[names]= edge;
    }
}
// what is done is half adjacecy list is done 
// to make it full i have to traverse every one and add the reduncet one to the list;
// console.log(mazeAdjacencyList);
// mazeAdjacencyList[""].push();
var c = document.getElementById("myCanvas");
c.width=(width-1)*uniter;
c.height=((height-1))*uniter;
var ctx = c.getContext("2d");
// ctx.beginPath();
for (const [key, value] of Object.entries(mazeAdjacencyList)) {
//     console.log(`${key}: ${value}`);
//   }
// for(let i in mazeAdjacencyList)
// {
    
    for(let j in value)
    {
        // if(value!=undefined)
        // {
        var move_x = (key-1)%width;
        var move_y = Math.floor((key-1)/width);
        /*if(move_y==0)
        {
            move_y = 0;
        }
        else
        {
            move_x++;
        }*/
        // move_x--;
        // move_y--;
        //#console.log("movex "+move_x+" movey "+move_y+" j "+j);
        ctx.beginPath();  
        ctx.moveTo(move_x*uniter,move_y*uniter);
        //#console.log("move from  ("+move_x*uniter+","+move_y*uniter+")");
        if(value[j]-key==1)
        {
            //#console.log("hori "+" x "+move_x*uniter+" y "+((move_y*uniter)+uniter));
            ctx.lineTo(((move_x*uniter)+uniter),(move_y*uniter));
        }
        else
        {
            //#console.log("vert "+" x "+((move_x*uniter)+uniter)+" y "+move_y*uniter);
            ctx.lineTo((move_x*uniter),((move_y*uniter)+uniter));
        }
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.stroke();
        // #console.log("values: "+value[j]+" key "+key);
        // }
    }
}
/*
//here i will make a adjancy list of the nodes;
for(const [key, value] of Object.entries(mazeAdjacencyList))
{
    for(var j in value)
    {
        if(j!=undefined)
        {
            //#console.log(value[j]+" "+j);
            //#console.log("key: "+key+": "+mazeAdjacencyList[value[j]]);
            //#console.log(mazeAdjacencyList[value[j]].indexOf(key));
            if(mazeAdjacencyList[value[j]].indexOf(parseInt(key)) == -1)
            {
                mazeAdjacencyList[value[j]].push(parseInt(key));
            }
       }
    }
}*/

// make the adjacency list for the traversal name: adjacencyList 
// make a prototype of the adjacency list
for(var i=0;i<(height-1)*(width-1);i++)
{
    adjacencyList[i+1] = [];
}
// prototype done
// console.log(adjacencyList);
// now we have to add the there respective value in it;
// first we will see the starting part:
for(const [key , value] of Object.entries(mazeAdjacencyList))
{
    // if(key%height!=0&&value.length!=2)
    if(key%height!=0)
    {
        var values = parseInt(value[0]);
        var position = parseInt(key)+1;
        if((value.length!=2)&&(key<=width||key>(width-1)*height)) // this is the path of the starting way
        {   
            if(value.length == 0||values!=position)
            { 
                if(key<=width)
                    starting.push(parseInt(key-Math.floor(key/width)));//value
                else if(key>(width-1)*height)
                    ending.push(parseInt(key-width-Math.floor((key-width)/width)));//value
                else
                    console.log("Something is left you noob!");
            }
        }
        //geneal case except the bedrock
        //here  we will modify the adjacencyList
        // threee error 2 in vertical one in horizontal 1 vertical is one more coloum in code, 2nd is place of minus 1 isplace of minus
        if(key>width)
        {
            var pos = parseInt(key)-parseInt(width)+1
            // console.log(mazeAdjacencyList[key-width].length);
            if((value.length!=2)&&((key<height*width-width)&&((value.length==0||(values!=position)&&(key<(height-1)*width)))))// this will see all the horizontal and first null clases
            {
                // console.log("value added by the horizonatal");
                adjacencyList[(key-width-Math.floor((key-width)/width))].push(parseInt(key-Math.floor(key/width)));
                // adjacencyList[(key-width-Math.floor((key-width)/width))].push(parseInt(key-Math.floor((key-width)/width)));
            }
            // console.log(key-width + " " + mazeAdjacencyList[key-width] +" "+ mazeAdjacencyList[key-width].length);
            // console.log((pos)+" " + mazeAdjacencyList[pos]+" "+mazeAdjacencyList[pos].length);
            
            // if(parseInt(mazeAdjacencyList[key-width].length)!=2&&(parseInt(key%width)<parseInt(height-1))) // as we are assuming all the horizontal is done so we 
            var length = mazeAdjacencyList[pos].length; 
            if(length!=2&&key%width<width-1) // as we are assuming all the horizontal is done so we 
                                                                        // will only focus on vertical 
            // else if(parseInt(value[0])!=(parseInt(key)))
            {
                var a = parseInt(mazeAdjacencyList[pos][0]);
                var b = parseInt(key)+1;
                if(mazeAdjacencyList[pos].length==0)// if point is empthy means no horizontal line 
                {
                    // adjacencyList[(key-width-Math.floor((key-width)/width))].push((key-Math.floor((key-width)/width)));
                    adjacencyList[(key-width-Math.floor((key-width)/width))].push(pos-Math.floor((key-width)/width));// vertical add
                }
                else if(a!=b)// means length = 1 //if one check if link is horizontal or vertical if vertical then do nothing else add
                {
                    // if(mazeAdjacencyList[pos][0]!=key+1)
                    // {
                        adjacencyList[(key-width-Math.floor((key-width)/width))].push(pos-Math.floor((key-width)/width));
                    // }
                    // else
                        // console.log("Something is left check the adjacency list");
                }
            }
        }
    }
}
//Note: I haven't see  the output of adjacency list as this output mostpropably wrong and it's first reason should be the wrong 
// value added due to different data types and i don't know how js will react and for that i will see how the thing will work
// console.log(adjacencyList);
// console.log(starting);
// console.log(ending);
// as half of the adjacency list is ready now we have make if full with the help of this following code

for(const [key, value] of Object.entries(adjacencyList))
{
    for(var j in value)
    {
        if(j!=undefined)
        {
            if(adjacencyList[value[j]].indexOf(parseInt(key)) == -1)
            {
                adjacencyList[value[j]].push(parseInt(key));
            }
       }
    }
}

// as now adjacency list is ready now we have to put differenet different algorithm for first we will try bfs on this

var visited = new Array((height-1)*(width-1)+1).fill(false);
var traverser = [];
var ans = [];
var pre = new Array((height-1)*(width-1)+1).fill(null);
var flag = false;
var end,starts;
var counter = {};
var rowWinner = {};
// adjacencey list undefinded exception to be handeled
// var i=0;
while(starting.length!=0)
{
    visited.fill(false);
    var start = starting.shift();
    var checker = 0;
    visited[start] = true;
    traverser.push(start);
    var it = 1;
    var tempArray = [];
    starts = start;
    while(traverser.length!=0)
    {
        var winnerArray = [];
        var temp = traverser.shift();
        ans.push(temp);
        if(ending.indexOf(temp) != -1)
        {
            end = temp;
            flag = true;
            break;
        }
        for(var i = 0;i<adjacencyList[temp].length;i++)
        {
            var index = adjacencyList[temp][i];
            if(visited[index]==false)
            {
                visited[index] = true;
                traverser.push(index);
                tempArray.push(index);
                pre[index]=temp;
            }
        }
        
        if(checker == 0)
        {
            // if(it==1){
            //     counter[it]=temp;
            //     it++;
            // }
            counter[it]=tempArray;
            rowWinner[it]=winnerArray;
            checker = tempArray.length;
            for(var i=0;i<tempArray.length;i++)
            {
                // for what i want there is two soln. in mind one is short but bad time, so right now i'm going with better 
                //and complex (long) one 
                var valueByTemp = Math.floor((tempArray[i]-1)/(width-1));
                if(winnerArray.length == 0)
                    winnerArray.push(tempArray[i]);
                else
                {
                    var tempValue = Math.floor((winnerArray[0]-1)/(width-1));
                    if(valueByTemp == tempValue)
                        winnerArray.push(tempArray[i]);
                    if(valueByTemp > tempValue)
                    {
                        winnerArray = [];
                        winnerArray.push(tempValue[i]);
                    }
                }
            }
            tempArray = [];
            winnerArray = [];
            it=it+1;
        }
        checker=checker-1;
    }
    if(flag == true)
        break;
    ans=[];
    pre = [];
    counter = {};
    rowWinner = {};
    // console.log(++i+" "+ans);
}

// console.log("the bfs ans will be:");
// console.log(ans);
// console.log(counter);

// animation of part:
// first we will display only the path
// for that i will put white colour box:wehre answerr is ther

// to find y means height i can do is to first get the no and divid by the width of maze it will tell me in which 
// row the no. exits in 0 indexing 
// to find x means which coloum i do is to get the rem of the no and width as it will give the postion of the no. place in the 
// row as if rem is 0 means it is in last or we can make it index 0 by make doing no-1;
// as for eg    1   2   3
//              4   5   6   
//              7   8   9
// lets say i want to make a square at the place of 5 we will first take 4/3=1=2 and rem = 2 which is x means (1,1)
// and the uniter is 4 = 4,4,4,4 and box will be made on 4,4 point and areaof 16
// and as we know the point were the nos box starts we can easily make a graph
// ctx.beginPath();

// for now the whole path tha bfs covers is in here means ans will have at worst case width-1*height-1 space; we have to optimise it in future; for now just leave it

// --> now code of animation of finding the path is here

var x,y;
for(var i=0;i<ans.length;i++)
{   
    y=Math.floor((ans[i]-1)/(width-1));
    x=(ans[i]-1)%(width-1);
    ctx.fillStyle ="blue";
    ctx.rect(x*uniter+1,y*uniter+1,uniter-1,uniter-1);
    ctx.fill();
}
// for this we have an obj name counter
// we have to see that which counter no. whose is closest to end with by getting to know about which row it belongs and draw with that with 
// its respective index


// todo work now use the rowWinner and make the animation

async function pathFinderAnimation(){
    ctx.beginPath();
    y=Math.floor((starts-1)/(width-1));
    x=(starts-1)%(width-1);
    ctx.fillStyle ="rgba(255, 255, 204, 1)";
    ctx.rect(x*uniter+1,y*uniter+1,uniter-1,uniter-1);
    ctx.fill();
    for(const [key , value] of Object.entries(counter))
    {
        /* we will have two key phase the current the past and the past-past
            1. we will make the 1 key's value whiter depend on whose is closest to end by row
            2. as next transion come 2 key come and 1 step is followed but 1 key's value have to be handel and we make it fade.
            NOW lets start!!!
        */
        // for now we will make the white and rest will be black of uniter-1 FOR NOW OK!!
        if(key>3)
        {
            for(var i=0;i<counter[key-3].length;i++)
            {
                ctx.beginPath();
                y=Math.floor((counter[key-3][i]-1)/(width-1));
                x=(counter[key-3][i]-1)%(width-1);
                ctx.fillStyle ="#222222";
                ctx.rect(x*uniter+1,y*uniter+1,uniter-1,uniter-1);
                ctx.fill();
            }   
        }
        if(key>2)
        {

            for(var i=0;i<counter[key-2].length;i++)
            {
                ctx.beginPath();
                y=Math.floor((counter[key-2][i]-1)/(width-1));
                x=(counter[key-2][i]-1)%(width-1);
                ctx.fillStyle ="#222222";
                ctx.rect(x*uniter+1,y*uniter+1,uniter-1,uniter-1);
                ctx.fill();
            }   
            for(var i=0;i<counter[key-2].length;i++)
            {
                ctx.beginPath();
                y=Math.floor((counter[key-2][i]-1)/(width-1));
                x=(counter[key-2][i]-1)%(width-1);
                ctx.fillStyle ="rgba(255, 255, 204, .3)";
                ctx.rect(x*uniter+1,y*uniter+1,uniter-1,uniter-1);
                ctx.fill();
            }   
        }
        if(key>1)
        {
            for(var i=0;i<counter[key-1].length;i++)
            {
                ctx.beginPath();
                y=Math.floor((counter[key-1][i]-1)/(width-1));
                x=(counter[key-1][i]-1)%(width-1);
                ctx.fillStyle ="#222222";
                ctx.rect(x*uniter+1,y*uniter+1,uniter-1,uniter-1);
                ctx.fill();
            }   
            for(var i=0;i<counter[key-1].length;i++)
            {
                ctx.beginPath();
                y=Math.floor((counter[key-1][i]-1)/(width-1));
                x=(counter[key-1][i]-1)%(width-1);
                ctx.fillStyle ="rgba(255, 255, 204, .8)";
                ctx.rect(x*uniter+1,y*uniter+1,uniter-1,uniter-1);
                ctx.fill();
            }
        }
        for(var i=0;i<value.length;i++)
        {
            ctx.beginPath();
            y=Math.floor((value[i]-1)/(width-1));
            x=(value[i]-1)%(width-1);
            ctx.fillStyle ="rgba(255, 255, 204, .5)";
            ctx.rect(x*uniter+1,y*uniter+1,uniter-1,uniter-1);
            ctx.fill();
        }
        await sleep(100);
        
        if(key>2){
            for(var i=0;i<counter[key-2].length;i++)
            {
                ctx.beginPath();
                y=Math.floor((counter[key-2][i]-1)/(width-1));
                x=(counter[key-2][i]-1)%(width-1);
                ctx.fillStyle ="#222222";
                ctx.rect(x*uniter+1,y*uniter+1,uniter-1,uniter-1);
                ctx.fill();
            } 
        }

        if(key>1)
        {
            for(var i=0;i<counter[key-1].length;i++)
            {
                ctx.beginPath();
                y=Math.floor((counter[key-1][i]-1)/(width-1));
                x=(counter[key-1][i]-1)%(width-1);
                ctx.fillStyle ="#222222";
                ctx.rect(x*uniter+1,y*uniter+1,uniter-1,uniter-1);
                ctx.fill();
            }   
            for(var i=0;i<counter[key-1].length;i++)
            {
                ctx.beginPath();
                y=Math.floor((counter[key-1][i]-1)/(width-1));
                x=(counter[key-1][i]-1)%(width-1);
                ctx.fillStyle ="rgba(255, 255, 204, .5)";
                ctx.rect(x*uniter+1,y*uniter+1,uniter-1,uniter-1);
                ctx.fill();
            }
        }
        
        for(var i=0;i<value.length;i++)
        {
            ctx.beginPath();
            y=Math.floor((value[i]-1)/(width-1));
            x=(value[i]-1)%(width-1);
            ctx.fillStyle ="#222222";
            ctx.rect(x*uniter+1,y*uniter+1,uniter-1,uniter-1);
            ctx.fill();
        } 
        for(var i=0;i<value.length;i++)
        {
            ctx.beginPath();
            y=Math.floor((value[i]-1)/(width-1));
            x=(value[i]-1)%(width-1);
            ctx.fillStyle ="rgba(255, 255, 204, .8)";
            ctx.rect(x*uniter+1,y*uniter+1,uniter-1,uniter-1);
            ctx.fill();
        } 
        await sleep(100);
    }
    for(var i=0;i<counter[Object.keys(counter)[Object.keys(counter).length-2]].length;i++){
        var temp = counter[Object.keys(counter)[Object.keys(counter).length-2]][i];
        ctx.beginPath();
        y=Math.floor((temp-1)/(width-1));
        x=(temp-1)%(width-1);
        ctx.fillStyle ="#222222";
        ctx.rect(x*uniter+1,y*uniter+1,uniter-1,uniter-1);
        ctx.fill();
    }
    await sleep(100);
    for(var i=0;i<counter[Object.keys(counter)[Object.keys(counter).length-1]].length;i++){
        var temp = counter[Object.keys(counter)[Object.keys(counter).length-1]][i];
        ctx.beginPath();
        y=Math.floor((temp-1)/(width-1));
        x=(temp-1)%(width-1);
        ctx.fillStyle ="#222222";
        ctx.rect(x*uniter+1,y*uniter+1,uniter-1,uniter-1);
        ctx.fill();
    }
    await sleep(100);
}
// now i have to make the animation to feel the user who is more likely to winning or who is winning at a point of the maze
// for that i will take care which count is how much far from the wining point;
// one last part and this project main skeleton will be done and rest will be just improvements;
// and this things has to done in pathFinderAnimation function that is above this commment;
// the main idea is that i'll make an array/obj() who with the use of counter obj will just add the array who is winning in the 
// whole count part and reach nearest to the end and just make every other one, one more no. of dark then other, as if it is 
// away from the more then 10 tiles from the winning tile then just make that every child and him as black.


// it make the the trancepency level for the blinking effect
function ocupant(trancepency)
{
    switch (trancepency)
    {
        case 0:
            ctx.fillStyle ="rgba(255, 255, 204, 1)";
            break;
        case 1:
            ctx.fillStyle ="rgba(255, 255, 204, 0.95)";
            break;
        case 2:
            ctx.fillStyle ="rgba(255, 255, 204, 0.85)";
            break;
        case 3:
            ctx.fillStyle ="rgba(255, 255, 204, 0.4)";
            break;
        case 4:
            ctx.fillStyle ="rgba(255, 255, 204, 0.2)";
            break;
        case 5:
            ctx.fillStyle ="rgba(255, 255, 204, 0.0)";
            break;
    }
}
// this is needed as the canvas is just putting over the previous and to get the effect we want to make it black the blinking effect
function black_back(x1,y1)
{
    ctx.beginPath();
    ctx.fillStyle="black";
    ctx.rect(x1*uniter,y1*uniter,uniter,uniter);
    ctx.fill();
}
// the path tha find by bfs
async function path(trancepency,flag){
    var place = end;
    var x1,y1;
    y1=Math.floor((end-1)/(width-1));
    x1=(end-1)%(width-1);
    if(flag == false)
        black_back(x1,y1);
    ctx.beginPath();
    ocupant(trancepency);
    ctx.rect(x1*uniter,y1*uniter,uniter,uniter);
    ctx.fill();
    // ctx.beginPath();
    while(pre[place]!=null)
    {
        y1=Math.floor((pre[place]-1)/(width-1));
        x1=(pre[place]-1)%(width-1);
        // console.log(place+" "+x1+" "+y1);
        if(flag == false){
            black_back(x1,y1);
        }
        if(flag == true){
            await sleep(32);
        }
        ctx.beginPath();
        ocupant(trancepency);
        ctx.rect(x1*uniter,y1*uniter,uniter,uniter);
        ctx.fill();
        place = pre[place];
    }
}
// this is the part which will make the blinking effect
async function animatedPath(){
    for(var i=0;i<6;i++){
        for(var j=0;j<3;j++){
            var a=i%2==0?j:2-j;
            path(a,false);
            await sleep(20);
        }
    }
}
//syncro wait for the functioins to  complete which are asycronside beacause we just want to run our program like that
async function animation(){
    await pathFinderAnimation();
    await path(0,true);
    animatedPath();        
}

animation();
// we are assuming that ans always exits and in real it is not possible for that we will reload or make all new maze and then make it on canvas if ans exits
// excepitions which are not handled yet 1 is if thereis not starting point 2 is if end point in not acheivable by any one
// error come in 2 case is temp is undefined and typeerror occurs
/*  0   1   2   3   4    |  1   2   3

    5   6   7   8   9    |  4   5   6

    10  11  12  13  14   |  7   8   9

    15  16  17  18  19   |

    21  22  23  24  25*/ // lets say i want to go at 23 what i will do is
    // first take the floor(node /width of the grid) if the rem is 0 then i 
    // is same and coloumn is last if rem is not zero then that point is the coloum place and 
    // row is +1 this will be useful in move 

    // and line to is the point were i have to make a line from the move
    // and lest take a example of 13 : if it want to join with 14 then
    // first we have the row 3 and coloum 3 (1 indexing) 
    // to make a line b/w 13 and 14 we will have the same row means 3 and +1 column
    // to make a line b/w 13 & 18 we will have the same coloum means 3 but we have row +1  

/*
var c = document.getElementById("myCanvas");
c.width = width*17;
c.height = height*17;
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.moveTo(20, 20);
ctx.lineTo(20, 100);
ctx.lineTo(80, 100);
ctx.lineTo(80,20);
ctx.moveTo(20,117);
ctx.lineTo(80,117);
ctx.lineWidth = 2;
ctx.strokeStyle = "white";
ctx.stroke();
*/
//for box on top
/*
ctx.beginPath();
ctx.lineWidth = "5";
ctx.strokeStyle = "blue";
ctx.fillStyle ="blue";
// ctx.fill();
fillRect(width*uniter/2-uniter, 0, uniter, uniter);
ctx.ctx.stroke();*/


// first algorithm bfs


// animate it.