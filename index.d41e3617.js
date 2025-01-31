!function(){function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function e(e,r){if(e){if("string"==typeof e)return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return t(e,r)}}var r=new(function(){var r;function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];!function(t,e){if(!(t instanceof e))throw TypeError("Cannot call a class as a function")}(this,n),this.score=0,this.board=t,this.status="idle"}return r=[{key:"start",value:function(){this.status="playing",this.addRandomTile(),this.addRandomTile()}},{key:"restart",value:function(){this.board=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],this.score=0,this.status="idle",this.start()}},{key:"getScore",value:function(){return this.score}},{key:"getState",value:function(){return this.board}},{key:"getStatus",value:function(){return this.status}},{key:"addRandomTile",value:function(){for(var t=[],r=0;r<this.board.length;r++)for(var n=0;n<this.board[r].length;n++)0===this.board[r][n]&&t.push([r,n]);if(t.length>0){var o,a=function(t){if(Array.isArray(t))return t}(o=t[Math.floor(Math.random()*t.length)])||function(t,e){var r,n,o=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=o){var a=[],i=!0,s=!1;try{for(o=o.call(t);!(i=(r=o.next()).done)&&(a.push(r.value),2!==a.length);i=!0);}catch(t){s=!0,n=t}finally{try{i||null==o.return||o.return()}finally{if(s)throw n}}return a}}(o,2)||e(o,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),i=a[0],s=a[1];this.board[i][s]=.9>Math.random()?2:4}}},{key:"moveLeft",value:function(){for(var t=!1,e=0;e<this.board.length;e++){var r=this.slideAndMerge(this.board[e]);r.toString()!==this.board[e].toString()&&(t=!0,this.board[e]=r)}return t&&this.addRandomTile(),t}},{key:"moveRight",value:function(){for(var r=!1,n=0;n<this.board.length;n++){var o,a=((function(e){if(Array.isArray(e))return t(e)})(o=this.board[n])||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(o)||e(o)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).reverse(),i=this.slideAndMerge(a).reverse();i.toString()!==this.board[n].toString()&&(r=!0,this.board[n]=i)}return r&&this.addRandomTile(),r}},{key:"moveUp",value:function(){for(var t=!1,e=0;e<4;e++)for(var r=[this.board[0][e],this.board[1][e],this.board[2][e],this.board[3][e]],n=this.slideAndMerge(r),o=0;o<4;o++)this.board[o][e]!==n[o]&&(t=!0,this.board[o][e]=n[o]);return t&&this.addRandomTile(),t}},{key:"moveDown",value:function(){for(var t=!1,e=0;e<4;e++)for(var r=[this.board[0][e],this.board[1][e],this.board[2][e],this.board[3][e]].reverse(),n=this.slideAndMerge(r).reverse(),o=0;o<4;o++)this.board[o][e]!==n[o]&&(t=!0,this.board[o][e]=n[o]);return t&&this.addRandomTile(),t}},{key:"slideAndMerge",value:function(t){for(var e=t.filter(function(t){return 0!==t}),r=0;r<e.length-1;r++)e[r]===e[r+1]&&(e[r]*=2,this.score+=e[r],e[r+1]=0);var n=e.filter(function(t){return 0!==t}),o=Array(4-n.length).fill(0);return n.concat(o)}},{key:"checkGameOver",value:function(){for(var t=0;t<4;t++)for(var e=0;e<4;e++)if(0===this.board[t][e]||e<3&&this.board[t][e]===this.board[t][e+1]||t<3&&this.board[t][e]===this.board[t+1][e])return!1;return this.status="lose",!0}},{key:"checkWinCondition",value:function(){for(var t=0;t<4;t++)for(var e=0;e<4;e++)if(2048===this.board[t][e])return this.status="win",!0;return!1}}],function(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}(n.prototype,r),n}()),n=document.querySelector(".game-field"),o=document.querySelector(".game-score"),a=document.querySelector(".start"),i=document.querySelector(".message-container"),s=0,u=0,c=0,l=0;function d(){h(),r.checkWinCondition()?f("\uD83C\uDF89 You win! Congrats!","win"):r.checkGameOver()&&f("\uD83D\uDC80 Game Over! Restart the game?","lose")}function h(){var t=r.getState(),e=n.querySelectorAll(".field-row");t.forEach(function(t,r){var n=e[r].querySelectorAll(".field-cell");t.forEach(function(t,e){var r=n[e];r.textContent=0!==t?t:"",r.className="field-cell",0!==t&&r.classList.add("field-cell--".concat(t))})}),o.textContent=r.getScore()}function f(t,e){i.querySelectorAll(".message").forEach(function(t){return t.classList.add("hidden")});var r=i.querySelector(".message-".concat(e));r.textContent=t,r.classList.remove("hidden")}document.addEventListener("touchstart",function(t){s=t.touches[0].clientX,u=t.touches[0].clientY}),document.addEventListener("touchmove",function(t){c=t.touches[0].clientX,l=t.touches[0].clientY}),document.addEventListener("touchend",function(){var t,e;Math.abs(t=c-s)>Math.abs(e=l-u)?t>0?r.moveRight():r.moveLeft():e>0?r.moveDown():r.moveUp(),d()}),a.addEventListener("click",function(){r.restart(),h(),f("Game started! Good luck!","start"),"Start"===a.textContent&&(a.textContent="Restart",a.classList.add("restart"),a.classList.remove("start"))}),document.addEventListener("keydown",function(t){var e=!1;switch(t.key){case"ArrowLeft":e=r.moveLeft();break;case"ArrowRight":e=r.moveRight();break;case"ArrowUp":e=r.moveUp();break;case"ArrowDown":e=r.moveDown()}e&&d()})}();
//# sourceMappingURL=index.d41e3617.js.map
