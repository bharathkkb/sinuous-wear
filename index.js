/**
 * Original version http://hakim.se/experiments/html5/sinuous/01/
 * Ported to Android Wear - Bharath KKB
 */
  var highscore=0;
SinuousWorld = new function(){
  
   
  
  var SCREEN_WIDTH = window.innerWidth;
  var SCREEN_HEIGHT = window.innerHeight;
  var highscore=0;
  var canvas;
  var context;
begin=false;
  var flag=0;
  var status;
  var message;
  var title;
  var startButton;
 
  var enemies = [];
  var boosts = [];
  var particles = [];
  var player;
  
  var mouseX = (window.innerWidth - SCREEN_WIDTH);
  var mouseY = (window.innerHeight - SCREEN_HEIGHT);
  var mouseIsDown = false;
  
  var playing = false;
  var score = 0;
  var time = 0;
  
  var velocity = { x: -1.3, y: 1 };
  var difficulty = 1;

 /*canvas2 = document.getElementById('top');
 ctx = canvas2.getContext('2d');
if(!playing)
{ var imageObj = new Image();

 

      imageObj.onload = function() {

        context.drawImage(imageObj, 69, 50);

      };

      imageObj.src = 't.png';
}
  */
  this.init = function(){
  
    canvas = document.getElementById('world');

   

    startButton = document.getElementById('world');
    
    if (canvas && canvas.getContext) {
      context = canvas.getContext('2d');
     

      // Register event listeners
      document.addEventListener('mousemove', documentMouseMoveHandler);
      document.addEventListener('mousedown', documentMouseDownHandler);
      document.addEventListener('mouseup', documentMouseUpHandler);
      canvas.addEventListener('touchstart', documentTouchStartHandler);
      document.addEventListener('touchmove', documentTouchMoveHandler);
      document.addEventListener('touchend', documentTouchEndHandler);
      window.addEventListener('resize', windowResizeHandler);
      startButton.addEventListener('click', startButtonClickHandler);
      


      player = new Player();
      
      windowResizeHandler();
      setInterval(loop, 1000/60);
      

    }
  };
  
  function startButtonClickHandler(event){
    event.preventDefault();
    


    if( playing == false ) {
      playing = true;

if(score>highscore)
{
highscore=score;
}
      enemies = [];
      boosts = [];
      score = 0;
      difficulty = 0.5;
      
      player.trail = [];
      player.position.x = mouseX;
      player.position.y = mouseY;
      player.boost = 0;
      
  
     
      
      time = new Date().getTime();
    }
  }

function txt() {
if(!playing && score==0)
{canvas2 = document.getElementById('top');
context2 = canvas.getContext('2d');
context2.textAlign = 'center';
context2.fillStyle = "#f00";
context2.font = '39px bit';
context2.fillText('START GAME', 170, 120);
context2.font = '30px bit';
context2.fillText('Touch to start!', 160, 200);
}

if(playing)
{
 canvas2 = document.getElementById('top');
context2 = canvas.getContext('2d');
context2.textAlign = 'start';
context2.fillStyle = "#f00";
context2.font = '20px bit';
context2.textBaseline = 'bottom';
context2.textAlign = 'center';
context2.fillText('Score: '+Math.round( score ), 160, 280);
}
if(!playing && score>0)
{
 canvas2 = document.getElementById('top');
context2 = canvas.getContext('2d');
context2.textAlign = 'center';
context2.fillStyle = "#f00";
if(score>highscore)
{
context2.textAlign = 'center';
context2.font = '41px bit';
context2.fillText('GAME OVER!', 160, 120);
context2.font = '30px bit';
context2.fillText('New Highscore!!', 160, 200);
context2.font = '40px bit';
context2.fillText(Math.round( score )+ '!',160, 230);

}
else
{
context2.textAlign = 'center';
context2.font = '45px bit';
context2.fillText('GAME OVER', 160, 120);
context2.font = '30px bit';
context2.fillText('Your Score is:', 160, 200);
context2.font = '40px bit';
context2.fillText(Math.round( score )+ '',160, 230);
}
}

}
  
  function gameOver() {

    playing = false;
over();

  }
function pausecomp(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
} 
  
  function documentMouseMoveHandler(event){
    mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * .5 - 10;
    mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * .5 - 10;
  }
  
  function documentMouseDownHandler(event){
    mouseIsDown = true;
  }
  
  function documentMouseUpHandler(event) {
    mouseIsDown = false;
  }
  
  function documentTouchStartHandler(event) {
    if(event.touches.length == 1) {
      event.preventDefault();
      
      mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
      mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
      
      mouseIsDown = true;
    }
  }
  
  function documentTouchMoveHandler(event) {
    if(event.touches.length == 1) {
      event.preventDefault();

      mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
      mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
    }
  }
  
  function documentTouchEndHandler(event) {
    mouseIsDown = false;
  }
  
  function windowResizeHandler() {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    
    var cvx = (window.innerWidth - SCREEN_WIDTH) * .5;
    var cvy = (window.innerHeight - SCREEN_HEIGHT) * .5;
    
    canvas.style.position = 'absolute';
    canvas.style.left = cvx + 'px';
    canvas.style.top = cvy + 'px';
    
  
  }
  
  function createParticles( position, spread, color ) {
    var q = 10 + ( Math.random() * 15 );
    
    while( --q >= 0 ) {
      var p = new Particle();
      p.position.x = position.x + ( Math.sin(q) * spread );
      p.position.y = position.y + ( Math.cos(q) * spread );
      p.velocity = { x: -4 + Math.random() * 8, y: - 4 + Math.random() * 8 };
      p.alpha = 1;
      
      particles.push( p );
    }
  }


  function loop() {
  
    context.clearRect(0,0,canvas.width,canvas.height);



    txt();

  

    var svelocity = { x: velocity.x * difficulty, y: velocity.y * difficulty };
    
    var i, j, ilen, jlen;
    
    if( playing ) {
      difficulty += 0.0008;
      
      pp = player.clonePosition();
      
      player.position.x += ( mouseX - player.position.x ) * 0.13;
      player.position.y += ( mouseY - player.position.y ) * 0.13;
      
      score += 0.4 * difficulty;
      score += player.distanceTo( pp ) * 0.1;
      
      player.boost = Math.max( player.boost - 1, 0 );
      
      if( player.boost > 0 && ( player.boost > 100 || player.boost % 3 != 0 ) ) {
        context.beginPath();
        context.fillStyle = '#167a66';
        context.strokeStyle = '#00ffcc';
        context.arc(player.position.x, player.position.y, player.size*2, 0, Math.PI*2, true);
        context.fill();
        context.stroke();
      }
      
      player.trail.push( new Point( player.position.x, player.position.y ) );
      
      context.beginPath();
      context.strokeStyle = '#648d93';
      context.lineWidth = 2;
      
      for( i = 0, ilen = player.trail.length; i < ilen; i++ ) {
        p = player.trail[i];
        
        context.lineTo( p.position.x, p.position.y );
        
        p.position.x += svelocity.x;
        p.position.y += svelocity.y;
      }
      
      context.stroke();
      context.closePath();
      
      if( player.trail.length > 60 ) {
        player.trail.shift();
      }
      
      context.beginPath();
      context.fillStyle = '#8ff1ff';
      context.arc(player.position.x, player.position.y, player.size/2, 0, Math.PI*2, true);
      context.fill();
    }
    
    if( playing && ( player.position.x < 0 || player.position.x > SCREEN_WIDTH || player.position.y < 0 || player.position.y > SCREEN_HEIGHT ) ) {
      gameOver();
    }
    
    for( i = 0; i < enemies.length; i++ ) {
      p = enemies[i];
      
      if( playing ) {
        if( player.boost > 0 && p.distanceTo( player.position ) < ( ( player.size * 4 ) + p.size ) * 0.5 ) {
          createParticles( p.position, 10 );
          enemies.splice( i, 1 );
          i --;
          score += 10;
          continue;
        }
        else if( p.distanceTo( player.position ) < ( player.size + p.size ) * 0.5 ) {
          createParticles( player.position, 10 );
          gameOver();
        }
      }
      
      context.beginPath();
      context.fillStyle = '#ff0000';
      context.arc(p.position.x, p.position.y, p.size/2, 0, Math.PI*2, true);
      context.fill();
      
      p.position.x += svelocity.x * p.force;
      p.position.y += svelocity.y * p.force;
      
      if( p.position.x < 0 || p.position.y > SCREEN_HEIGHT ) {
        enemies.splice( i, 1 );
        i --;
      }
    }
    
    for( i = 0; i < boosts.length; i++ ) {
      p = boosts[i];
      
      if( p.distanceTo( player.position ) < ( player.size + p.size ) * 0.5 && playing ) {
        player.boost = 300;
        
        for( j = 0; j < enemies.length; j++ ) {
          e = enemies[j];
          
          if( e.distanceTo( p.position ) < 100 ) {
            createParticles( e.position, 10 );
            enemies.splice( j, 1 );
            j--;
            score += 10;
          }
        }
      }
      
      context.beginPath();
      context.fillStyle = '#00ffcc';
      context.arc(p.position.x, p.position.y, p.size/2, 0, Math.PI*2, true);
      context.fill();
      
      p.position.x += svelocity.x * p.force;
      p.position.y += svelocity.y * p.force;
      
      if( p.position.x < 0 || p.position.y > SCREEN_HEIGHT || player.boost != 0 ) {
        boosts.splice( i, 1 );
        i --;
      }
    }
    
    if( enemies.length < 25 * difficulty ) {
      enemies.push( positionNewOrganism( new Enemy() ) );
    }
    
    if( boosts.length < 1 && Math.random() > 0.997 && player.boost == 0 ) {
      boosts.push( positionNewOrganism( new Boost() ) );
    }
    
    for( i = 0; i < particles.length; i++ ) {
      p = particles[i];
      
      p.velocity.x += ( svelocity.x - p.velocity.x ) * 0.04;
      p.velocity.y += ( svelocity.y - p.velocity.y ) * 0.04;
      
      p.position.x += p.velocity.x;
      p.position.y += p.velocity.y;
      
      p.alpha -= 0.02;
      
      context.fillStyle = 'rgba(255,255,255,'+Math.max(p.alpha,0)+')';
      context.fillRect( p.position.x, p.position.y, 1, 1 );
      
      if( p.alpha <= 0 ) {
        particles.splice( i, 1 );
      }
    }
    
    if( playing ) {
      scoreText = 'Score: <span>' + Math.round( score ) + '</span>';
      scoreText += ' Time: <span>' + Math.round( ( ( new Date().getTime() - time ) / 1000 ) * 100 ) / 100 + 's</span>';
     
    }


  }

  
  function positionNewOrganism( p ) {
    if( Math.random() > 0.5 ) {
      p.position.x = Math.random() * SCREEN_WIDTH;
      p.position.y = -20;
    }
    else {
      p.position.x = SCREEN_WIDTH + 20;
      p.position.y = (-SCREEN_HEIGHT * 0.2) + ( Math.random() * SCREEN_HEIGHT * 1.2 );
    }
    
    return p;
  }
  
};

