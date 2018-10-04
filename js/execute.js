function generateCircuit(){
    circuit.init(ctx);
    circuit.drawOpamp(ctx, 39, 24);
    circuit.drawGridX(ctx);
    circuit.drawGridY(ctx);
    circuit.evaluateInput(localStorage.getItem("query"));
    circuit.drawFeedback(ctx);
    circuit.drawPositive(ctx);
    circuit.drawNegative(ctx);
}

// document.body.appendChild(canvas);