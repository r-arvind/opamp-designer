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

function circle(ctx,cent_x,cent_y){
    ctx.arc(cent_x*circuit.grid_x,cent_y*circuit.grid_y,1.5*circuit.grid_y,0,2*Math.PI);
    nodes["current"] = {x:cent_x,y:cent_y};
}