/**
 * 
 */
function Point( x, y ) {

  this.position = { x: x, y: y };
}
Point.prototype.distanceTo = function(p) {
  var dx = p.x-this.position.x;
  var dy = p.y-this.position.y;
  return Math.sqrt(dx*dx + dy*dy);
};
Point.prototype.clonePosition = function() {
  return { x: this.position.x, y: this.position.y };
};

/**
 * 
 */

function Player() {

  this.position = { x: 0, y: 0 };
  this.trail = [];
  this.size = 8;
  this.boost = 0;
}
Player.prototype = new Point();

/**
 * 
 */
function Enemy() {
  this.position = { x: 0, y: 0 };
  this.size = 8 + ( Math.random() * 4 );
  this.force = 1 + ( Math.random() * 0.4 );
}
Enemy.prototype = new Point();

/**
 * 
 */
function Boost() {
  this.position = { x: 0, y: 0 };
  this.size = 13 + ( Math.random() * 8 );
  this.force = 1 + ( Math.random() * 0.4 );
}
Boost.prototype = new Point();

/**
 * 
 */
function Particle() {

  this.position = { x: 0, y: 0 };
  this.force = 1 + ( Math.random() * 0.4 );
  this.color = '#ff0000';
}
Particle.prototype = new Point();



SinuousWorld.init();

