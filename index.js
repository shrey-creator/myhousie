const express =require('express');
const app =express();
var path = require('path');
const socket=require('socket.io');

                                                // Routes
app.use(express.static(__dirname+'/public'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/views/index.html'));
});
app.get('/room', function(req, res) {
    res.sendFile(path.join(__dirname+'/views/room.html'));
});
app.get('/board', function(req, res) {
    res.sendFile(path.join(__dirname+'/views/board.html'));
});
app.get('/slip', function(req, res) {
    res.sendFile(path.join(__dirname+'/views/slip.html'));
});

app.get('/sitemap', function(req, res){
    res.contentType('application/xml');
    res.sendFile(path.join(__dirname , 'sitemap.xml'));
});



                                    // passing numbers logic

var roomCount=new Map();            //stores number of users in each room
var room_numbers={};                //stores object of key(room names) and value(array of passed numbers) 
let roomNames=[];                   //stores room Names which is passed to the client to check if room already exists

app.get('/checkRoom', function(req, res) {
    console.log(roomNames);
    res.send(roomNames);
});
var server=app.listen((process.env.PORT || 5000),()=>{console.log("app started on localhost 5000")});
var io=socket(server);


io.on('connection',(socket)=>{  
    var currentRoom;
   console.log('user connected ');

    //  evokes when a new user join the room
    socket.on('join',({room,type})=>{
        // check if room already exists
       
        if(!(room in room_numbers))
        {
        roomNames.push(room);
        }

        // creating key value of object if key does not exists
        room_numbers[room] = room_numbers[room] || [];
        passedNumber=room_numbers[room];

        //set room Count
        if(!(roomCount.get(room)))
        {
            roomCount.set(room,1);
        }
        else{
            np=roomCount.get(room);
            roomCount.set(room,np+1);
        }
        
        currentRoom=room;
        socket.join(room);
       socket.emit('join',passedNumber);

    });

    
    //listening to numbers from client and emitting to all other clients
    socket.on('number',(data)=>{    
        room_numbers[data.room].push(data.ran);
        io.to(data.room).emit('number',data);
    });


    //listening to chat messages from client and emitting to all other clients
    socket.on('chat', function(data){
        io.to(data.roomna).emit('chat', data);
    });


    //evokes when a user get disconnected
    socket.on('disconnect', () => {
         usersLeft=roomCount.get(currentRoom);
         console.log(usersLeft);
         //check if this is the last user in the room
         if(usersLeft-1==0)
         {
    
            for( var i = 0; i < roomNames.length; i++){ 
                                           
                if ( roomNames[i] === currentRoom) { 
                    roomNames.splice(i, 1); 
                    break;
                    i--; 
                }
            }
             //if its the last user delete entry from roomCount  and room_numbers
             roomCount.delete(currentRoom);
             delete room_numbers[currentRoom]
             
         }
         else{
             roomCount.set(currentRoom,usersLeft-1);
         }
         console.log('user disconnected');

      });
    

})


//TODO delete roomNames who are not present