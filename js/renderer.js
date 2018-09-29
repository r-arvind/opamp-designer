var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var circuit = {

    grid_x : window.innerWidth/64,
    grid_y : window.innerHeight/48,
    posTerms : [],
    negTerms : [],
    z : -1,
    rf:100,
    init: function(ctx){
        ctx.strokeStyle = "black";
        ctx.font = "20px Arial";
    },

    drawGridX : function(ctx){
        ctx.strokeStyle = "rgba(0,0,0,0.15)";
        ctx.beginPath();
        for(i=1;i<=64;i++){
            moveTo(ctx,i,0);
            lineTo(ctx,i,48);
        }
        ctx.closePath();
        ctx.stroke();
    },

    drawGridY : function(ctx){
        ctx.strokeStyle = "rgba(0,0,0,0.15)";
        ctx.beginPath();
        for(i=1;i<=48;i++){
            moveTo(ctx,0,i);
            lineTo(ctx,64,i);
        }
        ctx.closePath();
        ctx.stroke();  
    },

    drawOpamp : function(ctx,x,y){
        ctx.beginPath();
        moveTo(ctx,x,y);
        lineTo(ctx, x, y-4);
        lineTo(ctx, x+4, y);
        lineTo(ctx, x, y+4);
        ctx.closePath();
        ctx.stroke();
        nodes["Vout"] = {x: x+4,y: y};
        nodes["Vplus"] = {x: x,y: y+2};
        nodes["Vminus"] = {x: x,y: y-2};
    },

    extendRight: function(ctx,node,length){
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;
        moveTo(ctx,node.x,node.y);
        // console.log(node);
        lineTo(ctx,node.x + length,node.y);
        ctx.closePath();
        ctx.stroke();
        // fillRect(ctx,node.x,node.y,5,5);
    },
    extendLeft: function(ctx,node,length){
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;
        moveTo(ctx,node.x,node.y);
        console.log(node);
        lineTo(ctx,node.x - length,node.y);
        ctx.closePath();
        ctx.stroke();
    },
    extendUp: function(ctx,node,length){
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;
        moveTo(ctx,node.x,node.y);
        console.log(node);
        lineTo(ctx,node.x,node.y - length);
        ctx.closePath();
        ctx.stroke();
    },
    extendDown: function(ctx,node,length){
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;
        moveTo(ctx,node.x,node.y);
        console.log(node);
        lineTo(ctx,node.x,node.y + length);
        ctx.closePath();
        ctx.stroke();
    },
    markNode : function(ctx,node,name){
        fillRect(ctx,node.x,node.y,5,5);
        nodes[name] = node;
    },
    resistorRight: function(ctx,node,name,value){
        ctx.lineWidth = 3;
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        moveTo(ctx,node.x,node.y);
        ctx.font = "bold 13.5px Arial";
        fillText(ctx,`${name} = ${value} K\u{2126}`,node.x+0.5,node.y-1.5);
        for(var i=0;i<3;i++){
            lineTo(ctx,nodes.current.x+0.25,nodes.current.y-1);
            moveTo(ctx,nodes.current.x,nodes.current.y);
            lineTo(ctx,nodes.current.x+0.25,nodes.current.y+1);
            moveTo(ctx,nodes.current.x,nodes.current.y);
            lineTo(ctx,nodes.current.x+0.25,nodes.current.y+1);
            moveTo(ctx,nodes.current.x,nodes.current.y);
            lineTo(ctx,nodes.current.x+0.25,nodes.current.y-1);
            moveTo(ctx,nodes.current.x,nodes.current.y);
        }
        ctx.closePath();
        ctx.stroke();
    },
    resistorLeft: function(ctx,node,name,value){
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        moveTo(ctx,node.x,node.y);
        ctx.font = "bold 13.5px Arial";
        fillText(ctx,`${name} = ${value} K\u{2126}`,node.x,node.y-0.2);
        for(var i=0;i<3;i++){
            lineTo(ctx,nodes.current.x-0.25,nodes.current.y+1);
            moveTo(ctx,nodes.current.x,nodes.current.y);
            lineTo(ctx,nodes.current.x-0.25,nodes.current.y-1);
            moveTo(ctx,nodes.current.x,nodes.current.y);
            lineTo(ctx,nodes.current.x-0.25,nodes.current.y-1);
            moveTo(ctx,nodes.current.x,nodes.current.y);
            lineTo(ctx,nodes.current.x-0.25,nodes.current.y+1);
            moveTo(ctx,nodes.current.x,nodes.current.y);
        }
        ctx.closePath();
        ctx.stroke();
    },

    drawFeedback: function(ctx){
        this.extendLeft(ctx,nodes.Vminus,4);
        this.extendUp(ctx,nodes.current,6);
        this.extendRight(ctx,nodes.current,5);
        this.resistorRight(ctx,nodes.current,"Rf",this.rf);
        this.extendRight(ctx,nodes.current,4);
        this.extendDown(ctx,nodes.current,8);
        this.markNode(ctx,nodes.current,"V1");
        this.extendRight(ctx,nodes.Vout,7);
        this.markNode(ctx,nodes.current,"V2");
        this.extendLeft(ctx,nodes.Vminus,8);
        this.markNode(ctx,nodes.current,"nodeNegative");
        this.extendLeft(ctx,nodes.Vplus,4);
        if(this.z < 0) {
            this.markNode(ctx,nodes.current,"nodeX");
        }
        this.extendLeft(ctx,nodes.current,4);
        this.markNode(ctx,nodes.current,"nodePositive");

    },

    evaluateInput : function(string){
        var arr = string.split(" ");
        var terms = arr.length;
        for(var i=0;i<terms;i++){
            var int = parseInt(arr[i]);
            var obj = {value:int,index:i+1};
            this.z = this.z + int;
            if(int > 0) this.posTerms.push(obj);
            if(int < 0) this.negTerms.push(obj);
        }      
    },
    drawPositive : function(ctx){
        for(var i=0;i<this.posTerms.length;i++){
            this.extendUp(ctx,nodes.nodeNegative,i*4);
            this.extendLeft(ctx,nodes.current,5);
            var resValue = (this.rf/this.posTerms[i].value).toFixed(2);
            this.resistorLeft(ctx,nodes.current,`R${this.posTerms[i].index}`,resValue);
            this.extendLeft(ctx,nodes.current,5);
        }

        if(this.z < 0){
            this.extendRight(ctx,nodes.nodeNegative,2);
            this.extendUp(ctx,nodes.current,11);
            this.extendRight(ctx,nodes.current,1);
            var resValue = (this.rf/this.z).toFixed(2);
            this.resistorRight(ctx,nodes.current,"Rx",resValue);
            this.extendRight(ctx,nodes.current,1);
        }
    },

    drawNegative : function(ctx){
        for(var i=0;i<this.negTerms.length;i++){
            this.extendDown(ctx,nodes.nodePositive,i*4);
            this.extendLeft(ctx,nodes.current,5);
            var resValue = (this.rf/this.negTerms[i].value).toFixed(2);
            this.resistorLeft(ctx,nodes.current,`R${this.negTerms[i].index}`,resValue);
            this.extendLeft(ctx,nodes.current,5);
        }

        if(this.z > 0){
            this.extendRight(ctx,nodes.nodePositive,4);
            this.extendDown(ctx,nodes.current,11);
            this.extendRight(ctx,nodes.current,1);
            var resValue = (this.rf/this.z).toFixed(2);
            this.resistorRight(ctx,nodes.current,"Rx",resValue);
            this.extendRight(ctx,nodes.current,1);
        }
    }
}

var nodes = {};


