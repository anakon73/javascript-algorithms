function NanoNeuron(w: number, b: number) {
  this.w = w;
  this.b = b;
  this.predict = (x: number) => {
    return x * this.w + this.b;
  }
}

function celsiusToFahrenheit(c: number): number {
  const w = 1.8;
  const b = 32;
  const f = c * w + b;
  return f;
};

function generateDataSets() {
  const xTrain: number[] = [];
  const yTrain: number[] = [];
  for (let x = 0; x < 100; x += 1) {
    const y = celsiusToFahrenheit(x);
    xTrain.push(x);
    yTrain.push(y);
  }

  const xTest: number[] = [];
  const yTest: number[] = [];
  for (let x = 0.5; x < 100; x += 1) {
    const y = celsiusToFahrenheit(x);
    xTest.push(x);
    yTest.push(y);
  }

  return [xTrain, yTrain, xTest, yTest];
}

function predictionCost(y: number, prediction: number): number {
  return (y - prediction) ** 2 / 2;
}

function forwardPropagation(model: any, xTrain: number[], yTrain: number[]): [number[], number] {
  const m = xTrain.length;
  const predictions: number[] = [];
  let cost = 0;
  for (let i = 0; i < m; i += 1) {
    const prediction = nanoNeuron.predict(xTrain[i]);
    cost += predictionCost(yTrain[i], prediction);
    predictions.push(prediction);
  }
  cost /= m;
  return [predictions, cost];
}

function backwardPropagation(predictions, xTrain: number[], yTrain: number[]): [number, number] {
  const m = xTrain.length;
  let dW = 0;
  let dB = 0;
  for (let i = 0; i < m; i += 1) {
    dW += (yTrain[i] - predictions[i]) * xTrain[i];
    dB += yTrain[i] - predictions[i];
  }
  dW /= m;
  dB /= m;
  return [dW, dB];
}

function trainModel({ model, epochs, alpha, xTrain, yTrain }) {
  const costHistory: number[] = [];

  for (let epoch = 0; epoch < epochs; epoch += 1) {
    const [predictions, cost] = forwardPropagation(model, xTrain, yTrain);
    costHistory.push(cost);

    const [dW, dB] = backwardPropagation(predictions, xTrain, yTrain);

    nanoNeuron.w += alpha * dW;
    nanoNeuron.b += alpha * dB;
  }

  return costHistory;
}

const w = Math.random();
const b = Math.random();
const nanoNeuron = new NanoNeuron(w, b);

const [xTrain, yTrain, xTest, yTest] = generateDataSets();

const epochs = 70000;
const alpha = 0.0005;
const trainingCostHistory = trainModel({ model: nanoNeuron, epochs, alpha, xTrain, yTrain });

console.log('Cost before the training:', trainingCostHistory[0]);
console.log('Cost after the training:', trainingCostHistory[epochs - 1]);

console.log('NanoNeuron parameters:', { w: nanoNeuron.w, b: nanoNeuron.b });

const [testPredictions, testCost] = forwardPropagation(nanoNeuron, xTest, yTest);
console.log('Cost on new testing data:', testCost);

const tempInCelsius = 70;
const customPrediction = nanoNeuron.predict(tempInCelsius);
console.log(`NanoNeuron "thinks" that ${tempInCelsius}°C in Fahrenheit is:`, customPrediction);
console.log('Correct answer is:', celsiusToFahrenheit(tempInCelsius)); 
