const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { 
  initGame, 
  getStacks, 
  getPlayerHands, 
  joinGame, 
  isPlayerReady, 
  getPlayersSelectedCard, 
  playerSelectCard, 
  getsortedSelectedCard, 
  shouldBuyStack 
} = require('./game');
const { ROOM_ID } = require('./const');

let sockets = {};
let readyStates = {};
let leaderId = '';

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  sockets = {
    ...sockets,
    [socket.id]: {
      socket: socket,
      name: ''
    }
  }

  socket.on("lobby:leave", () => {
    socket.disconnect();

    const disconnectedSocket = {...sockets[socket.id]};
    delete sockets[socket.id];
    delete readyStates[socket.id];

    boastcastUser();
    console.log(`User: ${disconnectedSocket.name} disconnected.`);
  });

  socket.on("lobby:join", (data) => {
    const { name } = JSON.parse(data);

    const isLeader = Object.keys(readyStates).length === 0;

    sockets[socket.id] = {
      ...sockets[socket.id],
      name: name
    };

    readyStates = {
      ...readyStates,
      [socket.id]: false
    }

    if (isLeader) {
      leaderId = socket.id;
    }

    socket.join(ROOM_ID);
    console.log(`User: ${socket.id} joined room - ${ROOM_ID}`);

    io.to(socket.id).emit('lobby:joined');

    boastcastUser();
    boastcastReadyState();
  });

  function boastcastUser() {
    const userList = Object.keys(sockets).filter((socketId) => sockets[socketId].name !== '').map((socketId) => ({
      id: socketId,
      name: sockets[socketId].name,
      isLeader: leaderId === socketId
    }));

    io.to(ROOM_ID).emit('lobby:user', JSON.stringify(userList));
  }

  function boastcastReadyState() {
    io.to(ROOM_ID).emit('lobby:user:ready', JSON.stringify(readyStates));
  }

  socket.on("lobby:ready", () => {
    readyStates[socket.id] = true;
    
    boastcastReadyState();
  })

  socket.on("lobby:unready", () => {
    readyStates[socket.id] = false;
    
    boastcastReadyState();
  })

  socket.on("lobby:start", () => {
    const playerIds = Object.keys(readyStates);

    initGame(playerIds);
    io.to(ROOM_ID).emit('game:start');
  });

  socket.on('game:ready', () => {
    joinGame(socket.id);

    if (isPlayerReady()) {
      let countdown = 5;
      const handler = setInterval(() => {
        io.to(ROOM_ID).emit('game:start:countdown', `${countdown}`);
        countdown--;

        if (countdown < 0) {
          clearInterval(handler);
        }
      }, 1000);
    }
  })

  socket.on('game:stacks:get', () => {
    const stacks = getStacks();

    io.to(socket.id).emit('game:stacks', stacks);
  });

  socket.on('game:hands:get', () => {
    const hands = getPlayerHands(socket.id);

    io.to(socket.id).emit('game:hands', hands);
  })

  socket.on('game:confirm', (message) => {
    const card = JSON.parse(message);
    const allDone = playerSelectCard(socket.id, card);
    
    const selectedCards = getPlayersSelectedCard();
    io.to(ROOM_ID).emit('game:player:picked', JSON.stringify(Object.keys(selectedCards)));

    console.log('allDone', allDone);
    if (allDone) {
      updatePlayerInfo();
      calculateStackResult();
    }
  })

  const updatePlayerInfo = () => {
    // io.to(socket.id).emit('game:stacks', stacks);
    // io.to(socket.id).emit('game:hands', hands);
    
    console.log('updatePlayerInfo');
    const selectedCards = getPlayersSelectedCard();
    io.to(ROOM_ID).emit('game:player:pick:result', JSON.stringify(selectedCards));
  }

  const calculateStackResult = () => {
    let actionResults = [];
    
    const sortedCard = getsortedSelectedCard();
    if (shouldBuyStack(sortedCard)) {
      // 
    }
  }

  socket.on("disconnect", () => {
    const socketId = socket.id;
    delete sockets[socketId];
    delete readyStates[socket.id];

    boastcastUser();
    console.log("A user disconnected:", socketId);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});