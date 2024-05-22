const table = document.querySelector('.table');
const data = {};
const timelineDiv = document.querySelector('.timeline');

const headerRow = document.createElement('tr');
["Process ID", "Arrival Time", "Service Time"].forEach((header) => {
  const th = document.createElement('th');
  th.innerText = header;
  headerRow.appendChild(th);
});
table.appendChild(headerRow);

const INITIAL_ROW_COUNT = 2;
for (let i = 0; i < INITIAL_ROW_COUNT; i++) {
  addRow();
}

function addRow() {
  const rowCount = table.querySelectorAll('tr').length - 1;
  if (rowCount >= 10) return;

  const row = document.createElement('tr');
  for (let j = 0; j < 3; j++) {
    const cell = document.createElement('td');
    if (j === 0) {
      cell.textContent = `P${rowCount + 1}`;
    } else {
      const input = document.createElement('input');
      input.type = 'number';
      const id = `P${rowCount + 1}`;
      const property = (j === 1) ? 'Arrival Time' : 'Service Time';
      input.setAttribute('data-id', id);
      input.setAttribute('data-property', property);
      input.classList.add(`row-${rowCount + 1}`, `column-${j + 1}`);
      input.addEventListener('input', updateData);
      cell.appendChild(input);
    }
    row.appendChild(cell);
  }
  table.appendChild(row);
}

function removeRow() {
  const rowCount = table.querySelectorAll('tr').length - 1;
  if (rowCount <= 3) return;

  table.removeChild(table.lastChild);
}

const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', addRow);

const removeButton = document.querySelector('.remove-button');
removeButton.addEventListener('click', removeRow);

function updateData(event) {
  const id = event.target.getAttribute('data-id');
  const property = event.target.getAttribute('data-property');
  const value = event.target.value;

  if (!data[id]) {
    data[id] = {};
  }
  data[id][property] = Number(value);
}

const fillButton = document.querySelector('.fill-button');
fillButton.addEventListener('click', () => {
  const rows = table.querySelectorAll('tr');
  let previousArrivalTime = 0; // 이전 프로세스의 Arrival Time을 저장

  for (let i = 1; i < rows.length; i++) {
    const inputs = rows[i].querySelectorAll('input');
    let arrivalTime; // 여기서 변수 선언을 반복문 안으로 옮깁니다.

    if (i === 1) {
      arrivalTime = 0;
    } else {
      arrivalTime = previousArrivalTime + Math.floor(Math.random() * 3) + 1;
    }

    inputs[0].value = arrivalTime; // 설정된 Arrival Time 값을 입력 필드에 적용
    inputs[1].value = Math.floor(Math.random() * 10) + 1; // Service Time은 랜덤 값

    previousArrivalTime = arrivalTime; // 이번 프로세스의 Arrival Time을 저장

    updateData({ target: inputs[0] });
    updateData({ target: inputs[1] });
  }
});


const startButton = document.querySelector('.start-button');
const avgResponseTimeDiv = document.querySelector('.avg-response-time');

startButton.addEventListener('click', () => {
  const deltaInput = document.querySelector('.delta-input');
  deltaInput.min = 2;
  deltaInput.max = 5;
  const quantum = parseInt(deltaInput.value, 10) || 2;
  timelineDiv.innerHTML = '';
  avgResponseTimeDiv.innerHTML = '';

  function simulateRoundRobin(data, quantum) {
    let time = 0;
    const queue = Object.keys(data).map(id => ({ id, ...data[id] }));
    const responseTimes = {};
    const finishes = {};
    
    while (queue.length > 0) {
      const process = queue.shift();
      if (!finishes[process.id]) finishes[process.id] = process['Arrival Time'];

      const execTime = Math.min(process['Service Time'], quantum);
      const start = Math.max(time, finishes[process.id]);
      const finish = start + execTime;

      const box = document.createElement('div');
      box.className = 'process-box';
      box.style.width = `${execTime * 100}px`;
      box.textContent = `${process.id} (${start}-${finish})`;
      timelineDiv.appendChild(box);

      finishes[process.id] = finish;
      process['Service Time'] -= execTime;

      if (process['Service Time'] > 0) {
        queue.push(process);
      } else {
        responseTimes[process.id] = finish - process['Arrival Time'];
      }

      time = finish;
    }

    const sumResponseTimes = Object.values(responseTimes).reduce((acc, cur) => acc + cur, 0);
    const avgResponseTime = sumResponseTimes / Object.keys(responseTimes).length;

    // 수식 표시
    avgResponseTimeDiv.innerHTML = `평균 응답 시간 = (${Object.values(responseTimes).join(' + ')}) / ${Object.keys(responseTimes).length} = ${avgResponseTime.toFixed(2)}`;
  }

  simulateRoundRobin(data, quantum);
});
