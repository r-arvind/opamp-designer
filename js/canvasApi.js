function lineTo(ctx,x,y){
    ctx.lineTo(circuit.grid_x*x,circuit.grid_y*y);
    nodes["current"] = {x:x,y:y};
}

function moveTo(ctx,x,y){
    ctx.moveTo(circuit.grid_x*x,circuit.grid_y*y);
    nodes["current"] = {x:x,y:y};
}

function fillRect(ctx,x,y,width,height){
    ctx.fillRect(circuit.grid_x*x -width/2,circuit.grid_y*y-height/2,width,height);
}

function fillText(ctx,name,x,y){
    ctx.fillText(name,circuit.grid_x*x,circuit.grid_y*y);
}